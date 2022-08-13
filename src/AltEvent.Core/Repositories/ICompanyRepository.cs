using AltEvent.Core.Dtos;
using AltEvent.Core.Models;

namespace AltEvent.Core.Repositories
{
    public interface ICompanyRepository
    {
        Task<IEnumerable<Company>> GetAsync(CompanyQuery query);

        Task<Company?> GetAsync(long id);

        Task<Company?> GetByUserAsync(User user);

        Task<Company?> CreateAsync(CompanyCreateDto dto, CreateOptions? options);

        Task<Company?> UpdateAsync(long id, CompanyUpdateDto dto, UpdateOptions? options);
    }
}
