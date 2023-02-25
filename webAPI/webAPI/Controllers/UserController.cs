using System;
using Microsoft.AspNetCore.Mvc;
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

		[HttpPost("register/register-client")]
		public async Task<ActionResult<User>> RegisterClient([FromBody] RegisterClientDto registerDto)
		{
			var result = await _userService.RegisterClient(registerDto);
            if (result.Exception is ValidationException exception)
            {
                return Unauthorized(exception.Messages);
            }
            return Ok(result.Value);
		}

        [HttpPost("register/register-employee")]
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

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<User>> GetUser(Guid id) => Ok(await _userService.GetUser(id));
    }
}

