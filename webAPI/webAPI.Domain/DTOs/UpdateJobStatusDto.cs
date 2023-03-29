using System;
using webAPI.Domain.Enums;

namespace webAPI.Domain.DTOs
{
	public class UpdateJobStatusDto
	{
        public required Guid JobId { get; set; }

        public required JobStatus JobStatus { get; set; }

        public required DateTime Due { get; set; }
    }
}

