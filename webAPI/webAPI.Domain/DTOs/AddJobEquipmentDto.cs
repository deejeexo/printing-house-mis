using System;
using webAPI.Domain.Enums;

namespace webAPI.Domain.DTOs
{
	public class AddJobEquipmentDto
	{
		public Guid? Id { get; set; }

		public required Guid JobId { get; set; }

		public required Guid EquipmentId { get; set; }

		public required int Hours { get; set; }

		public string? Name { get; set; }

        public EquipmentType? EquipmentType { get; set; }

		public decimal CostPerHour { get; set; }
    }
}

