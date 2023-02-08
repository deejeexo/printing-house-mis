using System.ComponentModel.DataAnnotations;

namespace webAPI.Domain.Models
{
    public class JobEquipment : EntityBase
    {
        [Required]
        public required Guid JobId { get; set; }

        public Job? Job { get; set; }

        [Required]
        public required int EquipmentId { get; set; }

        public Equipment? Equipment { get; set; }

        [Required]
        public required int Hours { get; set; }
    }
}