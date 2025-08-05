using System.ComponentModel.DataAnnotations;
using Traders.Api.Core.Types;

namespace Traders.Api.Core.Entities;

public class TradeFlow
{
    /// <summary>
    /// 종목 코드
    /// </summary>
    public required string Symbol { get; init; }

    /// <summary>
    /// 투자자 유형
    /// </summary>
    public required InvestorType InvestorType { get; init; }

    /// <summary>
    /// 매도 거래량
    /// </summary>
    [Required] public long SellVolume { get; init; }

    /// <summary>
    /// 매수 거래량
    /// </summary>
    [Required] public long BuyVolume { get; init; }

    /// <summary>
    /// 순매수 거래량
    /// </summary>
    [Required] public long NetBuyVolume { get; init; }

    /// <summary>
    /// 매도 거래대금
    /// </summary>
    [Required] public long SellValue { get; init; }

    /// <summary>
    /// 매수 거래대금
    /// </summary>
    [Required] public long BuyValue { get; init; }

    /// <summary>
    /// 순매수 거래대금
    /// </summary>
    [Required] public long NetBuyValue { get; init; }

    /// <summary>
    /// 거래 일자
    /// </summary>
    [Required] public DateOnly TradeDate { get; init; }

    [Required] public DateTime UpdatedAt { get; set; } = DateTime.Now;
}