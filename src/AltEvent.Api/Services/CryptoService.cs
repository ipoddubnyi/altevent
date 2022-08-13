using AltEvent.Core.Services;

namespace AltEvent.Api.Services
{
    public class CryptoService : ICryptoService
    {
        public string Hash(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, 10);
        }

        public bool Verify(string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }
}
