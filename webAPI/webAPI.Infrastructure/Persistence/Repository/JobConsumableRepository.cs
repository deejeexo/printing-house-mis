using System;
using webAPI.Bussiness.Interfaces;
using webAPI.Domain.Models;

namespace webAPI.Infrastructure.Persistence.Repository
{
	public class JobConsumableRepository : Repository<JobConsumable>, IJobConsumableRepository
	{
		private readonly ApplicationDbContext _db;

		public JobConsumableRepository(ApplicationDbContext dbContext) : base(dbContext)
		{
			this._db = dbContext;
		}
	}
}

