namespace Traders.Api.Core.Dtos;

public class ApiResultDto<T>
{
    /// <summary>
    /// 결과 데이터
    /// </summary>
    public T Data { get; set; }

    /// <summary>
    /// 성공 여부
    /// </summary>
    public bool Success { get; set; }

    /// <summary>
    /// 오류 코드 (성공 시 null)
    /// </summary>
    public string? ErrorCode { get; set; }

    public ApiResultDto(T data)
    {
        Data = data;
        Success = true;
    }

    public ApiResultDto(T data, bool success, string? errorCode = null)
    {
        Data = data;
        Success = success;
        ErrorCode = errorCode;
    }
}