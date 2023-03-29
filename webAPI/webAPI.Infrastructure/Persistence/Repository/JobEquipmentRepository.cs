using System;
using webAPI.Bussiness.Interfaces;
using webAPI.Domain.Models;

namespace webAPI.Infrastructure.Persistence.Repository
{
	public class JobEquipmentRepository : Repository<JobEquipment>, IJobEquipmentRepository
	{
		private readonly ApplicationDbContext _db;

		public JobEquipmentRepository(ApplicationDbContext dbContext) : base(dbContext)
		{
			this._db = dbContext;
		}
	}
}

