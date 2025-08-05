using System.Text.Json.Serialization;

namespace Traders.Api.External.Krx.Dtos;

public class KrxEodStockPrice
{
    /// <summary>
    /// 누적 거래대금 - 거래대금
    /// </summary>
    [JsonPropertyName("ACC_TRDVAL")]
    public string AccTrdVal { get; set; } = string.Empty;

    /// <summary>
    /// 누적 거래량 - 거래량
    /// </summary>
    [JsonPropertyName("ACC_TRDVOL")]
    public string AccTrdVol { get; set; } = string.Empty;

    /// <summary>
    /// 전일 대비 가격 변동 - 대비
    /// </summary>
    [JsonPropertyName("CMPPREVDD_PRC")]
    public string CmpPrevddPrc { get; set; } = string.Empty;

    /// <summary>
    /// 등락률
    /// </summary>
    [JsonPropertyName("FLUC_RT")]
    public string FlucRt { get; set; } = string.Empty;

    /// <summary>
    /// 등락 구분 코드 (상승/하락 구분)
    /// </summary>
    [JsonPropertyName("FLUC_TP_CD")]
    public string FlucTpCd { get; set; } = string.Empty;

    /// <summary>
    /// 종목 약어 - Name
    /// </summary>
    [JsonPropertyName("ISU_ABBRV")]
    public string IsuAbbrv { get; set; } = string.Empty;

    /// <summary>
    /// 종목 코드
    /// </summary>
    [JsonPropertyName("ISU_CD")]
    public string IsuCd { get; set; } = string.Empty;

    /// <summary>
    /// 종목 단축 코드 - Symbol
    /// </summary>
    [JsonPropertyName("ISU_SRT_CD")]
    public string IsuSrtCd { get; set; } = string.Empty;

    /// <summary>
    /// 상장 주식 수
    /// </summary>
    [JsonPropertyName("LIST_SHRS")]
    public string ListShrs { get; set; } = string.Empty;

    /// <summary>
    /// 시가 총액
    /// </summary>
    [JsonPropertyName("MKTCAP")]
    public string MktCap { get; set; } = string.Empty;

    /// <summary>
    /// 시장 ID
    /// </summary>
    [JsonPropertyName("MKT_ID")]
    public string MktId { get; set; } = string.Empty;

    /// <summary>
    /// 시장 구분명 - MarketType
    /// </summary>
    [JsonPropertyName("MKT_NM")]
    public string MktNm { get; set; } = string.Empty;

    /// <summary>
    /// 소속 부(섹션)명 - Section
    /// </summary>
    [JsonPropertyName("SECT_TP_NM")]
    public string SectTpNm { get; set; } = string.Empty;

    /// <summary>
    /// 당일 종가
    /// </summary>
    [JsonPropertyName("TDD_CLSPRC")]
    public string TddClsPrc { get; set; } = string.Empty;

    /// <summary>
    /// 당일 최고가
    /// </summary>
    [JsonPropertyName("TDD_HGPRC")]
    public string TddHgPrc { get; set; } = string.Empty;

    /// <summary>
    /// 당일 최저가
    /// </summary>
    [JsonPropertyName("TDD_LWPRC")]
    public string TddLwPrc { get; set; } = string.Empty;

    /// <summary>
    /// 당일 시가
    /// </summary>
    [JsonPropertyName("TDD_OPNPRC")]
    public string TddOpnPrc { get; set; } = string.Empty;
}