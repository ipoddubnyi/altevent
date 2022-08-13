using System.Security.Claims;

namespace AltEvent.Core.Services
{
    public interface ITokenService
    {
        string GenerateAccessToken(ClaimsIdentity subject);
    }
}
