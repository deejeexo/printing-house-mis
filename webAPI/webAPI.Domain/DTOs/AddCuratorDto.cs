using System;
namespace webAPI.Domain.DTOs
{
	public class AddCuratorDto
	{
		public Guid JobId { get; set; }

		public Guid Curator { get; set; }
	}
}

