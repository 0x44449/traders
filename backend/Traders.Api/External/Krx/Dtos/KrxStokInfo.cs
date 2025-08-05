using System.Text.Json.Serialization;

namespace Traders.Api.External.Krx.Dtos;

public class KrxStockInfo
{
    /// <summary>
    /// 한글 종목 약명
    /// </summary>
    [JsonPropertyName("ISU_ABBRV")]
    public string IsuAbbrv { get; set; } = string.Empty;

    /// <summary>
    /// 표준 종목 코드
    /// </summary>
    [JsonPropertyName("ISU_CD")]
    public string IsuCd { get; set; } = string.Empty;

    /// <summary>
    /// 영문 종목명
    /// </summary>
    [JsonPropertyName("ISU_ENG_NM")]
    public string IsuEngNm { get; set; } = string.Empty;

    /// <summary>
    /// 한글 종목명
    /// </summary>
    [JsonPropertyName("ISU_NM")]
    public string IsuNm { get; set; } = string.Empty;

    /// <summary>
    /// 종목 단축 코드
    /// </summary>
    [JsonPropertyName("ISU_SRT_CD")]
    public string IsuSrtCd { get; set; } = string.Empty;

    /// <summary>
    /// 주식 종류
    /// </summary>
    [JsonPropertyName("KIND_STKCERT_TP_NM")]
    public string KindStkcertTpNm { get; set; } = string.Empty;

    /// <summary>
    /// 상장 일자 (yyyy/MM/dd)
    /// </summary>
    [JsonPropertyName("LIST_DD")]
    public string ListDd { get; set; } = string.Empty;

    /// <summary>
    /// 상장 주식 수
    /// </summary>
    [JsonPropertyName("LIST_SHRS")]
    public string ListShrs { get; set; } = string.Empty;

    /// <summary>
    /// 시장 구분명
    /// </summary>
    [JsonPropertyName("MKT_TP_NM")]
    public string MktTpNm { get; set; } = string.Empty;

    /// <summary>
    /// 액면가
    /// </summary>
    [JsonPropertyName("PARVAL")]
    public string ParVal { get; set; } = string.Empty;

    /// <summary>
    /// 소속 부(섹션)명
    /// </summary>
    [JsonPropertyName("SECT_TP_NM")]
    public string SectTpNm { get; set; } = string.Empty;

    /// <summary>
    /// 증권 구분명
    /// </summary>
    [JsonPropertyName("SECUGRP_NM")]
    public string SecuGrpNm { get; set; } = string.Empty;
}