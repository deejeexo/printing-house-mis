using System;
namespace webAPI.Domain.DTOs
{
	public class NewReviewDto
	{
        public required Guid Id { get; set; }

        public required int Rating { get; set; }

        public required string Feedback { get; set; }
    }
}

