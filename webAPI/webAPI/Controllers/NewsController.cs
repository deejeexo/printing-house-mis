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
    [Route(template: "news")]
    public class NewsController : ControllerBase
	{
        private readonly INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            this._newsService = newsService;
        }

        [HttpPost("create-news")]
        public async Task<ActionResult<News>> CreateNews([FromBody] NewsDto newsDto)
        {
            var result = await _newsService.CreateNews(newsDto);
            if (result.Exception is ValidationException exception)
            {
                return Unauthorized(exception.Messages);
            }
            return Ok(result.Value);
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<News>>> GetAllNews() => Ok(await _newsService.GetAllNews());
    }
}

