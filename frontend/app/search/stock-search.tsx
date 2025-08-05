'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRef, useState } from "react";
import useStockStore from "./stock-context";

export default function StockSearch() {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchQuery, setSearchQuery } = useStockStore();

  const [isSearching, setIsSearching] = useState(false);

  // 인기 검색어 예시
  const popularSearches = [
    '삼성전자 네이버',
    '카카오 카카오뱅크',
    'SK하이닉스 삼성전자',
    'LG화학 LG에너지솔루션'
  ];

  const handleSearch = () => {
    if (inputValue.trim()) {
      // performSearch(inputValue);
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setInputValue('');
    setSearchQuery('');
    // performSearch('');
    inputRef.current?.focus();
  };

  const addPresetSearch = (searchText: string) => {
    setInputValue(searchText);
    // performSearch(searchText);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full bg-white border-b">
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="flex flex-col gap-4">
          {/* 메인 검색바 */}
          <div className="relative max-w-4xl mx-auto w-full">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="종목을 검색해보세요 (예: 삼성전자 네이버, 카카오 현대차)"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={handleKeyPress}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-12 pr-24 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                {inputValue && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                {/* <Button
                  onClick={handleSearch}
                  disabled={!inputValue.trim() || isSearching}
                  // className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  className="px-6 py-2 bg-transparent text-gray-600 rounded-lg"
                >
                  {isSearching ? '검색중...' : '검색'}
                </Button> */}
              </div>
            </div>

            {/* 자동완성 제안 */}
            {/* {showSuggestions && suggestions.length > 0 && (
              <Card className="absolute top-full left-0 right-0 z-50 mt-2 shadow-lg">
                <CardContent className="p-2">
                  <div className="text-xs text-gray-500 mb-2 px-2">검색 제안</div>
                  {suggestions.map((stock) => (
                    <div
                      key={stock.code}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors"
                      onClick={() => handleSuggestionClick(stock.name)}
                    >
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium text-sm">{stock.name}</div>
                          <div className="text-xs text-gray-500">{stock.code} · {stock.market}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {stock.currentPrice.toLocaleString()}원
                        </div>
                        <div className={`text-xs ${stock.changePercent > 0 ? 'text-red-600' :
                          stock.changePercent < 0 ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                          {stock.changePercent > 0 ? '+' : ''}{stock.changePercent}%
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )} */}
          </div>

          {/* 검색 결과 상태 */}
          {/* {searchQuery && (
            <div className="max-w-4xl mx-auto w-full">
              {selectedStocks.length > 0 ? (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>검색 결과:</span>
                  {selectedStocks.map((stock, index) => (
                    <Badge key={stock.code} variant="secondary" className="bg-blue-50 text-blue-700">
                      {stock.name}
                    </Badge>
                  ))}
                  <span className="text-gray-500">
                    ({selectedStocks.length}개 종목)
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <AlertCircle className="h-4 w-4" />
                  <span>"{searchQuery}"에 대한 검색 결과가 없습니다.</span>
                </div>
              )}
            </div>
          )} */}

          {/* 인기 검색어 (검색 전에만 표시) */}
          {!searchQuery && (
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">인기 검색어:</span>
                {popularSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => addPresetSearch(search)}
                    className="h-7 px-3 text-xs bg-gray-50 hover:bg-gray-100 border-gray-200"
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}