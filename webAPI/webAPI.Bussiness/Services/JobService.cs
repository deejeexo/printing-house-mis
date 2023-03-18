using System;
using System.Reflection;
using AutoMapper;
using webAPI.Bussiness.Services.IServices;
using webAPI.Bussiness.Utilities;
using webAPI.Bussiness.Validations;
using webAPI.Domain.DTOs;
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
			var jobs = await _unitOfWork.Job.GetAllAsync();
			var jobsDto = _mapper.Map<List<JobDto>>(jobs);
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
			return _mapper.Map<List<JobDto>>(clientJobs);
        }
    }
}

