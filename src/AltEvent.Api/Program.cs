using AltEvent.Api;
using AltEvent.Api.Middlewares;
using AltEvent.Api.Services;
using AltEvent.Core.Services;

void StartServer()
{
    var builder = CreateApplicationBuilder(args);
    CreateApplication(builder).Run();
}

WebApplicationBuilder CreateApplicationBuilder(string[] args)
{
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    
    builder.Services.AddScoped<ITokenService, TokenService>();
    builder.Services.AddScoped<ICryptoService, CryptoService>();

    builder.Services.AddAltEventAuthentication(builder.Configuration);
    builder.Services.AddAltEventCors(builder.Configuration);
    builder.Services.AddAltEventDatabase(builder.Configuration);

    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    return builder;
}

WebApplication CreateApplication(WebApplicationBuilder builder)
{
    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    if (!app.Environment.IsDevelopment())
        app.UseHttpsRedirection();

    app.UseCors(Resource.CORS_POLICY_NAME);

    app.UseMiddleware<JwtMiddleware>();

    app.UseAuthentication(); // jwt auth
    app.UseAuthorization();

    app.MapControllers();

    return app;
}

//

StartServer();
