using System;
using AutoMapper;
using webAPI.Bussiness.Services.IServices;
using webAPI.Bussiness.Utilities;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Bussiness.Services
{
	public class ConsumableService : IConsumableService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public ConsumableService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			this._unitOfWork = unitOfWork;
			this._mapper = mapper;
		}

        public async Task<Result<Consumable>> CreateConsumable(ConsumableDto consumableDto)
        {
			var consumable = _mapper.Map<Consumable>(consumableDto);
			_unitOfWork.Consumable.Add(consumable);
			await _unitOfWork.SaveAsync();
			return consumable;
        }

        public async Task<Consumable> DeleteConsumable(Guid consumableId)
        {
			var consumableToDelete = await _unitOfWork.Consumable.GetAsync(consumable => consumable.Id == consumableId);
			if (consumableToDelete != null)
			{
				_unitOfWork.Consumable.Remove(consumableToDelete);
				await _unitOfWork.SaveAsync();
			}

			return consumableToDelete!;
        }

        public async Task<Consumable> EditConsumable(ConsumableDto consumableDto)
        {
			var consumableToEdit = await _unitOfWork.Consumable.GetAsync(consumable => consumable.Id == consumableDto.Id);
			if (consumableToEdit != null)
			{
				consumableToEdit.Name = consumableDto.Name;
				consumableToEdit.Quantity = consumableDto.Quantity;
				consumableToEdit.ConsumableType = consumableDto.ConsumableType;
				consumableToEdit.UnitPrice = consumableDto.UnitPrice;
				_unitOfWork.Consumable.Update(consumableToEdit);
				await _unitOfWork.SaveAsync();
			}
			return consumableToEdit!;
        }

        public async Task<IEnumerable<ConsumableDto>> GetAllConsumables()
		{
			var consumables = await _unitOfWork.Consumable.GetAllAsync();
			return _mapper.Map<List<ConsumableDto>>(consumables);
        }


        public async Task<Consumable?> GetConsumable(Guid id)
        {
            var consumable = await _unitOfWork.Consumable.GetAsync(consumable => consumable.Id == id);
            if (consumable is not null) return _mapper.Map<Consumable>(consumable);
            return null;
        }
    }
}

