using System.ComponentModel.DataAnnotations;

namespace webAPI.Domain.Models
{
    public class Assignment : EntityBase
    {
        [Required]
        public required Guid JobId { get; set; }

        [Required]
        public required Job Job { get; set; }

        [Required]
        public required Guid EmployeeId { get; set; }

        [Required]
        public required Employee Employee { get; set; }

        [Required]
        public required Guid EquipmentId { get; set; }

        [Required]
        public required Equipment Equipment { get; set; }
    }
}