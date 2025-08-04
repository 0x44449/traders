using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Traders.Api.Core.Contexts;
using Traders.Api.Features.Stock;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

builder.Services.AddDbContext<StockContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Stock") ?? "Data Source=stock.db"));
builder.Services.AddStockFeature();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Traders API",
        Version = "v1",
        Description = "API for Traders application"
    });
});

var app = builder.Build();

app.MapControllers();

var connectionString = builder.Configuration.GetConnectionString("Stock")!;
var dataSource = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder(connectionString).DataSource!;
var dbDirectory = Path.GetDirectoryName(Path.GetFullPath(dataSource))!;
if (!Directory.Exists(dbDirectory))
{
    Directory.CreateDirectory(dbDirectory);
}
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<StockContext>();
    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("v1/swagger.json", "My API V1");
});

app.UseHttpsRedirection();

app.Run();
