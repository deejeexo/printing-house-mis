using System;
using AutoMapper;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;

namespace webAPI.Bussiness.Profiles
{
	public class JobProfile : Profile
	{
		public JobProfile()
		{
            CreateMap<Job, JobDto>()
                .ForMember(dest => dest.CustomerFullName, from => from.MapFrom(job => job.User!.FullName));

            CreateMap<JobDto, Job>()
            .ForMember(dest => dest.Id, from => from.MapFrom(q => Guid.NewGuid()))
            .ForMember(dest => dest.DateCreated, from => from.MapFrom(q => DateTime.Now))
            .ForMember(dest => dest.DateUpdated, from => from.MapFrom(q => DateTime.Now));
        }
	}
}

