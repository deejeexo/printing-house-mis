using System;
using webAPI.Domain.Enums;

namespace webAPI.Domain.DTOs
{
	public class AddJobConsumableDto
	{
        public Guid? Id { get; set; }

        public required Guid JobId { get; set; }

		public required Guid ConsumableId { get; set; }

		public required int QuantityUsed { get; set; }

        public string? Name { get; set; }

        public ConsumableType? ConsumableType { get; set; }

        public int UnitPrice { get; set; }
    }
}

