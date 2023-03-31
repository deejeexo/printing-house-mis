using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webAPI.Domain.Enums;

namespace webAPI.Domain.Models
{
    public class Equipment : EntityBase
    {
        [Required]
        public required string Name { get; set; }

        [Required]
        public required EquipmentType Type { get; set; }

        [Required]
        public required EquipmentStatus Status { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public required decimal CostPerHour { get; set; }
    }
}