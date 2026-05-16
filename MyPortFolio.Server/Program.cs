using Microsoft.EntityFrameworkCore;
using MyPortFolio.Server.Data;
using MyPortFolio.Server.Repositories.Interfaces;
using MyPortFolio.Server.Repositories;
using MyPortFolio.Server.Services.Interfaces;
using MyPortFolio.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var corsPolicy = builder.Configuration["CorsSettings:PolicyName"] ?? "DefaultPolicy";
var allowedOrigins = builder.Configuration.GetSection("CorsSettings:AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy, policy =>
    {
        if (allowedOrigins != null && allowedOrigins.Length > 0)
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
        else
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    });
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<PortfolioDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("MyCon")));
builder.Services.AddScoped<IAboutMeRepository, AboutMeRepository>();
builder.Services.AddScoped<IContactRepository, ContactRepository>();
builder.Services.AddScoped<IEducationRepository, EducationRepository>();
builder.Services.AddScoped<IExperienceRepository, ExperienceRepository>();
builder.Services.AddScoped<IAboutMeService, AboutMeService>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IEducationService, EducationService>();
builder.Services.AddScoped<IExperienceService, ExperienceService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        SeedData.Initialize(services);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(corsPolicy);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
