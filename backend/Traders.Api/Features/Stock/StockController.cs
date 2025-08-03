using Microsoft.AspNetCore.Mvc;

namespace Traders.Api.Features.Stock;

[ApiController]
[Route("api/v1/stocks")]
public class StockController : ControllerBase
{
    private readonly StockService _stockService;

    public StockController(StockService stockService)
    {
        _stockService = stockService;
    }

    [HttpGet("all")]
    public async Task<ActionResult<string>> GetAllStocks()
    {
        var stocks = await _stockService.GetAllStocksAsync();
        return stocks;
    }
}