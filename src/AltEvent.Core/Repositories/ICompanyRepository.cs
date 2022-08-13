using AltEvent.Core.Dtos;
using AltEvent.Core.Models;

namespace AltEvent.Core.Repositories
{
    public interface ICompanyRepository
    {
        IEnumerable<Company> Get(CompanyQuery query);

        Company? Get(long id);

        Company? GetByUser(User user);

        Company? Create(CompanyCreateDto dto, CreateOptions? options);

        Company? Update(long id, CompanyUpdateDto dto, UpdateOptions? options);
    }
}
