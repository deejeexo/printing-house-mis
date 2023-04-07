using System;
using webAPI.Bussiness.Services;
using webAPI.Bussiness.Services.IServices;
using webAPI.Bussiness.Validations;
using webAPI.Domain.DTOs;
using webAPI.Infrastructure.Persistence.Repository;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Extensions
{
	public static class AddServiceExtensions
	{
		public static void AddServices(this IServiceCollection services)
		{
			services.AddScoped<IUserService, UserService>();
			services.AddScoped<IJobService, JobService>();
			services.AddScoped<INewsService, NewsService>();
			services.AddScoped<IEquipmentService, EquipmentService>();
			services.AddScoped<IConsumableService, ConsumableService>();
			services.AddScoped<IJobConsumableService, JobConsumableService>();
            services.AddScoped<IJobEquipmentService, JobEquipmentService>();
			services.AddScoped<IStatisticsService, StatisticsService>();
        }

		public static void AddRepository(this IServiceCollection services)
		{
			services.AddScoped<IUnitOfWork, UnitOfWork>();
		}

        public static void AddValidators(this IServiceCollection services)
		{
            services.AddScoped<IValidator<LoginDto>, LoginUserValidator>();
			services.AddScoped<IValidator<RegisterEmployeeDto>, RegisterEmployeeValidator>();
            services.AddScoped<IValidator<RegisterClientDto>, RegisterClientValidator>();
        }
    }
}

