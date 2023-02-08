﻿using System;
using webAPI.Bussiness.Utilities;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Bussiness.Validations
{
	public class RegisterEmployeeValidator : BaseValidator, IValidator<RegisterEmployeeDto>
    {
        private readonly IUnitOfWork _unitOfWork;

        public RegisterEmployeeValidator(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<bool> Validate(RegisterEmployeeDto value)
        {
            await ValidateEmail(value.Email);
            return Errors.Count == 0 ? true : false;
        }

        private async Task ValidateEmail(string userEmail)
        {
            ValidateEmailFormat(userEmail);
            await ValidateIsEmailTaken(userEmail);
        }

        private async Task ValidateIsEmailTaken(string email)
        {
            var duplicateUser = await _unitOfWork.User.GetAsync(u => u.Email == email);
            if (duplicateUser is null) return;
            AddError(nameof(User.Email), "Email is already taken");
        }

        private void ValidateEmailFormat(string userEmail)
        {
            if (!DataMatcher.MatchEmployeeEmail(userEmail)) return;
            AddError(nameof(User.Email), "Invalid email format");
        }
    }
}

