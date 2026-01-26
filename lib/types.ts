// Types for Dynamic Price and Waste Optimizer Dashboard

export type StoreId = 'store-a' | 'store-b' | 'store-c';

export interface WastePoint {
  date: string;
  storeId: StoreId;
  organicKg: number;
  inorganicKg: number;
}

export interface ForecastActualPoint {
  label: string;
  forecastKg: number;
  actualKg: number;
}

export interface Summary {
  totalKg: number;
  organicKg: number;
  inorganicKg: number;
  organicChangePct: number;
  inorganicChangePct: number;
}

export type TimeRange = '30d' | '12m';

export interface LineChartPoint {
  date: string;
  'store-a': number;
  'store-b': number;
  'store-c': number;
}

export interface DashboardState {
  timeRange: TimeRange;
  selectedStores: Set<StoreId>;
  setTimeRange: (range: TimeRange) => void;
  toggleStore: (storeId: StoreId) => void;
  selectAllStores: () => void;
  resetStores: () => void;
}
