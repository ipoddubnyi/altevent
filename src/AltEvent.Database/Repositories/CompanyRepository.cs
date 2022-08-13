using AltEvent.Core.Dtos;
using AltEvent.Core.Models;
using AltEvent.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AltEvent.Database.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly DatabaseContext context;

        public CompanyRepository(DatabaseContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Company>> GetAsync(CompanyQuery query)
        {
            if (query.Search != null)
            {
                var companies = from c in context.Companies
                                where EF.Functions.Like(c.Name, $"%{query.Search}%")
                                select c;

                return await companies.ToListAsync();
            }

            return Array.Empty<Company>();
        }

        public Task<Company?> GetAsync(long id)
        {
            return context.Companies.FirstOrDefaultAsync(c => c.Id == id);
        }

        public Task<Company?> GetByUserAsync(User user)
        {
            return context.Companies
                .Where(c => c.Users.Contains(user))
                .FirstOrDefaultAsync();
        }

        public async Task<Company?> CreateAsync(CompanyCreateDto dto, CreateOptions? options)
        {
            var entity = await context.Companies.AddAsync(new Company()
            {
                Name = dto.Name,
                Description = dto.Description,
                Users = dto.Users,
            });

            if (options?.Transaction == null)
                await context.SaveChangesAsync();

            return entity?.Entity;
        }

        public async Task<Company?> UpdateAsync(long id, CompanyUpdateDto dto, UpdateOptions? options)
        {
            var company = await GetAsync(id);

            if (company == null)
                return null;

            if (dto.Name != null)
                company.Name = dto.Name;

            if (dto.Description != null)
                company.Description = dto.Description;

            if (dto.Users != null)
                company.Users = dto.Users;

            if (options?.Transaction == null)
                await context.SaveChangesAsync();

            return company;
        }
    }
}
