using System;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using webAPI.Bussiness.Services;
using webAPI.Bussiness.Services.IServices;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;
using webAPI.Exceptions;

namespace webAPI.Controllers
{
	[ApiController]
	[Route(template: "consumable")]
	public class ConsumableController : ControllerBase
	{
		private readonly IConsumableService _consumableService;

		public ConsumableController(IConsumableService consumableService)
		{
			this._consumableService = consumableService;
		}

		[HttpPost("create-consumable")]
		public async Task<ActionResult<Job>> CreateConsumable([FromBody] ConsumableDto consumableDto)
		{
			var result = await _consumableService.CreateConsumable(consumableDto);
			if (result.Exception is ValidationException exception)
			{
				return Unauthorized(exception.Messages);
			}
			return Ok(result.Value);
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Consumable>>> GetAllConsumables() => Ok(await _consumableService.GetAllConsumables());

        [HttpPost("edit-consumable")]
        public async Task<ActionResult<Equipment>> EditConsumable([FromBody] ConsumableDto consumableDto)
        {
            var editedEquipment = await _consumableService.EditConsumable(consumableDto);
            return Ok();
        }

        [HttpDelete("delete-consumable/{id:guid}")]
        public async Task<ActionResult<Consumable>> DeleteConsumable(Guid id)
        {
            await _consumableService.DeleteConsumable(id);
            return Ok("Consumable deleted successfully");
        }
    }
}

