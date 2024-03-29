﻿using System;
using webAPI.Bussiness;
using webAPI.Bussiness.Interfaces;

namespace webAPI.Infrastructure.Persistence.Repository.IRepository
{
	public interface IUnitOfWork
	{
		IUserRepository User { get; set; }

		IJobRepository Job { get; set; }

		INewsRepository News { get; set; }

		IEquipmentRepository Equipment { get; set; }

		IConsumableRepository Consumable { get; set; }

		IJobEquipmentRepository JobEquipment { get; set; }

		IJobConsumableRepository JobConsumable { get; set; }

		void Save();

		Task<int> SaveAsync();
	}
}

