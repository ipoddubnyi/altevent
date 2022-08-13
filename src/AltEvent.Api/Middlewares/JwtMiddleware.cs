using AltEvent.Api.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace AltEvent.Api.Middlewares
{
    // See:
    // https://jasonwatmore.com/post/2019/10/11/aspnet-core-3-jwt-authentication-tutorial-with-example-api
    // https://codepedia.info/jwt-authentication-in-aspnet-core-web-api-token

    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        //private readonly AppSettings _appSettings;
        private readonly IConfiguration configuration;

        // TODO: брать из конфига только нужную секцию
        // public JwtMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings)
        public JwtMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            this.configuration = configuration;
            // _appSettings = appSettings.Value;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                AttachDataToContext(context, token);

            await _next(context);
        }

        private void AttachDataToContext(HttpContext context, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                tokenHandler.ValidateToken(
                    token,
                    TokenService.GetTokenValidationParameters(configuration),
                    out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = long.Parse(jwtToken.Claims.First(x => x.Type == "User").Value);
                var companyId = long.Parse(jwtToken.Claims.First(x => x.Type == "Company").Value);

                // добавлять данные из токена в контекст при удачной валидации токена
                context.Items["UserId"] = userId;
                context.Items["CompanyId"] = companyId;
            }
            catch
            {
                // do nothing if jwt validation fails
                // user is not attached to context so request won't have access to secure routes
            }
        }
    }
}
