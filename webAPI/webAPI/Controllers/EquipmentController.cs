using System;
using Microsoft.AspNetCore.Mvc;
using webAPI.Bussiness.Services;
using webAPI.Bussiness.Services.IServices;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;
using webAPI.Exceptions;

namespace webAPI.Controllers
{
	[ApiController]
	[Route(template: "equipment")]
	public class EquipmentController : ControllerBase
	{
		private readonly IEquipmentService _equipmentService;

		public EquipmentController(IEquipmentService equipmentService)
		{
			this._equipmentService = equipmentService;
		}

        [HttpPost("add-equipment")]
        public async Task<ActionResult<Equipment>> AddEquipment([FromBody] EquipmentDto equipmentDto)
		{
			var result = await _equipmentService.AddEquipment(equipmentDto);
			if (result.Exception is ValidationException exception)
			{
				return Unauthorized(exception.Messages);
			}
			return Ok(result.Value);
        }

		[HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Equipment>>> GetAllEquipments() => Ok(await _equipmentService.GetAllEquipments());

		[HttpPost("edit-equipment")]
        public async Task<ActionResult<Equipment>> EditEquipment([FromBody] EquipmentDto equipmentDto)
		{
			var editedEquipment = await _equipmentService.EditEquipment(equipmentDto);
			return Ok();
		}

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Equipment>> GetEquipment(Guid id) => Ok(await _equipmentService.GetEquipment(id));
    }
}

