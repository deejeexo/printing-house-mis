using System;
using System.ComponentModel.DataAnnotations;
using webAPI.Domain.Enums;

namespace webAPI.Domain.DTOs
{
    public class RegisterClientDto
    {
        [Required]
        public required string FullName { get; set; }

        [Required]
        public required string Password { get; set; }

        [Required]
        public required string Email { get; set; }

        [Required]
        public required string PhoneNumber { get; set; }

        [Required]
        public required string Address { get; set; }
    }
}

