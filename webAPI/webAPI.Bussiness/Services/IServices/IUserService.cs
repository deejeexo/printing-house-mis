﻿using System;
using webAPI.Bussiness.Utilities;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;

namespace webAPI.Bussiness.Services.IServices
{
    public interface IUserService
    {
        Task<Result<User>> RegisterClient(RegisterClientDto register);

        Task<Result<LoginResponseDto>> LoginUser(LoginDto loginDTO);

        Task<Result<User>> RegisterEmployee(RegisterEmployeeDto register);

        Task<UserDto?> GetUser(Guid id);

        Task<User> UpdateEmployee(UserDto userDto);

        Task<User> UpdateUser(UserDto userDto);

        Task<User> TurnOffEmployeeAccount(TurnOffEmployeeAccountDto turnOffEmployeeAccountDto);

        Task<IEnumerable<UserDto>> GetEmployees();

        Task<IEnumerable<UserDto>> GetActiveEmployees();

        void CreatePasswordHashSalt(string password, out byte[] passwordHash, out byte[] passwordSalt);
    }
}