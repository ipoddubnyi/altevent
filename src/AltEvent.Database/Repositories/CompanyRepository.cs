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

        public IEnumerable<Company> Get(CompanyQuery query)
        {
            if (query.Search != null)
            {
                var companies = from c in context.Companies
                                where EF.Functions.Like(c.Name, $"%{query.Search}%")
                                select c;

                return companies;
            }

            return Array.Empty<Company>();
        }

        public Company? Get(long id)
        {
            return context.Companies.FirstOrDefault(c => c.Id == id);
        }

        public Company? GetByUser(User user)
        {
            return context.Companies
                .Where(c => c.Users.Contains(user))
                .FirstOrDefault();
        }

        public Company? Create(CompanyCreateDto dto, CreateOptions? options)
        {
            var entity = context.Companies.Add(new Company()
            {
                Name = dto.Name,
                Description = dto.Description,
                Users = dto.Users,
            });

            if (options?.Transaction == null)
                context.SaveChanges();

            return entity?.Entity;
        }

        public Company? Update(long id, CompanyUpdateDto dto, UpdateOptions? options)
        {
            var company = Get(id);

            if (company == null)
                return null;

            if (dto.Name != null)
                company.Name = dto.Name;

            if (dto.Description != null)
                company.Description = dto.Description;

            if (dto.Users != null)
                company.Users = dto.Users;

            if (options?.Transaction == null)
                context.SaveChanges();

            return company;
        }
    }
}
