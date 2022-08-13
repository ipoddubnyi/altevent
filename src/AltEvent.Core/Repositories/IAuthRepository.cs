using AltEvent.Core.Dtos;

namespace AltEvent.Core.Repositories
{
    public interface IAuthRepository
    {
        Task<AuthResultDto?> RegisterAsync(AuthRegistrationDto dto);

        Task<AuthResultDto?> LoginAsync(AuthLoginDto dto);

        Task<AuthResultDataDto?> LoadDataAsync(long userId);
    }
}
