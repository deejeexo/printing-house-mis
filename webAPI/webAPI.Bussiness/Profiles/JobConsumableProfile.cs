using System;
using AutoMapper;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;

namespace webAPI.Bussiness.Profiles
{
	public class JobConsumableProfile : Profile
	{
		public JobConsumableProfile()
		{
            CreateMap<JobConsumable, AddJobConsumableDto>()
                .ForMember(dest => dest.ConsumableType, from => from.MapFrom(job => job.Consumable!.ConsumableType))
                .ForMember(dest => dest.UnitPrice, from => from.MapFrom(job => job.Consumable!.UnitPrice))
                .ForMember(dest => dest.Name, from => from.MapFrom(job => job.Consumable!.Name));

            CreateMap<AddJobConsumableDto, JobConsumable>()
            .ForMember(dest => dest.Id, from => from.MapFrom(q => Guid.NewGuid()))
            .ForMember(dest => dest.DateCreated, from => from.MapFrom(q => DateTime.Now))
            .ForMember(dest => dest.DateUpdated, from => from.MapFrom(q => DateTime.Now));
        }
	}
}

