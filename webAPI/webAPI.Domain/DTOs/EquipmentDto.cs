using System;
using webAPI.Domain.Enums;

namespace webAPI.Domain.DTOs
{
	public class EquipmentDto
	{
        public Guid? Id { get; set; }

        public required string Name { get; set; }

        public required EquipmentType Type { get; set; }

        public required EquipmentStatus Status { get; set; }

        public required int CostPerHour { get; set; }
    }
}

