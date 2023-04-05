using System;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using AutoMapper;
using webAPI.Bussiness.Services.IServices;
using webAPI.Bussiness.Utilities;
using webAPI.Bussiness.Validations;
using webAPI.Domain.DTOs;
using webAPI.Domain.Enums;
using webAPI.Domain.Models;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Bussiness.Services
{
	public class JobService : IJobService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public JobService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			this._unitOfWork = unitOfWork;
			this._mapper = mapper;
		}

        public async Task<Result<Job>> CreateJob(JobDto jobdto)
		{
			var jobCreated = _mapper.Map<Job>(jobdto);
			_unitOfWork.Job.Add(jobCreated);
            await _unitOfWork.SaveAsync();
			return jobCreated;
		}

        public async Task<IEnumerable<JobDto>> GetAllJobs()
        {
			var jobs = await _unitOfWork.Job.GetAllAsync(nameof(Job.User));
			var jobsDto = _mapper.Map<List<JobDto>>(jobs);

            foreach (var job in jobsDto)
            {
                var jobPrice = await GetJobPrice(job.Id);
                job.JobPrice = jobPrice.JobPrice;
            }

            return jobsDto;
        }

		public async Task<Job> AddReview(NewReviewDto newReviewDto)
		{
			var jobToEdit = await _unitOfWork.Job.GetAsync(job => job.Id == newReviewDto.Id);
			if (jobToEdit != null)
			{
				jobToEdit.Feedback = newReviewDto.Feedback;
				jobToEdit.Rating = newReviewDto.Rating;
                _unitOfWork.Job.Update(jobToEdit);
				await _unitOfWork.SaveAsync();
            }
			return jobToEdit!;
		}

        public async Task<IEnumerable<JobDto>> GetClientJobs(Guid id)
        {
			var clientJobs = await _unitOfWork.Job.GetAllAsync(q => q.CustomerId == id);
            var jobs =_mapper.Map<List<JobDto>>(clientJobs);

            foreach (var job in jobs)
            {
                var jobPrice = await GetJobPrice(job.Id);
                job.JobPrice = jobPrice.JobPrice;
            }

            return jobs;
        }

        public async Task<IEnumerable<JobDto>> GetCuratorJobs(Guid id)
        {
            var curatorJobs = await _unitOfWork.Job.GetAllAsync(q => q.Curator == id, nameof(Job.User));
            var jobs = _mapper.Map<List<JobDto>>(curatorJobs);

            foreach (var job in jobs)
            {
                var jobPrice = await GetJobPrice(job.Id);
                job.JobPrice = jobPrice.JobPrice;
            }

            return jobs;
        }

        public async Task<JobDto> GetJob(Guid id)
        {
            var job = await _unitOfWork.Job.GetAsync(job => job.Id == id, nameof(Job.User));
            var jobDto = _mapper.Map<JobDto>(job);

            if (job is not null)
            {
                var jobPrice = await GetJobPrice(job.Id);
                jobDto.JobPrice = jobPrice.JobPrice;
            }


            return jobDto;
        }

        public async Task<Job> AddCurator(AddCuratorDto addCuratorDto)
        {
            var jobToEdit = await _unitOfWork.Job.GetAsync(job => job.Id == addCuratorDto.JobId);
            if (jobToEdit != null)
            {
				jobToEdit.Curator = addCuratorDto.Curator;
                _unitOfWork.Job.Update(jobToEdit);
                await _unitOfWork.SaveAsync();
            }
            return jobToEdit!;
        }

        public async Task<Job> UpdateJobStatus(UpdateJobStatusDto updateJobStatusDto)
        {
            var jobToEdit = await _unitOfWork.Job.GetAsync(job => job.Id == updateJobStatusDto.JobId, nameof(Job.User));
            if (jobToEdit != null)
            {
                jobToEdit.Due = updateJobStatusDto.Due;
                jobToEdit.JobStatus = updateJobStatusDto.JobStatus;
                _unitOfWork.Job.Update(jobToEdit);
                await _unitOfWork.SaveAsync();

                if (updateJobStatusDto.JobStatus.Equals(JobStatus.Billing))
                {
                    EmailSender.SendBillingEmail(jobToEdit.User!.Email, jobToEdit.Name);
                } else if (updateJobStatusDto.JobStatus.Equals(JobStatus.PaymentReceived))
                {
                    EmailSender.SendPaymentReceivedEmail(jobToEdit.User!.Email, jobToEdit.Name);
                } else if (updateJobStatusDto.JobStatus.Equals(JobStatus.Approved))
                {
                    EmailSender.SendJobApproveEmail(jobToEdit.User!.Email, jobToEdit.Name);
                } else if (updateJobStatusDto.JobStatus.Equals(JobStatus.Cancelled | JobStatus.Delayed))
                {
                    EmailSender.SendRejectedEmail(jobToEdit.User!.Email, jobToEdit.Name);
                }
            }
            return jobToEdit!;
        }

        public async Task<Result<JobConsumable>> AddJobConsumable(AddJobConsumableDto addJobConsumableDto)
        {
            var jobConsumableToCheck = await _unitOfWork.JobConsumable.GetAllAsync(jobConsumable => jobConsumable.ConsumableId == addJobConsumableDto.ConsumableId && jobConsumable.JobId == addJobConsumableDto.JobId);
            if (jobConsumableToCheck.Count != 0)
            {
                return null!;
            }
            var jobConsumable = _mapper.Map<JobConsumable>(addJobConsumableDto);
            _unitOfWork.JobConsumable.Add(jobConsumable);
            await _unitOfWork.SaveAsync();
            return jobConsumable;
        }

        public async Task<Result<JobEquipment>> AddJobEquipment(AddJobEquipmentDto addJobEquipmentDto)
        {
            var jobEquipmentToCheck = await _unitOfWork.JobEquipment.GetAllAsync(jobEquipment => jobEquipment.EquipmentId == addJobEquipmentDto.EquipmentId && jobEquipment.JobId == addJobEquipmentDto.JobId);
            if (jobEquipmentToCheck.Count != 0)
            {
                return null!;
            }
            var jobEquipment = _mapper.Map<JobEquipment>(addJobEquipmentDto);
            _unitOfWork.JobEquipment.Add(jobEquipment);
            await _unitOfWork.SaveAsync();
            return jobEquipment;
        }

        public async Task<IEnumerable<AddJobEquipmentDto>> GetJobEquipments(Guid id)
        {
            var jobEquipments = await _unitOfWork.JobEquipment.GetAllAsync(q => q.JobId == id, nameof(JobEquipment.Equipment));
            return _mapper.Map<List<AddJobEquipmentDto>>(jobEquipments);
        }

        public async Task<IEnumerable<AddJobConsumableDto>> GetJobConsumables(Guid id)
        {
            var jobConsumables = await _unitOfWork.JobConsumable.GetAllAsync(q => q.JobId == id, nameof(JobConsumable.Consumable));
            return _mapper.Map<List<AddJobConsumableDto>>(jobConsumables);
        }

        public async Task<JobConsumable> DeleteJobConsumable(Guid consumableId)
        {
            var consumableToDelete = await _unitOfWork.JobConsumable.GetAsync(consumable => consumable.Id == consumableId);
            if (consumableToDelete != null)
            {
                _unitOfWork.JobConsumable.Remove(consumableToDelete);
                await _unitOfWork.SaveAsync();
            }

            return consumableToDelete!;
        }

        public async Task<JobEquipment> DeleteJobEquipment(Guid equipmentId)
        {
            var equipmentToDelete = await _unitOfWork.JobEquipment.GetAsync(equipment => equipment.Id == equipmentId);
            if (equipmentToDelete != null)
            {
                _unitOfWork.JobEquipment.Remove(equipmentToDelete);
                await _unitOfWork.SaveAsync();
            }

            return equipmentToDelete!;
        }

        public async Task<JobPriceDto> GetJobPrice(Guid jobId)
        {
            decimal totalCost = 0;

            var jobEquipments = await GetJobEquipments(jobId);
            var jobConsumables = await GetJobConsumables(jobId);

            foreach (var equipment in jobEquipments)
            {
                totalCost += equipment.Hours * equipment.CostPerHour;
            }

            foreach (var consumable in jobConsumables)
            {
                totalCost += consumable.QuantityUsed * consumable.UnitPrice;
            }

            decimal employeeTax = totalCost * 0.12m;

            totalCost += employeeTax;

            totalCost = Math.Truncate(totalCost * 100) / 100;

            JobPriceDto jobPriceDto = new JobPriceDto
            {
                JobPrice = totalCost
            };

            return jobPriceDto;
        }
    }
}

