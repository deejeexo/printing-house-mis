using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Domain.Models
{
    public class JobEquipment : EntityBase
    {
        [Required]
        public required Guid JobId { get; set; }

        [ForeignKey("JobId")]
        public Job? Job { get; set; }

        [Required]
        public required Guid EquipmentId { get; set; }

        public Equipment? Equipment { get; set; }

        [Required]
        public required int Hours { get; set; }
    }
}