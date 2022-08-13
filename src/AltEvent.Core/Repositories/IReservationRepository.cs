using AltEvent.Core.Dtos;
using AltEvent.Core.Models;

namespace AltEvent.Core.Repositories
{
    public interface IReservationRepository
    {
        Task<Reservation?> GetAsync(long id);

        Task<Reservation?> CreateAsync(ReservationCreateDto dto, CreateOptions? options = null);

        Task<Reservation?> UpdateAsync(long id, ReservationUpdateDto dto, UpdateOptions? options = null);

        Task<Reservation?> DeleteAsync(long id, DeleteOptions? options = null);
    }
}
