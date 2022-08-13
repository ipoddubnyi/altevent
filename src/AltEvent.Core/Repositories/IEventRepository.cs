using AltEvent.Core.Dtos;
using AltEvent.Core.Models;

namespace AltEvent.Core.Repositories
{
    public interface IEventRepository
    {
        IEnumerable<Event> Get(long companyId, EventQuery query);

        Event? Get(long id);

        Event? Create(long companyId, EventCreateDto dto, CreateOptions? options = null);

        Event? Update(long id, EventUpdateDto dto, UpdateOptions? options = null);

        Event? Delete(long id, DeleteOptions? options = null);
    }
}
