using System.ComponentModel.DataAnnotations;
using webAPI.Domain.Enums;

namespace webAPI.Domain.Models
{
    public class Employee : EntityBase
    {
        [Required]
        public required Guid UserId { get; set; }

        public User? User { get; set; }

        [Required]
        public required Position Position { get; set; }
    }
}
