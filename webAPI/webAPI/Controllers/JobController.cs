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
        public async Task<ActionResult<IEnumerable<Job>>> GetAllJobs() => Ok(await _jobService.GetAllJobs());

        [HttpPost("add-review")]
        public async Task<ActionResult<Job>> AddReview([FromBody] NewReviewDto newReviewDto)
        {
            var editedJob = await _jobService.AddReview(newReviewDto);
            return Ok();
        }

        [HttpPost("add-curator")]
        public async Task<ActionResult<Job>> AddCurator([FromBody] AddCuratorDto addCuratorDto)
        {
            var editedJob = await _jobService.AddCurator(addCuratorDto);
            return Ok();
        }

        [HttpPost("update-job-status")]
        public async Task<ActionResult<Job>> UpdateJobStatus([FromBody] UpdateJobStatusDto updateJobStatusDto)
        {
            var editedJob = await _jobService.UpdateJobStatus(updateJobStatusDto);
            return Ok();
        }

        [HttpGet("client-jobs/{userId:guid}")]
        public async Task<ActionResult<IEnumerable<Job>>> GetClientJobs(Guid userId) => Ok(await _jobService.GetClientJobs(userId));

        [HttpGet("curator-jobs/{userId:guid}")]
        public async Task<ActionResult<IEnumerable<Job>>> GetCuratorJobs(Guid userId) => Ok(await _jobService.GetCuratorJobs(userId));

        [HttpGet("get-job/{id:guid}")]
        public async Task<ActionResult<Job>> GetJob(Guid id) => Ok(await _jobService.GetJob(id));

        [HttpPost("add-job-consumable")]
        public async Task<ActionResult<Job>> AddJobConsumable([FromBody] AddJobConsumableDto addJobConsumableDto)
        {
            var result = await _jobService.AddJobConsumable(addJobConsumableDto);
            if (result.Exception is ValidationException exception)
            {
                return Unauthorized(exception.Messages);
            }
            return Ok(result.Value);
        }


        [HttpPost("add-job-equipment")]
        public async Task<ActionResult<Job>> AddJobEquipment([FromBody] AddJobEquipmentDto addJobEquipmentDto)
        {
            var result = await _jobService.AddJobEquipment(addJobEquipmentDto);
            if (result.Exception is ValidationException exception)
            {
                return Unauthorized(exception.Messages);
            }
            return Ok(result.Value);
        }

        [HttpGet("job-equipments/{jobId:guid}")]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobEquipments(Guid jobId) => Ok(await _jobService.GetJobEquipments(jobId));


        [HttpGet("job-consumables/{jobId:guid}")]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobConsumables(Guid jobId) => Ok(await _jobService.GetJobConsumables(jobId));

        [HttpDelete("delete-job-consumable/{id:guid}")]
        public async Task<ActionResult<Consumable>> DeleteJobConsumable(Guid id)
        {
            await _jobService.DeleteJobConsumable(id);
            return Ok("Consumable deleted successfully");
        }

        [HttpDelete("delete-job-equipment/{id:guid}")]
        public async Task<ActionResult<Consumable>> DeleteJobEquipment(Guid id)
        {
            await _jobService.DeleteJobEquipment(id);
            return Ok("Equipment deleted successfully");
        }

        [HttpGet("job-price/{jobId:guid}")]
        public async Task<ActionResult<JobPriceDto>> GetJobPrice(Guid jobId) => Ok(await _jobService.GetJobPrice(jobId));
    }
}

