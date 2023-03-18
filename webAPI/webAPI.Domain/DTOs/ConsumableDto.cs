using System;
using System.ComponentModel.DataAnnotations;
using webAPI.Domain.Enums;

namespace webAPI.Domain.DTOs
{
	public class ConsumableDto
	{
        public Guid? Id { get; set; }

        public required string Name { get; set; }

        public required ConsumableType ConsumableType { get; set; }

        public required int UnitPrice { get; set; }

        public required int Quantity { get; set; }
    }
}

