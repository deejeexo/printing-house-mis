using System;
using webAPI.Bussiness;
using webAPI.Bussiness.Interfaces;

namespace webAPI.Infrastructure.Persistence.Repository.IRepository
{
	public interface IUnitOfWork
	{
		IUserRepository User { get; set; }

		IJobRepository Job { get; set; }

		void Save();

		Task<int> SaveAsync();
	}
}

