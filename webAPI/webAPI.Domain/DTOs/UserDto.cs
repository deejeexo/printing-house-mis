using System;
using System.ComponentModel.DataAnnotations;
using webAPI.Domain.Enums;

namespace webAPI.Domain.DTOs
{
	public class UserDto
	{
        [Required]
        public required string Name { get; set; }

        [Required]
        public required string Email { get; set; }

        [Required]
        public required string PhoneNumber { get; set; }

        [Required]
        public required string Address { get; set; }

        [Required]
        public required UserType UserType { get; set; }

        public Position? Position { get; set; }

        public int Salary { get; set; }
    }
}

