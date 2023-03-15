using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using webAPI.Domain.Enums;
using webAPI.Domain.Models;

namespace webAPI.Domain.DTOs
{
	public class JobDto
	{
        public required Guid CustomerId { get; set; }

        public required string Name { get; set; }

        public required string Description { get; set; }

        public required string FileUrl { get; set; }

        public required int Quantity { get; set; }

        public required JobStatus JobStatus { get; set; }

        public DateTime Due { get; set; }
    }
}

