using Microsoft.EntityFrameworkCore;
using Traders.Api.Core.Types;

namespace Traders.Api.Core.Entities;

[PrimaryKey(nameof(Symbol), nameof(QuoteDate))]
public class EodStockQuote
{
    /// <summary>
    /// 종목 코드
    /// </summary>
    public required string Symbol { get; init; }

    /// <summary>
    /// 종목명
    /// </summary>
    public required string Name { get; init; }

    /// <summary>
    /// 시장 종류 (KOSPI, KOSDAQ 등)
    /// </summary>
    public required MarketType Market { get; init; }

    /// <summary>
    /// 소속부
    /// </summary>
    public required string Section { get; init; }

    /// <summary>
    /// 시가
    /// </summary>
    public decimal OpenPrice { get; init; }

    /// <summary>
    /// 종가
    /// </summary>
    public decimal ClosePrice { get; init; }

    /// <summary>
    /// 고가
    /// </summary>
    public decimal HighPrice { get; init; }

    /// <summary>
    /// 저가
    /// </summary>
    public decimal LowPrice { get; init; }

    /// <summary>
    /// 대비 (절대값)
    /// </summary>
    public decimal PriceChange { get; init; }

    /// <summary>
    /// 등락률
    /// </summary>
    public decimal PriceChangePercentage { get; init; }

    /// <summary>
    /// 거래량
    /// </summary>
    public long Volume { get; init; }

    /// <summary>
    /// 거래대금
    /// </summary>
    public decimal Turnover { get; init; }

    /// <summary>
    /// 시가총액
    /// </summary>
    public decimal MarketCap { get; init; }

    /// <summary>
    /// 상장주식수
    /// </summary>
    public long OutstandingShares { get; init; }

    /// <summary>
    /// 적재일
    /// </summary>
    public DateOnly QuoteDate { get; init; }

    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}
