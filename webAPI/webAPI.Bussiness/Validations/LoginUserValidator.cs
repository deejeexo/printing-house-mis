using System;
using System.Security.Cryptography;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Bussiness.Validations
{
	public class LoginUserValidator : BaseValidator, IValidator<LoginDto>
	{
        private readonly IUnitOfWork _unitOfWork;

        public LoginUserValidator(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<bool> Validate(LoginDto value)
        {
            var user = await _unitOfWork.User.GetAsync(u => u.Email == value.Email);
            if (user is null)
            {
                AddError(nameof(User.Email), "Invalid Email");
                return false;
            }

            if (VerifyPasswordHash(value.Password, user.PasswordHash!, user.PasswordSalt!)) return true;
            AddError("Password", "Invalid Password");
            return false;
        }

        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);
            }
        }
    }
}

