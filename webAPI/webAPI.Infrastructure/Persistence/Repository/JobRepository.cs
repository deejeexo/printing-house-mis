using webAPI.Bussiness.Interfaces;
using webAPI.Domain.Models;

namespace webAPI.Infrastructure.Persistence.Repository
{
    public class JobRepository : Repository<Job>, IJobRepository
	{
		private readonly ApplicationDbContext _db;

		public JobRepository(ApplicationDbContext dbContext) : base(dbContext) {
			this._db = dbContext;
		}
	}
}

