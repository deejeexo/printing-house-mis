using System;
using webAPI.Bussiness;
using webAPI.Bussiness.Interfaces;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Infrastructure.Persistence.Repository
{
	public class UnitOfWork : IUnitOfWork
	{
        private readonly ApplicationDbContext _db;

        public UnitOfWork(ApplicationDbContext db)
        {
            this._db = db;
            User = new UserRepository(db);
            Job = new JobRepository(db);
            News = new NewsRepository(db);
            Equipment = new EquipmentRepository(db);
            Consumable = new ConsumableRepository(db);
        }

        public IUserRepository User { get; set; }

        public IJobRepository Job { get; set; }

        public INewsRepository News { get; set; }

        public IEquipmentRepository Equipment { get; set; }

        public IConsumableRepository Consumable { get; set; }

        public void Save()
        {
            this._db.SaveChanges();
        }

        public Task<int> SaveAsync()
        {
            return this._db.SaveChangesAsync();
        }
    }
}

