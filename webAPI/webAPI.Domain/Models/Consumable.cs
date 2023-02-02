using System.ComponentModel.DataAnnotations;
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
        public required int UnitPrice { get; set; }
    }
}