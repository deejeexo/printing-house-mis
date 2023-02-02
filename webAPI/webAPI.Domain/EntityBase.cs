using System.ComponentModel.DataAnnotations;

namespace webAPI.Domain
{
	public class EntityBase
	{
        [Key]
        public Guid Id { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateUpdated { get; set; }
    }
}

