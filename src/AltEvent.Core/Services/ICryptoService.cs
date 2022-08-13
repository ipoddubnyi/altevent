namespace AltEvent.Core.Services
{
    public interface ICryptoService
    {
        public string Hash(string password);

        public bool Verify(string password, string hash);
    }
}
