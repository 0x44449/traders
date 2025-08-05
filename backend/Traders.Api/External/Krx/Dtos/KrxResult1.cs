using System.Text.Json.Serialization;

namespace Traders.Api.External.Krx.Dtos;

public class KrxResult1<T> where T : new()
{
    [JsonPropertyName("CURRENT_DATETIME")]
    public string CurrentDateTime { get; set; } = string.Empty;

    [JsonPropertyName("output")]
    public T Data { get; set; } = new T();
}