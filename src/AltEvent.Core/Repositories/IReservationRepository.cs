using AltEvent.Core.Dtos;
using AltEvent.Core.Models;

namespace AltEvent.Core.Repositories
{
    public interface IReservationRepository
    {
        Reservation? Get(long id);

        Reservation? Create(ReservationCreateDto dto, CreateOptions? options = null);

        Reservation? Update(long id, ReservationUpdateDto dto, UpdateOptions? options = null);

        Reservation? Delete(long id, DeleteOptions? options = null);
    }
}
