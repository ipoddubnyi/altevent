namespace AltEvent.Database.Utils
{
    public class Transaction
    {
        private readonly TransactionHandler handler;

        private Transaction(DatabaseContext context)
        {
            handler = new TransactionHandler(context);
        }

        private T Begin<T>(Func<TransactionHandler, T> action)
        {
            try
            {
                var result = action(handler);

                if (!handler.Aborted)
                    handler.Commit();

                return result;
            }
            catch (Exception)
            {
                handler.Rollback();
                throw;
            }
        }

        public static T Begin<T>(DatabaseContext context, Func<TransactionHandler, T> action)
        {
            return new Transaction(context).Begin(action);
        }
    }
}
