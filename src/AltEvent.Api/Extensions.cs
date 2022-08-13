using AltEvent.Api.Services;
using AltEvent.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace AltEvent.Api
{
    public static class Extensions
    {
        public static void AddAltEventAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.SaveToken = true;
                o.TokenValidationParameters = TokenService.GetTokenValidationParameters(configuration);
            });
        }

        public static void AddAltEventCors(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCors(options =>
            {
                var origin = configuration["Client:Origin"];
                options.AddPolicy(name: Resource.CORS_POLICY_NAME,
                                  policy =>
                                  {
                                      policy.WithOrigins(origin)
                                        .AllowAnyHeader()
                                        .AllowAnyMethod()
                                        .AllowCredentials();
                                  });
            });
        }

        public static void AddAltEventDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            services.AddDatabase(connectionString);
        }
    }
}
