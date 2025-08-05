using System.Text.Json.Serialization;

namespace Traders.Api.External.Krx.Dtos;

public class KrxInvestorTradeFlow
{
    /// <summary>
    /// 매도 거래대금
    /// </summary>
    [JsonPropertyName("ASK_TRDVAL")]
    public string AskTrdVal { get; set; } = string.Empty;

    /// <summary>
    /// 매도 거래량
    /// </summary>
    [JsonPropertyName("ASK_TRDVOL")]
    public string AskTrdVol { get; set; } = string.Empty;

    /// <summary>
    /// 매수 거래대금
    /// </summary>
    [JsonPropertyName("BID_TRDVAL")]
    public string BidTrdVal { get; set; } = string.Empty;

    /// <summary>
    /// 매수 거래량
    /// </summary>
    [JsonPropertyName("BID_TRDVOL")]
    public string BidTrdVol { get; set; } = string.Empty;

    /// <summary>
    /// 체결 객체 유형 코드 (빈 문자열일 수 있음)
    /// </summary>
    [JsonPropertyName("CONV_OBJ_TP_CD")]
    public string ConvObjTpCd { get; set; } = string.Empty;

    /// <summary>
    /// 투자자 유형명
    /// </summary>
    [JsonPropertyName("INVST_TP_NM")]
    public string InvstTpNm { get; set; } = string.Empty;

    /// <summary>
    /// 순매수 거래대금
    /// </summary>
    [JsonPropertyName("NETBID_TRDVAL")]
    public string NetBidTrdVal { get; set; } = string.Empty;

    /// <summary>
    /// 순매수 거래량
    /// </summary>
    [JsonPropertyName("NETBID_TRDVOL")]
    public string NetBidTrdVol { get; set; } = string.Empty;
}