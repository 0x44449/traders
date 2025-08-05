using System.ComponentModel.DataAnnotations;
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
    [Required] public decimal OpenPrice { get; init; }

    /// <summary>
    /// 종가
    /// </summary>
    [Required] public decimal ClosePrice { get; init; }

    /// <summary>
    /// 고가
    /// </summary>
    [Required] public decimal HighPrice { get; init; }

    /// <summary>
    /// 저가
    /// </summary>
    [Required] public decimal LowPrice { get; init; }

    /// <summary>
    /// 대비 (절대값)
    /// </summary>
    [Required] public decimal PriceChange { get; init; }

    /// <summary>
    /// 등락률
    /// </summary>
    [Required] public decimal PriceChangePercentage { get; init; }

    /// <summary>
    /// 거래량
    /// </summary>
    [Required] public long Volume { get; init; }

    /// <summary>
    /// 거래대금
    /// </summary>
    [Required] public decimal Turnover { get; init; }

    /// <summary>
    /// 시가총액
    /// </summary>
    [Required] public decimal MarketCap { get; init; }

    /// <summary>
    /// 상장주식수
    /// </summary>
    [Required] public long OutstandingShares { get; init; }

    /// <summary>
    /// 적재일
    /// </summary>
    [Required] public DateOnly QuoteDate { get; init; }

    [Required] public DateTime UpdatedAt { get; set; } = DateTime.Now;
}
