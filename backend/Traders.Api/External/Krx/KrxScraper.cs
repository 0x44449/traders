using System.Text.Json;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using Traders.Api.External.Krx.Dtos;

namespace Traders.Api.External.Krx;

public class KrxScraper
{
    public async Task<List<KrxEodStockPrice>> GetEodStockPricesAsync(DateOnly date)
    {
        var form = new Dictionary<string, string>
        {
            ["bld"] = "dbms/MDC/STAT/standard/MDCSTAT01501",
            ["locale"] = "ko_KR",
            ["mktId"] = "ALL",
            ["trdDd"] = date.ToString("yyyyMMdd"),
            ["share"] = "1",
            ["money"] = "1",
            ["csvxls_isNo"] = "false"
        };
        var formData = GetFormData(form);

        var json = await Scrape(formData);
        var result = JsonSerializer.Deserialize<KrxResult<List<KrxEodStockPrice>>>(json);
        if (result == null)
        {
            throw new Exception("Failed to parse KRX EOD stock prices.");
        }

        return result.Data;
    }

    public async Task<List<KrxStockInfo>> GetStockInfoAsync()
    {
        var form = new Dictionary<string, string>
        {
            ["bld"] = "dbms/MDC/STAT/standard/MDCSTAT01901",
            ["locale"] = "ko_KR",
            ["mktId"] = "ALL",
            ["share"] = "1",
            ["csvxls_isNo"] = "false"
        };
        var formData = GetFormData(form);

        var json = await Scrape(formData);
        var result = JsonSerializer.Deserialize<KrxResult<List<KrxStockInfo>>>(json);
        if (result == null)
        {
            throw new Exception("Failed to parse KRX stock info.");
        }

        return result.Data;
    }

    protected string GetFormData(Dictionary<string, string> form)
    {
        return string.Join("&", form.Select(kv => $"{kv.Key}={kv.Value}"));
    }

    protected async Task<string> Scrape(string formData)
    {
        var options = new ChromeOptions();
        options.AddArgument("--headless");
        options.AddArgument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36");
        using var driver = new ChromeDriver(options);

        driver.Navigate().GoToUrl("http://data.krx.co.kr/contents/MDC/MDI/mdiLoader/index.cmd?menuId=MDC0201");
        Thread.Sleep(2000);

        string script = $@"
const callback = arguments[arguments.length - 1];
fetch('http://data.krx.co.kr/comm/bldAttendant/getJsonData.cmd', {{
  method: 'POST',
  headers: {{
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }},
  credentials: 'include',
  body: new URLSearchParams('{formData}')
}})
.then(res => res.text())
.then(text => callback(text))
.catch(err => callback('ERROR: '+err));
";

        var responseObj = ((IJavaScriptExecutor)driver).ExecuteAsyncScript(script);
        var responseText = responseObj as string;
        if (responseText == null)
        {
            throw new Exception("Failed to scrape data from KRX.");
        }

        return responseText;
    }
}