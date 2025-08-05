using System.Text.Json.Serialization;

namespace Traders.Api.External.Krx.Dtos;

public class KrxResult<T> where T : new()
{
    [JsonPropertyName("CURRENT_DATETIME")]
    public string CurrentDateTime { get; set; } = string.Empty;

    [JsonPropertyName("OutBlock_1")]
    public T Data { get; set; } = new T();
}