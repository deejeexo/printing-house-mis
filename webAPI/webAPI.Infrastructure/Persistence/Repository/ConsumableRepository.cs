using System;
using webAPI.Bussiness.Interfaces;
using webAPI.Domain.Models;

namespace webAPI.Infrastructure.Persistence.Repository
{
	public class ConsumableRepository : Repository<Consumable>, IConsumableRepository
	{
		private readonly ApplicationDbContext _db;

		public ConsumableRepository(ApplicationDbContext dbContext) : base(dbContext)
		{
			this._db = dbContext;
		}
	}
}

