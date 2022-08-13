using AltEvent.Core.Repositories;
using AltEvent.Database.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AltEvent.Database
{
    public static class Extensions
    {
        public static void AddDatabase(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<DatabaseContext>(builder =>
                builder.UseSqlite(connectionString)
            );

            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<ICompanyRepository, CompanyRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped<IReservationRepository, ReservationRepository>();
        }
    }
}
