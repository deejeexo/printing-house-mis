using System;
using AutoMapper;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;

namespace webAPI.Bussiness.Profiles
{
    public class EquipmentProfile : Profile
    {
        public EquipmentProfile()
        {
            CreateMap<Equipment, EquipmentDto>();

            CreateMap<EquipmentDto, Equipment>()
            .ForMember(dest => dest.Id, from => from.MapFrom(q => Guid.NewGuid()))
            .ForMember(dest => dest.DateCreated, from => from.MapFrom(q => DateTime.Now))
            .ForMember(dest => dest.DateUpdated, from => from.MapFrom(q => DateTime.Now));
        }
    }
}

