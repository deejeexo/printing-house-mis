using System.ComponentModel.DataAnnotations;

namespace webAPI.Domain.Models
{
    public class Assignment : EntityBase
    {
        [Required]
        public required Guid JobId { get; set; }

        public Job? Job { get; set; }

        [Required]
        public required Guid EmployeeId { get; set; }

        public Employee? Employee { get; set; }

        [Required]
        public required Guid EquipmentId { get; set; }

        public Equipment? Equipment { get; set; }
    }
}