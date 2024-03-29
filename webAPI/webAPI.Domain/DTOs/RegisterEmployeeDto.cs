﻿using System;
using System.ComponentModel.DataAnnotations;
using webAPI.Domain.Enums;

namespace webAPI.Domain.DTOs
{
	public class RegisterEmployeeDto
	{
        public required string FullName { get; set; }

        public string? Password { get; set; }

        public required string Email { get; set; }

        public required string PhoneNumber { get; set; }

        public required string Address { get; set; }

        public Position? Position { get; set; }
    }
}

