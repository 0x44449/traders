using System.Globalization;

namespace Traders.Api.External.Krx;

public class KrxConverter
{
    public static long ToLong(string value)
    {
        if (long.TryParse(
            value,
            NumberStyles.AllowLeadingSign | NumberStyles.AllowThousands,             // 천 단위 구분자 허용
            CultureInfo.InvariantCulture,           // ','를 그룹 구분자로 인식
            out long resultLong))
        {
            return resultLong;
        }
        else
        {
            throw new FormatException($"Cannot convert '{value}' to long.");
        }
    }

    public static decimal ToDecimal(string value)
    {
        if (decimal.TryParse(
            value,
            NumberStyles.Number,
            CultureInfo.InvariantCulture,
            out decimal resultDecimal))
        {
            return resultDecimal;
        }
        else
        {
            throw new FormatException($"Cannot convert '{value}' to decimal.");
        }
    }
}