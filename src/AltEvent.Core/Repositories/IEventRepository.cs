using AltEvent.Core.Dtos;
using AltEvent.Core.Models;

namespace AltEvent.Core.Repositories
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAsync(long companyId, EventQuery query);

        Task<Event?> GetAsync(long id);

        Task<Event?> CreateAsync(long companyId, EventCreateDto dto, CreateOptions? options = null);

        Task<Event?> UpdateAsync(long id, EventUpdateDto dto, UpdateOptions? options = null);

        Task<Event?> DeleteAsync(long id, DeleteOptions? options = null);
    }
}
