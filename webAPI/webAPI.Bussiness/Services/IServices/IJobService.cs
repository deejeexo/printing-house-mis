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

        Task<IEnumerable<JobDto>> GetClientJobs(Guid id);

        Task<IEnumerable<JobDto>> GetCuratorJobs(Guid id);

        Task<JobDto> GetJob(Guid id);

        Task<Job> AddCurator(AddCuratorDto addCuratorDto);

        Task<Job> UpdateJobStatus(UpdateJobStatusDto updateJobStatusDto);

        Task<Result<JobConsumable>> AddJobConsumable(AddJobConsumableDto addJobConsumableDto);

        Task<Result<JobEquipment>> AddJobEquipment(AddJobEquipmentDto addJobEquipmentDto);

        Task<IEnumerable<AddJobEquipmentDto>> GetJobEquipments(Guid id);

        Task<IEnumerable<AddJobConsumableDto>> GetJobConsumables(Guid id);

        Task<JobConsumable> DeleteJobConsumable(Guid consumableId);

        Task<JobEquipment> DeleteJobEquipment(Guid consumableId);

        Task<JobPriceDto> GetJobPrice(Guid jobId);
    }
}

