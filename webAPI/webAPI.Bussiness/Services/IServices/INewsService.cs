using System;
using webAPI.Bussiness.Utilities;
using webAPI.Domain.DTOs;
using webAPI.Domain.Models;

namespace webAPI.Bussiness.Services.IServices
{
	public interface INewsService
	{
		Task<Result<News>> CreateNews(NewsDto newsDto);

		Task<IEnumerable<NewsDto>> GetAllNews();
    }
}

