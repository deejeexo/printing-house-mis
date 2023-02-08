using System.ComponentModel.DataAnnotations;
using webAPI.Domain.Enums;

namespace webAPI.Domain.Models
{
    public class Job : EntityBase
    {
        [Required]
        public required Guid CustomerId { get; set; }

        public User? User { get; set; }

        [Required]
        public required string Description { get; set; }

        [Required]
        public required int Quantity { get; set; }

        [Required]
        public required JobStatus JobStatus { get; set; }

        [Required]
        public required DateTime Due { get; set; }
    }
}