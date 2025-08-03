namespace Traders.Api.Features.Stock;

public static class StockDependencyInjection
{
    public static IServiceCollection AddStockFeature(this IServiceCollection services)
    {
        services.AddScoped<StockService>();
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddOpenApi();

        return services;
    }
}