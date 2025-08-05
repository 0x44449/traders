/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MarketType } from './MarketType';
export type EodStockQuote = {
    symbol: string;
    name: string;
    market: MarketType;
    section: string;
    openPrice: number;
    closePrice: number;
    highPrice: number;
    lowPrice: number;
    priceChange: number;
    priceChangePercentage: number;
    volume: number;
    turnover: number;
    marketCap: number;
    outstandingShares: number;
    quoteDate: string;
    updatedAt: string;
};

