using System.ComponentModel.DataAnnotations;

namespace webAPI.Domain.Models
{
    public class JobConsumable : EntityBase
    {
        [Required]
        public required Guid JobId { get; set; }

        public Job? Job { get; set; }

        [Required]
        public required string ConsumableId { get; set; }

        public Consumable? Consumable { get; set; }

        [Required]
        public required int QuantityUsed { get; set; }
    }
}