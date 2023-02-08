using System;
using webAPI.Domain.Models;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Infrastructure.Persistence.Repository
{
	public class UserRepository : Repository<User>, IUserRepository
	{
        private readonly ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            this._db = dbContext;
        }
    }
}

