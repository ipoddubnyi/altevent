using AltEvent.Core.Dtos;
using AltEvent.Core.Models;
using AltEvent.Core.Repositories;
using AltEvent.Core.Services;

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

        public User? Get(long id)
        {
            return context.Users.FirstOrDefault(u => u.Id == id);
        }

        public User? GetByEmail(string email)
        {
            return context.Users
                .Where(u => u.Email.ToLower().Equals(email.ToLower()))
                .FirstOrDefault();
        }

        public User? Create(UserCreateDto dto, CreateOptions? options)
        {
            var entity = context.Users.Add(new User()
            {
                Name = dto.Name,
                Description = dto.Description,
                Phone = dto.Phone,
                Email = dto.Email,
                Password = dto.Password,
            });

            if (options?.Transaction == null)
                context.SaveChanges();

            return entity?.Entity;
        }

        public User? Update(long id, UserUpdateDto dto, UpdateOptions? options)
        {
            var user = Get(id);

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
                context.SaveChanges();

            return user;
        }

        public User? ChangePassword(long id, UserChangePasswordDto dto, UpdateOptions? options)
        {
            var user = context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                return null;

            if (!cryptoService.Verify(dto.OldPassword, user.Password))
                throw new ApplicationException("Invalid old password.");

            user.Password = cryptoService.Hash(dto.NewPassword);

            if (options?.Transaction == null)
                context.SaveChanges();

            return user;
        }
    }
}
