using System;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using webAPI.Bussiness.Services.IServices;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;
using webAPI.Exceptions;

namespace webAPI.Controllers
{
	[ApiController]
	[Route(template: "job")]
	public class JobController : ControllerBase
	{
		private readonly IJobService _jobService;

		public JobController(IJobService jobService) {
			this._jobService = jobService;
		}

		[HttpPost("create-job")]
		public async Task<ActionResult<Job>> CreateJob([FromBody] JobDto jobDto)
		{
			var result = await _jobService.CreateJob(jobDto);
			if (result.Exception is ValidationException exception) {
				return Unauthorized(exception.Messages);
			}
			return Ok(result.Value);
		}

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Job>>> GetAllReservations() => Ok(await _jobService.GetAllJobs());

        [HttpPost("add-review")]
        public async Task<ActionResult<Job>> AddReview([FromBody] NewReviewDto newReviewDto)
        {
            var editedJob = await _jobService.AddReview(newReviewDto);
            return Ok();
        }

    }
}

