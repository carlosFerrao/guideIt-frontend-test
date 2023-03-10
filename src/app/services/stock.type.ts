export interface TStockResponse {
  chart: Chart;
}

export interface Chart {
  result: Result[];
  error: null;
}

export interface Result {
  meta: Meta;
  timestamp: number[];
  indicators: Indicators;
}

export interface Indicators {
  quote: Quote[];
}

export interface Quote {
  high: Array<number>;
  low: Array<number>;
  close: Array<number>;
  volume: Array<number>;
  open: Array<number>;
}

export interface Meta {
  currency: string;
  symbol: string;
  exchangeName: string;
  instrumentType: string;
  firstTradeDate: number;
  regularMarketTime: number;
  gmtoffset: number;
  timezone: string;
  exchangeTimezoneName: string;
  regularMarketPrice: number;
  chartPreviousClose: number;
  previousClose: number;
  scale: number;
  priceHint: number;
  currentTradingPeriod: CurrentTradingPeriod;
  tradingPeriods: Array<Post[]>;
  dataGranularity: string;
  range: string;
  validRanges: string[];
}

export interface CurrentTradingPeriod {
  pre: Post;
  regular: Post;
  post: Post;
}

export interface Post {
  timezone: string;
  end: number;
  start: number;
  gmtoffset: number;
}
