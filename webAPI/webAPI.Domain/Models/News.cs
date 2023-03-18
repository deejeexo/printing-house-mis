using System;
using System.ComponentModel.DataAnnotations;

namespace webAPI.Domain.Models
{
	public class News : EntityBase
	{
        [Required]
        public required string Name { get; set; }

        [Required]
        public required string Description { get; set; }
    }
}

