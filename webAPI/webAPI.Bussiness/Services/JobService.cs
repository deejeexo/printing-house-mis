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
    }
}

