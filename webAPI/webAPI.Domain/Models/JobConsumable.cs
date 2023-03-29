using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Domain.Models
{
    public class JobConsumable : EntityBase
    {
        [Required]
        public required Guid JobId { get; set; }

        [ForeignKey("JobId")]
        public Job? Job { get; set; }

        [Required]
        public required Guid ConsumableId { get; set; }

        public Consumable? Consumable { get; set; }

        [Required]
        public required int QuantityUsed { get; set; }
    }
}