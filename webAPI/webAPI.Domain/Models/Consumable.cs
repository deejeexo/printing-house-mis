using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webAPI.Domain.Enums;
using webAPI.Domain.Models;

namespace webAPI.Domain.Models
{
    public class Consumable : EntityBase
    {
        [Required]
        public required string Name { get; set; }

        [Required]
        public required ConsumableType ConsumableType { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public required decimal UnitPrice { get; set; }

        [Required]
        public required int Quantity { get; set; }
    }
}