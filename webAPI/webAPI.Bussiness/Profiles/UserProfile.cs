using System;
using AutoMapper;
using webAPI.Domain.DTOs;
using webAPI.Domain.Enums;
using webAPI.Domain.Models;

namespace webAPI.Bussiness.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, RegisterClientDto>();
            CreateMap<RegisterClientDto, User>()
            .ForMember(dest => dest.Id, from => from.MapFrom(q => Guid.NewGuid()))
            .ForMember(dest => dest.DateCreated, from => from.MapFrom(q => DateTime.Now))
            .ForMember(dest => dest.DateUpdated, from => from.MapFrom(q => DateTime.Now));

            CreateMap<User, LoginResponseDto>();
            CreateMap<LoginResponseDto, User>()
            .ForMember(dest => dest.Id, from => from.MapFrom(q => Guid.NewGuid()))
            .ForMember(dest => dest.DateCreated, from => from.MapFrom(q => DateTime.Now))
            .ForMember(dest => dest.DateUpdated, from => from.MapFrom(q => DateTime.Now));

            CreateMap<User, RegisterEmployeeDto>();
            CreateMap<RegisterEmployeeDto, User>()
            .ForMember(dest => dest.Id, from => from.MapFrom(q => Guid.NewGuid()))
            .ForMember(dest => dest.DateCreated, from => from.MapFrom(q => DateTime.Now))
            .ForMember(dest => dest.DateUpdated, from => from.MapFrom(q => DateTime.Now));
        }
    }
}

