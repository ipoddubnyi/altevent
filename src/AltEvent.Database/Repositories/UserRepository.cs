﻿using AltEvent.Core.Dtos;
using AltEvent.Core.Models;
using AltEvent.Core.Repositories;
using AltEvent.Core.Services;
using Microsoft.EntityFrameworkCore;

namespace AltEvent.Database.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext context;
        private readonly ICryptoService cryptoService;

        public UserRepository(
            DatabaseContext context,
            ICryptoService cryptoService)
        {
            this.context = context;
            this.cryptoService = cryptoService;
        }

        public Task<User?> GetAsync(long id)
        {
            return context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public Task<User?> GetByEmailAsync(string email)
        {
            return context.Users
                .Where(u => u.Email.ToLower().Equals(email.ToLower()))
                .FirstOrDefaultAsync();
        }

        public async Task<User?> CreateAsync(UserCreateDto dto, CreateOptions? options)
        {
            var entity = await context.Users.AddAsync(new User()
            {
                Name = dto.Name,
                Description = dto.Description,
                Phone = dto.Phone,
                Email = dto.Email,
                Password = dto.Password,
            });

            if (options?.Transaction == null)
                await context.SaveChangesAsync();

            return entity?.Entity;
        }

        public async Task<User?> UpdateAsync(long id, UserUpdateDto dto, UpdateOptions? options)
        {
            var user = await GetAsync(id);

            if (user == null)
                return null;

            if (dto.Name != null)
                user.Name = dto.Name;

            if (dto.Description != null)
                user.Description = dto.Description;

            if (dto.Phone != null)
                user.Phone = dto.Phone;

            if (dto.Email != null)
                user.Email = dto.Email;

            if (options?.Transaction == null)
                await context.SaveChangesAsync();

            return user;
        }

        public async Task<User?> ChangePasswordAsync(long id, UserChangePasswordDto dto, UpdateOptions? options)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return null;

            if (!cryptoService.Verify(dto.OldPassword, user.Password))
                throw new ApplicationException("Invalid old password.");

            user.Password = cryptoService.Hash(dto.NewPassword);

            if (options?.Transaction == null)
                await context.SaveChangesAsync();

            return user;
        }
    }
}
