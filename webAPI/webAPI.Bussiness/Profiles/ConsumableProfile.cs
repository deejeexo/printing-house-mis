using System;
using AutoMapper;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;

namespace webAPI.Bussiness.Profiles
{
	public class ConsumableProfile : Profile
	{
		public ConsumableProfile()
		{
			CreateMap<Consumable, ConsumableDto>();

            CreateMap<ConsumableDto, Consumable>()
			.ForMember(dest => dest.Id, from => from.MapFrom(q => Guid.NewGuid()))
			.ForMember(dest => dest.DateCreated, from => from.MapFrom(q => DateTime.Now))
			.ForMember(dest => dest.DateUpdated, from => from.MapFrom(q => DateTime.Now));
        }
	}
}

