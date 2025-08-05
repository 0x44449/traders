namespace Traders.Api.External.Krx;

public enum KrxInvestorType
{
    /// <summary>
    /// 전체
    /// </summary>
    All = 9999,

    /// <summary>
    /// 개인
    /// </summary>
    Individual = 8000,

    /// <summary>
    /// 기관합계
    /// </summary>
    InstitutionTotal = 7050,

    /// <summary>
    /// 외국인
    /// </summary>
    Foreign = 9000,

    /// <summary>
    /// 금융투자업
    /// </summary>
    FinancialInvestment = 1000,

    /// <summary>
    /// 보험업
    /// </summary>
    Insurance = 2000,

    /// <summary>
    /// 사모펀드
    /// </summary>
    PrivateEquityFund = 3100,
}