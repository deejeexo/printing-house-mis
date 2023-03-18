using System;
using AutoMapper;
using webAPI.Bussiness.Services.IServices;
using webAPI.Bussiness.Utilities;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Bussiness.Services
{
	public class EquipmentService : IEquipmentService
	{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public EquipmentService (IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public async Task<Result<Equipment>> AddEquipment(EquipmentDto equipmentDto)
        {
            var equipmentCreated = _mapper.Map<Equipment>(equipmentDto);
            _unitOfWork.Equipment.Add(equipmentCreated);
            await _unitOfWork.SaveAsync();
            return equipmentCreated;
        }

        public async Task<Equipment> EditEquipment(EquipmentDto equipmentDto)
        {
            var equipmentToEdit = await _unitOfWork.Equipment.GetAsync(equipment => equipment.Id == equipmentDto.Id);
            if (equipmentToEdit != null)
            {
                equipmentToEdit.Name = equipmentDto.Name;
                equipmentToEdit.Status = equipmentDto.Status;
                equipmentToEdit.Type = equipmentDto.Type;
                _unitOfWork.Equipment.Update(equipmentToEdit);
                await _unitOfWork.SaveAsync();
            }
            return equipmentToEdit!;
        }

        public async Task<IEnumerable<EquipmentDto>> GetAllEquipments()
        {
            var equipments = await _unitOfWork.Equipment.GetAllAsync();
            var equipmentsDto = _mapper.Map<List<EquipmentDto>>(equipments);
            return equipmentsDto;
        }
    }
}

