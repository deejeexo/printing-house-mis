﻿using System;
using Microsoft.EntityFrameworkCore;
using webAPI.Domain.Models;

namespace webAPI.Infrastructure
{
	public class ApplicationDbContext: DbContext
	{
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<News> News { get; set; }
    }
}

