using System;
using webAPI.Bussiness.Utilities;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;

namespace webAPI.Bussiness.Services.IServices
{
	public interface IEquipmentService
	{
        Task<Result<Equipment>> AddEquipment(EquipmentDto equipmentDto);

        Task<Equipment> EditEquipment(EquipmentDto equipmentDto);

        Task<IEnumerable<EquipmentDto>> GetAllEquipments();
    }
}

