using Microsoft.EntityFrameworkCore;
using Traders.Api.Core.Types;

[PrimaryKey(nameof(StandardCode))]
public class StockInfo
{
    /// <summary>
    /// 표준 코드
    /// </summary>
    public required string StandardCode { get; init; }

    /// <summary>
    /// 단축코드
    /// </summary>
    public required string Symbol { get; init; }

    /// <summary>
    /// 한글 종목명
    /// </summary>
    public required string KoreanName { get; init; }

    /// <summary>
    /// 한글 종목약명
    /// </summary>
    public required string KoreanShortName { get; init; }

    /// <summary>
    /// 영문 종목명
    /// </summary>
    public required string EnglishName { get; init; }

    /// <summary>
    /// 상장일
    /// </summary>
    public DateOnly ListingDate { get; init; }

    /// <summary>
    /// 시장 구분 (KOSPI, KOSDAQ 등)
    /// </summary>
    public MarketType Market { get; init; }

    /// <summary>
    /// 증권 구분 (주권, 투자회사 등)
    /// </summary>
    public required string SecurityType { get; init; }

    /// <summary>
    /// 소속부
    /// </summary>
    public required string Section { get; init; }

    /// <summary>
    /// 주식 종류 (보통주, 우선주 등)
    /// </summary>
    public required string ShareClass { get; init; }

    /// <summary>
    /// 액면가
    /// </summary>
    public decimal ParValue { get; init; }

    /// <summary>
    /// 상장 주식 수
    /// </summary>
    public long OutstandingShares { get; init; }

    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}