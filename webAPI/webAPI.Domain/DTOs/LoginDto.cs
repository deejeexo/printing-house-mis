using System;
using System.ComponentModel.DataAnnotations;

namespace webAPI.Domain.DTOs
{
	public class LoginDto
	{
		[Required]
		public required string Email { get; set; }

		[Required]
		public required string Password { get; set; }
	}
}

