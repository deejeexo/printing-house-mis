using System;
using AutoMapper;
using webAPI.Bussiness.Services.IServices;
using webAPI.Domain.DTOs;
using webAPI.Domain.DTOs.StatisticsDto;
using webAPI.Domain.Enums;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Bussiness.Services
{
	public class StatisticsService : IStatisticsService
	{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IJobService _jobService;

        public StatisticsService(IUnitOfWork unitOfWork, IMapper mapper, IJobService jobService)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._jobService = jobService;
        }

        public async Task<TotalCostumersDto> GetTotalCostumers()
        {
            var customers = await _unitOfWork.User.GetAllAsync(user => user.UserType == UserType.Client);

            TotalCostumersDto totalCostumersDto = new TotalCostumersDto
            {
                TotalCostumers = customers.Count()
            };

            return totalCostumersDto;
        }

        public async Task<TotalEmployeesDto> GetTotalEmployees()
        {
            var employees = await _unitOfWork.User.GetAllAsync(user => user.UserType == UserType.Employee);

            TotalEmployeesDto totalEmployeesDto = new TotalEmployeesDto
            {
                TotalEmployees = employees.Count()
            };

            return totalEmployeesDto;
        }

        public async Task<TotalJobsDto> GetTotalJobs()
        {
            var jobs = await _unitOfWork.Job.GetAllAsync();

            TotalJobsDto totalJobsDto = new TotalJobsDto
            {
                TotalJobs = jobs.Count()
            };

            return totalJobsDto;
        }

        public async Task<JobStatusStatisticsDto> GetJobStatusesStatistics()
        {
            var jobs = await _unitOfWork.Job.GetAllAsync();

            var delayedStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.Delayed).ToList();
            var completedStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.Completed).ToList();
            var cancelledStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.Cancelled).ToList();
            var pendingApprovalStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.PendingApproval).ToList();
            var approvedStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.Approved).ToList();
            var readyForPrintingStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.ReadyForPrinting).ToList();
            var printingStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.Printing).ToList();
            var qualityControlStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.QualityControl).ToList();
            var finishingStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.Finishing).ToList();
            var packagingStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.Packaging).ToList();
            var shippingStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.Shipping).ToList();
            var deliveredStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.Delivered).ToList();
            var billingStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.Billing).ToList();
            var paymentReceivedStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.PaymentReceived).ToList();
            var archivedStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.Archived).ToList();
            var newStatusJobs = jobs.Where(j => j.JobStatus == JobStatus.New).ToList();

            JobStatusStatisticsDto jobStatusStatisticsDto = new JobStatusStatisticsDto
            {
                Delayed = delayedStatusJobs.Count(),
                Completed = completedStatusJobs.Count(),
                Cancelled = cancelledStatusJobs.Count(),
                PendingApproval = pendingApprovalStatusJobs.Count(),
                Approved = approvedStatusJobs.Count(),
                ReadyForPrinting = readyForPrintingStatusJobs.Count(),
                Printing = printingStatusJobs.Count(),
                QualityControl = qualityControlStatusJobs.Count(),
                Finishing = finishingStatusJobs.Count(),
                Packaging = packagingStatusJobs.Count(),
                Shipping = shippingStatusJobs.Count(),
                Delivered = deliveredStatusJobs.Count(),
                Billing = billingStatusJobs.Count(),
                PaymentReceived = paymentReceivedStatusJobs.Count(),
                Archived = archivedStatusJobs.Count(),
                New = newStatusJobs.Count()
            };

            return jobStatusStatisticsDto;
        }

        public async Task<JobsAverageRatingDto> GetJobsAverageRating()
        {
            var jobs = await _unitOfWork.Job.GetAllAsync();
            var jobsWithRating = jobs.Where(j => j.Rating != null).ToList();
            double averageRating = jobsWithRating.Average(j => j.Rating) ?? 0;

            JobsAverageRatingDto jobsAverageRatingDto = new JobsAverageRatingDto
            {
                AverageRating = averageRating
            };

            return jobsAverageRatingDto;
        }

        public async Task<JobsRevenueDto> GetJobsRevenue()
        {
            var jobs = await _unitOfWork.Job.GetAllAsync();
            var completedJobs = jobs.Where(j => j.JobStatus == JobStatus.Completed || j.JobStatus == JobStatus.Archived);

            decimal totalRevenue = 0;
            decimal averageRevenue = 0;

            foreach (var job in completedJobs)
            {
                var jobPrice = await _jobService.GetJobPrice(job.Id);
                totalRevenue = totalRevenue + jobPrice.JobPrice;
            }

            averageRevenue = totalRevenue / completedJobs.Count();

            JobsRevenueDto jobsRevenueDto = new JobsRevenueDto
            {
                JobsAverageRevenue = averageRevenue,
                JobsRevenue = totalRevenue
            };

            return jobsRevenueDto;
        }
    }
}
