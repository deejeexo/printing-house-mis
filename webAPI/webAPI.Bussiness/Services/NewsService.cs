using System;
using AutoMapper;
using webAPI.Bussiness.Services.IServices;
using webAPI.Bussiness.Utilities;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Bussiness.Services
{
    public class NewsService : INewsService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public NewsService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public async Task<Result<News>> CreateNews(NewsDto newsDto)
        {
            var newsCreated = _mapper.Map<News>(newsDto);
            _unitOfWork.News.Add(newsCreated);
            await _unitOfWork.SaveAsync();
            return newsCreated;
        }

        public async Task<IEnumerable<NewsDto>> GetAllNews()
        {
            var news = await _unitOfWork.News.GetAllAsync();
            var newsDto = _mapper.Map<List<NewsDto>>(news);
            newsDto = newsDto.OrderByDescending(n => n.DateCreated).ToList();
            return newsDto;
        }
    }
}

