using System;
using AutoMapper;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;

namespace webAPI.Bussiness.Profiles
{
	public class JobEquipmentProfile : Profile
    {
		public JobEquipmentProfile()
		{
            CreateMap<JobEquipment, AddJobEquipmentDto>()
                                .ForMember(dest => dest.EquipmentType, from => from.MapFrom(job => job.Equipment!.Type))
                .ForMember(dest => dest.CostPerHour, from => from.MapFrom(job => job.Equipment!.CostPerHour))
                .ForMember(dest => dest.Name, from => from.MapFrom(job => job.Equipment!.Name));

            CreateMap<AddJobEquipmentDto, JobEquipment>()
            .ForMember(dest => dest.Id, from => from.MapFrom(q => Guid.NewGuid()))
            .ForMember(dest => dest.DateCreated, from => from.MapFrom(q => DateTime.Now))
            .ForMember(dest => dest.DateUpdated, from => from.MapFrom(q => DateTime.Now));
        }
	}
}

