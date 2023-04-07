using System;
using Microsoft.AspNetCore.Mvc;
using webAPI.Bussiness.Services;
using webAPI.Bussiness.Services.IServices;
using webAPI.Domain.DTOs;
using webAPI.Domain.DTOs.StatisticsDto;
using webAPI.Domain.Models;

namespace webAPI.Controllers
{
    [ApiController]
    [Route(template: "statistics")]
    public class StatisticsController : ControllerBase
	{
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
		{
            this._statisticsService = statisticsService;
        }

        [HttpGet("totalCostumers")]
        public async Task<ActionResult<TotalCostumersDto>> GetTotalCostumers() => Ok(await _statisticsService.GetTotalCostumers());


        [HttpGet("totalEmployees")]
        public async Task<ActionResult<TotalEmployeesDto>> GetTotalEmployees() => Ok(await _statisticsService.GetTotalEmployees());


        [HttpGet("totalJobs")]
        public async Task<ActionResult<TotalEmployeesDto>> GetTotalJobs() => Ok(await _statisticsService.GetTotalJobs());

        [HttpGet("jobStatusStatistics")]
        public async Task<ActionResult<JobStatusStatisticsDto>> GetJobStatusesStatistics() => Ok(await _statisticsService.GetJobStatusesStatistics());


        [HttpGet("jobsAverageRating")]
        public async Task<ActionResult<JobsAverageRatingDto>> GetJobsAverageRating() => Ok(await _statisticsService.GetJobsAverageRating());

        [HttpGet("jobsRevenue")]
        public async Task<ActionResult<JobsAverageRatingDto>> GetJobsRevenue() => Ok(await _statisticsService.GetJobsRevenue());
    }
}

