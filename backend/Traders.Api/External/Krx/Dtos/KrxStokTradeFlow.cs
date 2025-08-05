using System.Text.Json.Serialization;

namespace Traders.Api.External.Krx.Dtos;

public class KrxStokTradeFlow
{
    /// <summary>
    /// 종목 단축 코드
    /// </summary>
    [JsonPropertyName("ISU_SRT_CD")]
    public string IsuSrtCd { get; set; } = string.Empty;

    /// <summary>
    /// 종목명
    /// </summary>
    [JsonPropertyName("ISU_NM")]
    public string IsuNm { get; set; } = string.Empty;

    /// <summary>
    /// 매도 거래량
    /// </summary>
    [JsonPropertyName("ASK_TRDVOL")]
    public string AskTrdVol { get; set; } = string.Empty;

    /// <summary>
    /// 매수 거래량
    /// </summary>
    [JsonPropertyName("BID_TRDVOL")]
    public string BidTrdVol { get; set; } = string.Empty;

    /// <summary>
    /// 순매수 거래량
    /// </summary>
    [JsonPropertyName("NETBID_TRDVOL")]
    public string NetBidTrdVol { get; set; } = string.Empty;

    /// <summary>
    /// 매도 거래대금
    /// </summary>
    [JsonPropertyName("ASK_TRDVAL")]
    public string AskTrdVal { get; set; } = string.Empty;

    /// <summary>
    /// 매수 거래대금
    /// </summary>
    [JsonPropertyName("BID_TRDVAL")]
    public string BidTrdVal { get; set; } = string.Empty;

    /// <summary>
    /// 순매수 거래대금
    /// </summary>
    [JsonPropertyName("NETBID_TRDVAL")]
    public string NetBidTrdVal { get; set; } = string.Empty;
}