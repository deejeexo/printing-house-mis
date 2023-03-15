using System.ComponentModel.DataAnnotations;
using webAPI.Domain.Enums;

namespace webAPI.Domain.Models
{
    public class User : EntityBase
    {
        [Required]
        public required string Name { get; set; }

        public required byte[]? PasswordHash { get; set; }

        public required byte[]? PasswordSalt { get; set; }

        [Required]
        public required string Email { get; set; }

        [Required]
        public required string PhoneNumber { get; set; }

        [Required]
        public required string Address { get; set; }

        [Required]
        public required UserType UserType { get; set; }

        [Required]
        public required int Salary { get; set; }

        public Position? Position { get; set; }
    }
}