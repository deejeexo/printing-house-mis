using System;
using webAPI.Bussiness;

namespace webAPI.Infrastructure.Persistence.Repository.IRepository
{
	public interface IUnitOfWork
	{
		IUserRepository User { get; set; }

		void Save();

		Task<int> SaveAsync();
	}
}

