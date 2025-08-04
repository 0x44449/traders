'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AlertCircle, CalendarIcon, CheckCircle, Database, Download, Loader2, Upload } from "lucide-react";
import { useState } from "react";

type UpdateStatus = 'idle' | 'loading' | 'success' | 'error';

export default function DataManage() {
  const [allStocks, setAllStocks] = useState<{ code: string; name: string }[]>([
    { code: '005930', name: '삼성전자' },
    { code: '000660', name: 'SK하이닉스' },
    { code: '035420', name: '네이버' },
    { code: '035720', name: '카카오' },
    { code: '005380', name: '현대차' },
    { code: '051910', name: 'LG화학' },
    { code: '005490', name: 'POSCO' },
    { code: '068270', name: '셀트리온' },
    { code: '207940', name: '삼성바이오로직스' },
    { code: '012330', name: '현대모비스' },
    { code: '005935', name: '삼성전자우' },
    { code: '000270', name: '기아' },
    { code: '035250', name: '아모레퍼시픽' },
    { code: '006400', name: '삼성SDI' },
    { code: '017670', name: 'SK텔레콤' },
  ]);

  const investorTypes = [
    { value: 'individual', label: '개인' },
    { value: 'foreign', label: '외국인' },
    { value: 'institutional', label: '기관' },
    { value: 'private-fund', label: '사모펀드' },
  ];

  // EOD 시세 업데이트
  const [eodDate, setEodDate] = useState<Date>();
  const [eodStatus, setEodStatus] = useState<UpdateStatus>('idle');

  // 종목 정보 업데이트
  const [stockInfoStatus, setStockInfoStatus] = useState<UpdateStatus>('idle');

  // 개별 종목 투자자별 거래실적
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [individualDate, setIndividualDate] = useState<Date>();
  const [individualStatus, setIndividualStatus] = useState<UpdateStatus>('idle');

  // 특정 투자자 전체 종목 거래 실적
  const [selectedInvestor, setSelectedInvestor] = useState<string>('');
  const [investorDate, setInvestorDate] = useState<Date>();
  const [investorStatus, setInvestorStatus] = useState<UpdateStatus>('idle');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: UpdateStatus) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: UpdateStatus) => {
    switch (status) {
      case 'loading':
        return '업데이트 중...';
      case 'success':
        return '업데이트 완료';
      case 'error':
        return '업데이트 실패';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">설정</h1>
        <p className="text-gray-600">데이터 관리 및 시스템 설정을 관리합니다</p>
      </div>

      {/* 데이터 관리 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            데이터 관리
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* EOD 종목 시세 업데이트 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">EOD 종목 시세 업데이트</h3>
              {getStatusIcon(eodStatus)}
            </div>
            <p className="text-sm text-gray-600">
              장 마감 후 종목별 시세 정보를 업데이트합니다. (시가, 고가, 저가, 종가, 거래량 등)
            </p>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="eod-date">업데이트 날짜</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="eod-date"
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-white",
                          !eodDate && "text-muted-foreground"
                        )}
                      >
                        {eodDate ? (
                          formatDate(eodDate)
                        ) : (
                          <span>날짜를 선택하세요</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={eodDate}
                        onSelect={setEodDate}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button
                  // onClick={handleEodUpdate}
                  disabled={eodStatus === 'loading'}
                  className="w-32 flex items-center justify-center gap-2"
                >
                  {eodStatus === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  업데이트
                </Button>
              </div>

              {eodStatus !== 'idle' && (
                <div className="text-sm text-gray-600 flex items-center gap-2 mt-3">
                  {getStatusIcon(eodStatus)}
                  {getStatusText(eodStatus)}
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-6" />

          {/* 종목 정보 업데이트 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">종목 정보 업데이트</h3>
              {getStatusIcon(stockInfoStatus)}
            </div>
            <p className="text-sm text-gray-600">
              신규 상장, 상장폐지, 종목명 변경 등 종목 기본 정보를 업데이트합니다.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <Button
                  // onClick={handleStockInfoUpdate}
                  disabled={stockInfoStatus === 'loading'}
                  className="w-32 flex items-center justify-center gap-2"
                >
                  {stockInfoStatus === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  업데이트
                </Button>

                {stockInfoStatus !== 'idle' && (
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    {getStatusIcon(stockInfoStatus)}
                    {getStatusText(stockInfoStatus)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t pt-6" />

          {/* 개별 종목 투자자별 거래실적 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">개별 종목 투자자별 거래실적</h3>
              {getStatusIcon(individualStatus)}
            </div>
            <p className="text-sm text-gray-600">
              특정 종목의 투자자 유형별(개인, 외국인, 기관 등) 매매 거래 실적을 업데이트합니다.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
              {/* 종목 선택 - 전체 너비 */}
              <div className="space-y-2">
                <Label htmlFor="individual-stock">종목 선택</Label>
                <Select value={selectedStock} onValueChange={setSelectedStock}>
                  <SelectTrigger id="individual-stock" className="bg-white w-full">
                    <SelectValue placeholder="종목을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {allStocks.map((stock) => (
                      <SelectItem key={stock.code} value={stock.code}>
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{stock.name}</span>
                          <span className="text-xs text-gray-500 ml-2">({stock.code})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 날짜 선택과 버튼 */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="individual-date">날짜 선택</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="individual-date"
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-white",
                          !individualDate && "text-muted-foreground"
                        )}
                      >
                        {individualDate ? (
                          formatDate(individualDate)
                        ) : (
                          <span>날짜 선택</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={individualDate}
                        onSelect={setIndividualDate}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button
                  // onClick={handleIndividualUpdate}
                  disabled={individualStatus === 'loading'}
                  className="w-32 flex items-center justify-center gap-2"
                >
                  {individualStatus === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  업데이트
                </Button>
              </div>

              {individualStatus !== 'idle' && (
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  {getStatusIcon(individualStatus)}
                  {getStatusText(individualStatus)}
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-6" />

          {/* 특정 투자자 전체 종목 거래 실적 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">특정 투자자 전체 종목 거래 실적</h3>
              {getStatusIcon(investorStatus)}
            </div>
            <p className="text-sm text-gray-600">
              특정 투자자 유형의 전체 종목에 대한 거래 실적을 일괄 업데이트합니다.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
              {/* 투자자 유형 선택 - 전체 너비 */}
              <div className="space-y-2">
                <Label htmlFor="investor-type">투자자 유형</Label>
                <Select value={selectedInvestor} onValueChange={setSelectedInvestor}>
                  <SelectTrigger id="investor-type" className="bg-white w-full">
                    <SelectValue placeholder="투자자 유형을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {investorTypes.map((investor) => (
                      <SelectItem key={investor.value} value={investor.value}>
                        {investor.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 날짜 선택과 버튼 */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="investor-date">날짜 선택</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="investor-date"
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-white",
                          !investorDate && "text-muted-foreground"
                        )}
                      >
                        {investorDate ? (
                          formatDate(investorDate)
                        ) : (
                          <span>날짜 선택</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={investorDate}
                        onSelect={setInvestorDate}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button
                  // onClick={handleInvestorUpdate}
                  disabled={investorStatus === 'loading'}
                  className="w-32 flex items-center justify-center gap-2"
                >
                  {investorStatus === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  업데이트
                </Button>
              </div>

              {investorStatus !== 'idle' && (
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  {getStatusIcon(investorStatus)}
                  {getStatusText(investorStatus)}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}