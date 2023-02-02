using System.ComponentModel.DataAnnotations;

namespace webAPI.Domain.Models
{
    public class Customer : EntityBase
    {
        [Required]
        public required Guid UserId { get; set; }

        [Required]
        public required User User { get; set; }
    }
}