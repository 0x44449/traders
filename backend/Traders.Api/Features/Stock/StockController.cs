using Microsoft.AspNetCore.Mvc;
using Traders.Api.Core.Dtos;
using Traders.Api.Core.Entities;

namespace Traders.Api.Features.Stock;

[ApiController]
[Route("api/v1/stocks")]
public class StockController : ControllerBase
{
    private readonly StockService stockService;

    public StockController(StockService stockService)
    {
        this.stockService = stockService;
    }

    [HttpGet("eod/query/{symbol}/range")]
    public async Task<ActionResult<ApiResultDto<List<EodStockQuote>>>> GetEodStocksRange([FromRoute] string symbol, [FromQuery] DateOnly startDate, [FromQuery] DateOnly endDate)
    {
        var stocks = await stockService.GetEodStocksRangeBySymbolAsync(symbol, startDate, endDate);

        var result = new ApiResultDto<List<EodStockQuote>>(stocks);
        return Ok(result);
    }

    [HttpPost("eod/bulk")]
    public async Task<ActionResult<ApiResultDto<object>>> BulkInsertEodStocksFromCsv(IFormFile file, [FromQuery] DateOnly quoteDate)
    {
        await stockService.BulkInsertEodStockFromCsvFileAsync(file, quoteDate);

        return Ok(new ApiResultDto<object?>(null));
    }

    [HttpGet("info/query/{name}")]
    public async Task<ActionResult<ApiResultDto<StockInfo?>>> GetStockInfoByName([FromRoute] string name)
    {
        var stockInfo = await stockService.GetStockInfoByNameAsync(name);

        return Ok(new ApiResultDto<StockInfo?>(stockInfo));
    }

    [HttpPost("info/bulk")]
    public async Task<ActionResult<ApiResultDto<object>>> BulkInsertStockInfoFromCsv(IFormFile file)
    {
        await stockService.BulkInsertStockInfoFromCsvFileAsync(file);

        return Ok(new ApiResultDto<object?>(null));
    }
}