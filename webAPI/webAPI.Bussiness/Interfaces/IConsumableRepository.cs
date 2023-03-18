﻿using System;
using webAPI.Domain.Models;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Bussiness.Interfaces
{
	public interface IConsumableRepository : IRepository<Consumable>
	{
	}
}

