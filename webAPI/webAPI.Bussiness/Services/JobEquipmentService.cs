using System;
using AutoMapper;
using webAPI.Bussiness.Services.IServices;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Bussiness.Services
{
	public class JobEquipmentService : IJobEquipmentService
	{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public JobEquipmentService(IUnitOfWork unitOfWork, IMapper mapper)
		{
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }
	}
}

