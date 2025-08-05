import { EodStockQuote, StockInfo } from "@/api/generated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon, BarChart3, Building2, DollarSign, Star, StarIcon, TrendingDown, TrendingUp } from "lucide-react";

interface StockInfoListItemProps {
  stock: StockInfo;
  stockQuote: EodStockQuote;
  stockColor: string;
  isInWatchlist?: boolean;
}

export default function StockInfoListItem(props: StockInfoListItemProps) {
  const { stock, stockQuote, stockColor, isInWatchlist } = props;

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  const formatTradingValue = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}천억`;
    } else {
      return `${value}억`;
    }
  };

  const formatMarketCap = (value: number) => {
    if (value >= 10000) {
      return `${(value / 10000).toFixed(1)}조`;
    } else {
      return `${value.toLocaleString()}억`;
    }
  };

  const getMarketBadgeColor = (market: string) => {
    switch (market) {
      case 'KOSPI':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'KOSDAQ':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] bg-gradient-to-r from-white via-gray-50/30 to-white border border-gray-200 rounded-xl p-6 hover:border-blue-300"
      // onClick={() => onStockClick(stock)}
    >
      {/* 왼쪽 색상 바 */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ backgroundColor: stockColor }}
      />

      <div className="flex items-center justify-between">
        {/* 왼쪽: 종목 기본 정보 */}
        <div className="flex items-center gap-4">
          <div
            className="w-4 h-4 rounded-full shadow-sm ring-2 ring-white"
            style={{ backgroundColor: stockColor }}
          />

          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {stock.koreanShortName}
              </h3>
              <Badge
                variant="outline"
                className={`text-xs ${getMarketBadgeColor(stock.market)}`}
              >
                {stock.market}
              </Badge>
              <span className="text-xs text-gray-500 font-mono">{stock.symbol}</span>
            </div>

            {/* 현재가와 등락률, 대비 */}
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold text-gray-900">
                {stockQuote.openPrice.toLocaleString()}원
              </span>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${stockQuote.priceChangePercentage > 0
                ? 'bg-red-100 text-red-700'
                : stockQuote.priceChangePercentage < 0
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
                }`}>
                {stockQuote.priceChangePercentage > 0 ?
                  <TrendingUp className="h-3 w-3" /> :
                  <TrendingDown className="h-3 w-3" />
                }
                {stockQuote.priceChangePercentage > 0 ? '+' : ''}{stockQuote.priceChangePercentage}%
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-normal ${stockQuote.priceChange > 0
                ? 'text-red-600'
                : stockQuote.priceChange < 0
                  ? 'text-blue-600'
                  : 'text-gray-600'
                }`}>
                {stockQuote.priceChange > 0 ? '+' : ''}{stockQuote.priceChange.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 거래 정보와 액션 */}
        <div className="flex items-center gap-6">
          {/* 저가 */}
          <div className="text-center">
            <div className="flex items-center gap-1 mb-1 justify-center">
              <ArrowDownIcon className="h-3 w-3 text-blue-600" />
              <span className="text-xs font-medium text-gray-600">저가</span>
            </div>
            <div className="text-base font-medium text-blue-700">
              {stockQuote.lowPrice.toLocaleString()}원
            </div>
          </div>

          {/* 고가 */}
          <div className="text-center">
            <div className="flex items-center gap-1 mb-1 justify-center">
              <ArrowUpIcon className="h-3 w-3 text-red-600" />
              <span className="text-xs font-medium text-gray-600">고가</span>
            </div>
            <div className="text-base font-medium text-red-700">
              {stockQuote.highPrice.toLocaleString()}원
            </div>
          </div>

          {/* 거래량 */}
          <div className="text-center">
            <div className="flex items-center gap-1 mb-1 justify-center">
              <BarChart3 className="h-3 w-3 text-green-600" />
              <span className="text-xs font-medium text-gray-600">거래량</span>
            </div>
            <div className="text-base font-medium text-gray-900">
              {formatVolume(stockQuote.volume)}주
            </div>
          </div>

          {/* 거래대금 */}
          <div className="text-center">
            <div className="flex items-center gap-1 mb-1 justify-center">
              <DollarSign className="h-3 w-3 text-orange-600" />
              <span className="text-xs font-medium text-gray-600">거래대금</span>
            </div>
            <div className="text-base font-medium text-gray-900">
              {formatTradingValue(stockQuote.turnover)}원
            </div>
          </div>

          {/* 시가총액 */}
          <div className="text-center">
            <div className="flex items-center gap-1 mb-1 justify-center">
              <Building2 className="h-3 w-3 text-purple-600" />
              <span className="text-xs font-medium text-gray-600">시가총액</span>
            </div>
            <div className="text-base font-medium text-gray-900 mb-1">
              {formatMarketCap(stockQuote.marketCap)}원
            </div>
            {/* <div className="flex items-center gap-2 justify-center">
              <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                {stock.marketCapRank}위
              </div>
            </div> */}
          </div>

          {/* 관심종목 버튼 */}
          <div className="pl-4 border-l border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                // onWatchlistToggle(stock);
              }}
              className={`h-9 w-9 p-0 transition-all duration-200 ${isInWatchlist
                ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50 hover:bg-yellow-100'
                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                }`}
            >
              {isInWatchlist ? (
                <Star className="h-4 w-4 fill-current" />
              ) : (
                <StarIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 호버 시 나타나는 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/2 to-purple-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
    </div>
  )
}