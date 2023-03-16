using System;
using System.Security.Cryptography;
using AutoMapper;
using webAPI.Bussiness.Services.IServices;
using webAPI.Bussiness.Utilities;
using webAPI.Bussiness.Validations;
using webAPI.Domain.DTOs;
using webAPI.Domain.Enums;
using webAPI.Domain.Models;
using webAPI.Exceptions;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Bussiness.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IValidator<LoginDto> _loginValidator;
        private readonly IValidator<RegisterClientDto> _registerClientValidator;
        private readonly IValidator<RegisterEmployeeDto> _registerEmployeeValidator;

        public UserService(IUnitOfWork unitOfWork, IMapper mapper, IValidator<LoginDto> loginValidator, IValidator<RegisterClientDto> registerClientValidator, IValidator<RegisterEmployeeDto> registerEmployeeValidator)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._loginValidator = loginValidator;
            this._registerClientValidator = registerClientValidator;
            this._registerEmployeeValidator = registerEmployeeValidator;
        }

        public async Task<Result<User>> RegisterClient(RegisterClientDto registerClientDto)
        {

            if (!await _registerClientValidator.Validate(registerClientDto))
                return new Result<User>(new ValidationException(_registerClientValidator.Errors));

            var registerUserDto = _mapper.Map<RegisterClientDto>(registerClientDto);
            CreatePasswordHashSalt(registerUserDto.Password, out byte[] passwordHash, out byte[] passwordSalt);
            var userCreated = _mapper.Map<User>(registerUserDto);
            userCreated.PasswordHash = passwordHash;
            userCreated.PasswordSalt = passwordSalt;
            userCreated.UserType = UserType.Client;
            userCreated.Position = Position.Empty;
            _unitOfWork.User.Add(userCreated);
            await _unitOfWork.SaveAsync();


            return userCreated;
        }

        public async Task<Result<User>> RegisterEmployee(RegisterEmployeeDto registerEmployeeDto)
        {
            if (!await _registerEmployeeValidator.Validate(registerEmployeeDto))
                return new Result<User>(new ValidationException(_registerEmployeeValidator.Errors));

            var registerUserDto = _mapper.Map<RegisterEmployeeDto>(registerEmployeeDto);
            CreatePasswordHashSalt(registerUserDto.Password, out byte[] passwordHash, out byte[] passwordSalt);
            var userCreated = _mapper.Map<User>(registerUserDto);
            userCreated.PasswordHash = passwordHash;
            userCreated.PasswordSalt = passwordSalt;
            userCreated.UserType = UserType.Employee;
            _unitOfWork.User.Add(userCreated);
            await _unitOfWork.SaveAsync();


            return userCreated;
        }

        public async Task<Result<LoginResponseDto>> LoginUser(LoginDto loginDto)
        {
            if (!await _loginValidator.Validate(loginDto))
                return new Result<LoginResponseDto>(new ValidationException(_loginValidator.Errors));
            var userLoggedIn = await _unitOfWork.User.GetAsync(u => u.Email == loginDto.Email);
            var response = _mapper.Map<LoginResponseDto>(userLoggedIn);
            return response;
        }

        public void CreatePasswordHashSalt(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<UserDto?> GetUser(Guid id)
        {
            var user = await _unitOfWork.User.GetAsync(user => user.Id == id);
            if (user is not null) return _mapper.Map<UserDto>(user);
            return null;
        }

        public async Task<IEnumerable<UserDto>> GetEmployees()
        {
            var employees = await _unitOfWork.User.GetAllAsync(user => user.UserType == UserType.Employee || user.UserType == UserType.Disabled);
            return _mapper.Map<List<UserDto>>(employees);
        }

        public async Task<User> UpdateEmployee(UserDto userDto)
        {
            var userToUpdate = await _unitOfWork.User.GetAsync(user => user.Id == userDto.Id);
            if (userToUpdate != null)
            {
                userToUpdate.Email = userDto.Email;
                userToUpdate.Name = userDto.Name;
                userToUpdate.PhoneNumber = userDto.PhoneNumber;
                userToUpdate.Address = userDto.Address;
                userToUpdate.Salary = userDto.Salary;
                userToUpdate.Position = userDto.Position;
                userToUpdate.UserType = UserType.Employee;
                _unitOfWork.User.Update(userToUpdate);
                await _unitOfWork.SaveAsync();
            }
            return userToUpdate!;
        }

        public async Task<User> TurnOffEmployeeAccount(TurnOffEmployeeAccountDto turnOffEmployeeAccountDto)
        {
            var userToUpdate = await _unitOfWork.User.GetAsync(user => user.Id == turnOffEmployeeAccountDto.Id);
            if (userToUpdate != null)
            {
                userToUpdate.UserType = UserType.Disabled;
                _unitOfWork.User.Update(userToUpdate);
                await _unitOfWork.SaveAsync();
            }
            return userToUpdate!;
        }
    }
}

