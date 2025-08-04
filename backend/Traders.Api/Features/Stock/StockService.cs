using System.Globalization;
using System.Text;
using CsvHelper;
using CsvHelper.Configuration;
using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;
using Traders.Api.Core.Contexts;
using Traders.Api.Core.Entities;
using Traders.Api.Core.Types;

namespace Traders.Api.Features.Stock;

public class StockService
{
    private readonly StockContext stockContext;

    public StockService(StockContext stockContext)
    {
        this.stockContext = stockContext;
    }

    public async Task<List<EodStockQuote>> GetEodStocksRangeBySymbolAsync(string symbol, DateOnly startDate, DateOnly endDate)
    {
        return await stockContext.EodStockQuotes
            .Where(quote => quote.Symbol == symbol && quote.QuoteDate >= startDate && quote.QuoteDate <= endDate)
            .OrderBy(quote => quote.QuoteDate)
            .ToListAsync();
    }

    public async Task BulkInsertEodStockFromCsvFileAsync(IFormFile file, DateOnly quoteDate)
    {
        var listEodStockQuotes = new List<EodStockQuote>();

        Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
        using var reader = new StreamReader(file.OpenReadStream(), Encoding.GetEncoding(949));
        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            HasHeaderRecord = true,
            MissingFieldFound = null,
            BadDataFound = null
        };

        using var csv = new CsvReader(reader, config);
        if (await csv.ReadAsync()) { }
        while (await csv.ReadAsync())
        {
            var parts = new List<string>();
            for (int i = 0; csv.TryGetField<string>(i, out var field); i++)
            {
                if (field != null)
                {
                    parts.Add(field);
                }
                else
                {
                    break;
                }
            }

            if (parts.Count > 0)
            {
                var record = new EodStockQuote
                {
                    Symbol = parts[0],
                    Name = parts[1],
                    Market = Enum.Parse<MarketType>(parts[2].Replace(" ", "_")),
                    Section = parts[3],
                    ClosePrice = decimal.Parse(parts[4], CultureInfo.InvariantCulture),
                    PriceChange = decimal.Parse(parts[5], CultureInfo.InvariantCulture),
                    PriceChangePercentage = decimal.Parse(parts[6], CultureInfo.InvariantCulture),
                    OpenPrice = decimal.Parse(parts[7], CultureInfo.InvariantCulture),
                    HighPrice = decimal.Parse(parts[8], CultureInfo.InvariantCulture),
                    LowPrice = decimal.Parse(parts[9], CultureInfo.InvariantCulture),
                    Volume = long.Parse(parts[10], CultureInfo.InvariantCulture),
                    Turnover = decimal.Parse(parts[11], CultureInfo.InvariantCulture),
                    MarketCap = decimal.Parse(parts[12], CultureInfo.InvariantCulture),
                    OutstandingShares = long.Parse(parts[13], CultureInfo.InvariantCulture),
                    QuoteDate = quoteDate,
                    UpdatedAt = DateTime.Now
                };

                listEodStockQuotes.Add(record);
            }
        }

        if (listEodStockQuotes.Count > 0)
        {
            await stockContext.BulkInsertOrUpdateAsync(listEodStockQuotes);
        }
    }

    public async Task<StockInfo?> GetStockInfoByNameAsync(string name)
    {
        return await stockContext.StockInfos
            .FirstOrDefaultAsync(stock => stock.KoreanName == name || stock.EnglishName == name || stock.KoreanShortName == name);
    }

    public async Task BulkInsertStockInfoFromCsvFileAsync(IFormFile file)
    {
        var listStockInfos = new List<StockInfo>();

        Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
        using var reader = new StreamReader(file.OpenReadStream(), Encoding.GetEncoding(949));
        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            HasHeaderRecord = true,
            MissingFieldFound = null,
            BadDataFound = null
        };

        using var csv = new CsvReader(reader, config);
        if (await csv.ReadAsync()) { }
        while (await csv.ReadAsync())
        {
            var parts = new List<string>();
            for (int i = 0; csv.TryGetField<string>(i, out var field); i++)
            {
                if (field != null)
                {
                    parts.Add(field);
                }
                else
                {
                    break;
                }
            }

            if (parts.Count > 0)
            {
                var record = new StockInfo
                {
                    StandardCode = parts[0],
                    Symbol = parts[1],
                    KoreanName = parts[2],
                    KoreanShortName = parts[3],
                    EnglishName = parts[4],
                    ListingDate = DateOnly.Parse(parts[5].Replace("/", "-"), CultureInfo.InvariantCulture),
                    Market = Enum.Parse<MarketType>(parts[6].Replace(" ", "_")),
                    SecurityType = parts[7],
                    Section = parts[8],
                    ShareClass = parts[9],
                    ParValue = parts[10] == "무액면" ? -1 : decimal.Parse(parts[10], CultureInfo.InvariantCulture),
                    OutstandingShares = long.Parse(parts[11], CultureInfo.InvariantCulture),
                    UpdatedAt = DateTime.Now
                };

                listStockInfos.Add(record);
            }
        }

        if (listStockInfos.Count > 0)
        {
            await stockContext.BulkInsertOrUpdateAsync(listStockInfos);
        }
    }
}
