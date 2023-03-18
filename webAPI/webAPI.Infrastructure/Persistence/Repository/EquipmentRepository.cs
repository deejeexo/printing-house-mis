using System;
using webAPI.Bussiness.Interfaces;
using webAPI.Domain.Models;

namespace webAPI.Infrastructure.Persistence.Repository
{
	public class EquipmentRepository : Repository<Equipment>, IEquipmentRepository
	{
		private readonly ApplicationDbContext _db;

		public EquipmentRepository(ApplicationDbContext dbContext) : base(dbContext)
		{
			this._db = dbContext;
		}
	}
}

