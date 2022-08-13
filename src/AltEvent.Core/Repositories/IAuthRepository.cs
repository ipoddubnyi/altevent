using AltEvent.Core.Dtos;

namespace AltEvent.Core.Repositories
{
    public interface IAuthRepository
    {
        AuthResultDto? Register(AuthRegistrationDto dto);

        AuthResultDto? Login(AuthLoginDto dto);

        AuthResultDataDto? LoadData(long userId);
    }
}
