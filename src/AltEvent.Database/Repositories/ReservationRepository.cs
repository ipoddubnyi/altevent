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

        public Task<Reservation?> GetAsync(long id)
        {
            return context.Reservations
                .Where(r => r.Id == id)
                .Include(r => r.Event)
                .FirstOrDefaultAsync();
        }

        public async Task<Reservation?> CreateAsync(ReservationCreateDto dto, CreateOptions? options = null)
        {
            var rnd = new Random();

            var entity = await context.Reservations.AddAsync(new Reservation()
            {
                EventId = dto.EventId,
                Name = dto.Name,
                Comment = dto.Comment,
                Phone = dto.Phone,
                Email = dto.Email,
                AccessCode = rnd.Next(1000, 10000),
            });

            if (options?.Transaction == null)
                await context.SaveChangesAsync();

            return entity?.Entity;
        }

        public async Task<Reservation?> UpdateAsync(long id, ReservationUpdateDto dto, UpdateOptions? options = null)
        {
            var reservation = await GetAsync(id);

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
                await context.SaveChangesAsync();

            return reservation;
        }

        public async Task<Reservation?> DeleteAsync(long id, DeleteOptions? options = null)
        {
            var reservation = await GetAsync(id);

            if (reservation == null)
                return null;

            context.Reservations.Remove(reservation);

            if (options?.Transaction == null)
                await context.SaveChangesAsync();

            return reservation;
        }
    }
}
