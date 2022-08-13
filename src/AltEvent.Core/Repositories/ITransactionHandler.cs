namespace AltEvent.Core.Repositories
{
    public interface ITransactionHandler
    {
        bool Aborted { get; }

        void Commit();

        void Rollback();
    }
}
