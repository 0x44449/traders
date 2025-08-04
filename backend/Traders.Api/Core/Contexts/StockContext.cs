using Microsoft.EntityFrameworkCore;
using Traders.Api.Core.Entities;

namespace Traders.Api.Core.Contexts;

public class StockContext : DbContext
{
    public DbSet<StockInfo> StockInfos => Set<StockInfo>();
    public DbSet<EodStockQuote> EodStockQuotes => Set<EodStockQuote>();

    public StockContext(DbContextOptions<StockContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder) { }
}