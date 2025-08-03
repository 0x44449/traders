'use client';

import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">주식 거래 정보</h1>
            <p className="text-sm text-gray-500">종목 검색 및 거래량 비교 분석</p>
          </div>
        </div>

        {/* <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            새로고침
          </Button>
        </div> */}
      </div>
    </header>
  )
}