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
	[Route(template: "user")]
	public class UserController : ControllerBase
	{
		private readonly IUserService _userService;

		public UserController (IUserService userService)
		{
			this._userService = userService;
		}

		[HttpPost("register-client")]
		public async Task<ActionResult<User>> RegisterClient([FromBody] RegisterClientDto registerDto)
		{
			var result = await _userService.RegisterClient(registerDto);
            if (result.Exception is ValidationException exception)
            {
                return Unauthorized(exception.Messages);
            }
            return Ok(result.Value);
		}

        [HttpPost("register-employee")]
        public async Task<ActionResult<User>> RegisterEmployee([FromBody] RegisterEmployeeDto registerDto)
        {
            var result = await _userService.RegisterEmployee(registerDto);
            if (result.Exception is ValidationException exception)
            {
                return Unauthorized(exception.Messages);
            }
            return Ok(result.Value);
        }

        [HttpPost("login")]
		public async Task<ActionResult<LoginResponseDto>> LoginUser([FromBody] LoginDto loginDto)
		{
            var result = await _userService.LoginUser(loginDto);
            if (result.Exception is ValidationException exception)
            {
                return Unauthorized(exception.Messages);
            }

            return Ok(result.Value);
        }

        [HttpGet("employees")]
        public async Task<ActionResult<IEnumerable<User>>> GetEmployees() => Ok(await _userService.GetEmployees());

        [HttpGet("employees-active")]
        public async Task<ActionResult<IEnumerable<User>>> GetActiveEmployees() => Ok(await _userService.GetActiveEmployees());

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<User>> GetUser(Guid id) => Ok(await _userService.GetUser(id));

        [HttpPost("update-employee")]
        public async Task<ActionResult<User>> UpdateEmployee([FromBody] UserDto userDto)
        {
            var updatedEmployee = await _userService.UpdateEmployee(userDto);
            return Ok();
        }

        [HttpPost("update-user")]
        public async Task<ActionResult<User>> UpdateUser([FromBody] UserDto userDto)
        {
            var updateUser = await _userService.UpdateUser(userDto);
            return Ok();
        }

        [HttpPost("turn-off-employee-account")]
        public async Task<ActionResult<User>> TurnOffEmployeeAccount([FromBody] TurnOffEmployeeAccountDto turnOffEmployeeAccountDto)
        {
            var turnedOffAccount = await _userService.TurnOffEmployeeAccount(turnOffEmployeeAccountDto);
            return Ok();
        }
    }
}

