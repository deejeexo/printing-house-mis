﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webAPI.Domain.Enums;

namespace webAPI.Domain.Models
{
    public class Job : EntityBase
    {
        [Required]
        public required Guid CustomerId { get; set; }

        [ForeignKey ("CustomerId")]
        public User? User { get; set; }

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string Description { get; set; }

        [Required]
        public required string FileUrl { get; set; }

        [Required]
        public required int Quantity { get; set; }

        [Required]
        public required JobStatus JobStatus { get; set; }

        [Required]
        public DateTime Due { get; set; }
    }
}