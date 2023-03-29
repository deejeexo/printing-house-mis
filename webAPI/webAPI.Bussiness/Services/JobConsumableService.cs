using System;
using AutoMapper;
using webAPI.Bussiness.Services.IServices;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Bussiness.Services
{
	public class JobConsumableService : IJobConsumableService
	{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public JobConsumableService(IUnitOfWork unitOfWork, IMapper mapper)
		{
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }
	}
}

