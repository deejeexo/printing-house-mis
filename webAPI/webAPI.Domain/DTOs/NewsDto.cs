using System;
using System.ComponentModel.DataAnnotations;

namespace webAPI.Domain.DTOs
{
	public class NewsDto
	{
        public Guid? Id { get; set; }

        public required string Name { get; set; }

        public required string Description { get; set; }

        public DateTime? DateCreated { get; set; }
    }
}

