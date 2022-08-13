using AltEvent.Core.Dtos;
using AltEvent.Core.Models;
using AltEvent.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AltEvent.Database.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly DatabaseContext context;

        public ReservationRepository(DatabaseContext context)
        {
            this.context = context;
        }

        public Reservation? Get(long id)
        {
            return context.Reservations
                .Where(r => r.Id == id)
                .Include(r => r.Event)
                .FirstOrDefault();
        }

        public Reservation? Create(ReservationCreateDto dto, CreateOptions? options = null)
        {
            var rnd = new Random();

            var entity = context.Reservations.Add(new Reservation()
            {
                EventId = dto.EventId,
                Name = dto.Name,
                Comment = dto.Comment,
                Phone = dto.Phone,
                Email = dto.Email,
                AccessCode = rnd.Next(1000, 10000),
            });

            if (options?.Transaction == null)
                context.SaveChanges();

            return entity?.Entity;
        }

        public Reservation? Update(long id, ReservationUpdateDto dto, UpdateOptions? options = null)
        {
            var reservation = Get(id);

            if (reservation == null)
                return null;

            if (dto.Name != null)
                reservation.Name = dto.Name;

            if (dto.Comment != null)
                reservation.Comment = dto.Comment;

            if (dto.Phone != null)
                reservation.Phone = dto.Phone;

            if (dto.Email != null)
                reservation.Email = dto.Email;

            if (options?.Transaction == null)
                context.SaveChanges();

            return reservation;
        }

        public Reservation? Delete(long id, DeleteOptions? options = null)
        {
            var reservation = Get(id);

            if (reservation == null)
                return null;

            context.Reservations.Remove(reservation);

            if (options?.Transaction == null)
                context.SaveChanges();

            return reservation;
        }
    }
}
