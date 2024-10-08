﻿using AltEvent.Core.Dtos;
using AltEvent.Core.Models;
using AltEvent.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AltEvent.Database.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly DatabaseContext context;

        public EventRepository(DatabaseContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Event>> GetAsync(long companyId, EventQuery query)
        {
            var start = query.Start != null ? DateOnly.Parse(query.Start) : DateOnly.MinValue;
            var end = query.End != null ? DateOnly.Parse(query.End) : DateOnly.MaxValue;

            return await context.Events
                .Where(e => e.CompanyId == companyId)
                .Where(e => !e.IsDeleted)
                .Where(e =>
                    e.StartDate >= start && e.StartDate <= end ||
                    e.EndDate >= start && e.EndDate <= end
                )
                .Include(e => e.Reservations)
                .Select(e => e)
                .ToListAsync();
        }

        public Task<Event?> GetAsync(long id)
        {
            return context.Events
                .Where(e => e.Id == id)
                .Include(e => e.Reservations)
                .FirstOrDefaultAsync();
        }

        public async Task<Event?> CreateAsync(long companyId, EventCreateDto dto, CreateOptions? options = null)
        {
            var entity = await context.Events.AddAsync(new Event()
            {
                CompanyId = companyId,
                CreatorId = dto.CreatorId,
                Name = dto.Name,
                Description = dto.Description,
                AllDay = dto.AllDay,
                StartDate = DateOnly.Parse(dto.StartDate),
                EndDate = DateOnly.Parse(dto.EndDate),
                StartTime = dto.StartTime != null ? TimeOnly.Parse(dto.StartTime) : null,
                EndTime = dto.EndTime != null ? TimeOnly.Parse(dto.EndTime) : null,
                Location = dto.Location,
                Capacity = dto.Capacity,
                Hosts = dto.Hosts,
            });

            if (options?.Transaction == null)
                await context.SaveChangesAsync();

            return entity?.Entity;
        }

        public async Task<Event?> UpdateAsync(long id, EventUpdateDto dto, UpdateOptions? options = null)
        {
            var evnt = await GetAsync(id);

            if (evnt == null)
                return null;

            if (dto.Name != null)
                evnt.Name = dto.Name;

            if (dto.Description != null)
                evnt.Description = dto.Description;

            if (dto.AllDay != null)
                evnt.AllDay = dto.AllDay.Value;

            if (dto.StartDate != null)
                evnt.StartDate = DateOnly.Parse(dto.StartDate);

            if (dto.EndDate != null)
                evnt.EndDate = DateOnly.Parse(dto.EndDate);

            if (dto.StartTime != null)
                evnt.StartTime = dto.StartTime != null ? TimeOnly.Parse(dto.StartTime) : null;

            if (dto.EndTime != null)
                evnt.EndTime = dto.EndTime != null ? TimeOnly.Parse(dto.EndTime) : null;

            if (dto.Location != null)
                evnt.Location = dto.Location;

            if (dto.Capacity != null)
                evnt.Capacity = dto.Capacity.Value;

            if (dto.Hosts != null)
                evnt.Hosts = dto.Hosts;

            if (options?.Transaction == null)
                await context.SaveChangesAsync();

            return evnt;
        }

        public async Task<Event?> DeleteAsync(long id, DeleteOptions? options = null)
        {
            var evnt = await GetAsync(id);

            if (evnt == null)
                return null;

            evnt.IsDeleted = true;

            if (options?.Transaction == null)
                await context.SaveChangesAsync();

            return evnt;
        }
    }
}
