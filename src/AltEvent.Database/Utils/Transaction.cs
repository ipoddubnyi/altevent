namespace AltEvent.Database.Utils
{
    public class Transaction
    {
        private readonly TransactionHandler handler;

        private Transaction(DatabaseContext context)
        {
            handler = new TransactionHandler(context);
        }

        private T Begin<T>(Func<TransactionHandler, T> func)
        {
            try
            {
                var result = func(handler);

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

        private async Task<T> BeginAsync<T>(Func<TransactionHandler, Task<T>> func)
        {
            try
            {
                var result = await func(handler);

                if (!handler.Aborted)
                    await handler.CommitAsync();

                return result;
            }
            catch (Exception)
            {
                handler.Rollback();
                throw;
            }
        }

        public static T Begin<T>(DatabaseContext context, Func<TransactionHandler, T> func)
        {
            return new Transaction(context).Begin(func);
        }

        public static Task<T> BeginAsync<T>(DatabaseContext context, Func<TransactionHandler, Task<T>> func)
        {
            return new Transaction(context).BeginAsync(func);
        }
    }
}
