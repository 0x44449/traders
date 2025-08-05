import StockInfoListItem from "./stock-info-list-item";

export default function StockInfoList() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">종목 정보</h3>
      </div>

      <div className="space-y-4">
        {stocksWithRank.map((stock, index) => {
          const isInWatchlist = watchlist.some(w => w.code === stock.code);

          return (
            <StockInfoListItem
              key={stock.code}
              stock={stock}
              index={index}
              isInWatchlist={isInWatchlist}
              onStockClick={handleStockClick}
              onWatchlistToggle={handleWatchlistToggle}
            />
          );
        })}
      </div>

      {/* 리스트 사용법 안내 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <div className="text-center">
          <h4 className="font-medium text-gray-800 mb-2">💡 리스트 사용법</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• 종목 항목을 클릭하면 해당 종목의 상세 정보를 확인할 수 있습니다</p>
            <p>• ⭐ 버튼을 클릭하여 관심종목에 추가할 수 있습니다</p>
            <p>• 왼쪽 색상 바는 차트에서 해당 종목을 구분하는 색상입니다</p>
            <p>• 저가/고가는 당일 기준이며, 현재가 옆에 대비(±원)가 표시됩니다</p>
          </div>
        </div>
      </div>
    </div>
  )
}