using System;
using System.ComponentModel.DataAnnotations;
using webAPI.Domain.Enums;

namespace webAPI.Domain.DTOs
{
	public class UserDto
	{
        [Required]
        public required Guid Id { get; set; }

        [Required]
        public required string FullName { get; set; }

        [Required]
        public required string Email { get; set; }

        [Required]
        public required string PhoneNumber { get; set; }

        [Required]
        public required string Address { get; set; }

        public UserType? UserType { get; set; }

        public Position? Position { get; set; }
    }
}

