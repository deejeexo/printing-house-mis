using System;
using webAPI.Domain.DTOs;
using webAPI.Domain.DTOs.StatisticsDto;

namespace webAPI.Bussiness.Services.IServices
{
	public interface IStatisticsService
	{
        Task<TotalCostumersDto> GetTotalCostumers();

        Task<TotalEmployeesDto> GetTotalEmployees();

        Task<TotalJobsDto> GetTotalJobs();

        Task<JobStatusStatisticsDto> GetJobStatusesStatistics();

        Task<JobsAverageRatingDto> GetJobsAverageRating();

        Task<JobsRevenueDto> GetJobsRevenue();
    }
}

