using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using webAPI.Infrastructure.Persistence.Repository.IRepository;

namespace webAPI.Infrastructure.Persistence.Repository
{

    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DbSet<T> _dbSet;

        public Repository(ApplicationDbContext dbContext)
        {
            _dbSet = dbContext.Set<T>();
        }

        public void Add(T entity)
        {
            _dbSet.Add(entity);
        }

        public T? Get(Expression<Func<T, bool>> filter, string? includeProperties = null)
        {
            IQueryable<T> query = _dbSet;
            query = query.Where(filter);
            query = IncludePropertiesIfExists(includeProperties, query);
            return query.FirstOrDefault();
        }

        public ICollection<T> GetAll(Expression<Func<T, bool>>? filter = null, string? includeProperties = null)
        {
            IQueryable<T> query = _dbSet;
            if (filter is not null) query = query.Where(filter);
            query = IncludePropertiesIfExists(includeProperties, query);
            return query.ToList();
        }

        public void Remove(T entity)
        {
            _dbSet.Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public async Task<T?> GetAsync(Expression<Func<T, bool>> filter, string? includeProperties = null)
        {
            IQueryable<T> query = _dbSet;
            query = query.Where(filter);
            query = IncludePropertiesIfExists(includeProperties, query);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<ICollection<T>> GetAllAsync(string? includeProperties = null)
        {
            IQueryable<T> query = _dbSet;
            query = IncludePropertiesIfExists(includeProperties, query);
            return await query.ToListAsync();
        }

        public async Task<ICollection<T>> GetAllAsync(Expression<Func<T, bool>> filter, string? includeProperties = null)
        {
            IQueryable<T> query = _dbSet;
            query = query.Where(filter);
            query = IncludePropertiesIfExists(includeProperties, query);
            return await query.ToListAsync();
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }

        private IQueryable<T> IncludePropertiesIfExists(string? includeProperties, IQueryable<T> query)
        {
            if (includeProperties != null)
            {
                query = IncludeProperties(includeProperties, query);
            }

            return query;
        }

        private IQueryable<T> IncludeProperties(string includeProperties, IQueryable<T> query)
        {
            foreach (var includeProp in includeProperties.Split(',', StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProp);
            }

            return query;
        }
    }
}