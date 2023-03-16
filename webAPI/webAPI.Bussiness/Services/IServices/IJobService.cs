using System;
using webAPI.Bussiness.Utilities;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;

namespace webAPI.Bussiness.Services.IServices
{
    public interface IJobService
    {
        Task<Result<Job>> CreateJob(JobDto jobdto);

        Task<Job> AddReview(NewReviewDto newReviewDto);

        Task<IEnumerable<JobDto>> GetAllJobs();
    }
}

