using System;
using webAPI.Domain.Enums;

namespace webAPI.Domain.DTOs
{
	public class LoginResponseDto
	{
		public Guid Id { get; set; }

		public Position Position { get; set; }
	}
}

