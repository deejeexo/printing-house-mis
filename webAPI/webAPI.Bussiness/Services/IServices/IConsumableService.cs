using System;
using System.Reflection;
using webAPI.Bussiness.Utilities;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;

namespace webAPI.Bussiness.Services.IServices
{
	public interface IConsumableService
	{
		Task<Result<Consumable>> CreateConsumable(ConsumableDto consumableDto);

		Task<IEnumerable<ConsumableDto>> GetAllConsumables();

        Task<Consumable> EditConsumable(ConsumableDto consumableDto);

        Task<Consumable> DeleteConsumable(Guid consumableId);

        Task<Consumable?> GetConsumable(Guid id);
    }
}

