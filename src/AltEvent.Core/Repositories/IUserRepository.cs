using AltEvent.Core.Dtos;
using AltEvent.Core.Models;

namespace AltEvent.Core.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetAsync(long id);

        Task<User?> GetByEmailAsync(string email);

        Task<User?> CreateAsync(UserCreateDto dto, CreateOptions? options);

        Task<User?> UpdateAsync(long id, UserUpdateDto dto, UpdateOptions? options);

        Task<User?> ChangePasswordAsync(long id, UserChangePasswordDto dto, UpdateOptions? options);
    }
}
