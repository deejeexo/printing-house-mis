using System;
using AutoMapper;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;

namespace webAPI.Bussiness.Profiles
{
	public class NewsProfile : Profile
	{
		public NewsProfile()
		{
			CreateMap<News, NewsDto>();

            CreateMap<NewsDto, News>()
          .ForMember(dest => dest.Id, from => from.MapFrom(q => Guid.NewGuid()))
          .ForMember(dest => dest.DateCreated, from => from.MapFrom(q => DateTime.Now))
          .ForMember(dest => dest.DateUpdated, from => from.MapFrom(q => DateTime.Now));
        }
	}
}

