using System;
using webAPI.Bussiness.Interfaces;
using webAPI.Domain.Models;

namespace webAPI.Infrastructure.Persistence.Repository
{
    public class NewsRepository : Repository<News>, INewsRepository
    {
        private readonly ApplicationDbContext _db;

        public NewsRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            this._db = dbContext;
        }
    }
}

