using AltEvent.Core.Repositories;

namespace AltEvent.Database.Utils
{
    public class TransactionHandler : ITransactionHandler
    {
        private readonly DatabaseContext context;

        public TransactionHandler(DatabaseContext context)
        {
            this.context = context;
        }

        public bool Aborted { get; private set; }

        public void Commit()
        {
            context.SaveChanges();
        }

        public Task CommitAsync()
        {
            return context.SaveChangesAsync();
        }

        public void Rollback()
        {
            context.ChangeTracker.Clear();
            Aborted = true;
        }
    }
}
