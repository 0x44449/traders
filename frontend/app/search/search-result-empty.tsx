'use client';

import { TrendingUp } from "lucide-react";

export default function SearchResultEmpty() {
  return (
    <div className="text-center py-20">
      <div className="max-w-md mx-auto">
        <TrendingUp className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          종목을 검색해보세요
        </h2>
        <p className="text-gray-500 mb-6">
          위의 검색창에서 비교하고 싶은 종목들을 검색해보세요.<br />
          예: "삼성전자 네이버", "카카오 현대차"
        </p>
        <div className="text-sm text-gray-400">
          💡 여러 종목을 동시에 검색하면 좌우로 분리하여 비교할 수 있습니다
        </div>
      </div>
    </div>
  )
}