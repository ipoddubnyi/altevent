using AltEvent.Core.Dtos;
using AltEvent.Core.Models;

namespace AltEvent.Core.Repositories
{
    public interface IUserRepository
    {
        User? Get(long id);

        User? GetByEmail(string email);

        User? Create(UserCreateDto dto, CreateOptions? options);

        User? Update(long id, UserUpdateDto dto, UpdateOptions? options);

        User? ChangePassword(long id, UserChangePasswordDto dto, UpdateOptions? options);
    }
}
