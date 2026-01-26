import { WastePoint, ForecastActualPoint, LineChartPoint, Summary } from './types';

// 12 months of data for 3 stores (2024)
const monthlyWasteData: WastePoint[] = [
  // Store A
  { date: '2024-01', storeId: 'store-a', organicKg: 120, inorganicKg: 45 },
  { date: '2024-02', storeId: 'store-a', organicKg: 135, inorganicKg: 52 },
  { date: '2024-03', storeId: 'store-a', organicKg: 128, inorganicKg: 48 },
  { date: '2024-04', storeId: 'store-a', organicKg: 145, inorganicKg: 58 },
  { date: '2024-05', storeId: 'store-a', organicKg: 152, inorganicKg: 61 },
  { date: '2024-06', storeId: 'store-a', organicKg: 165, inorganicKg: 68 },
  { date: '2024-07', storeId: 'store-a', organicKg: 178, inorganicKg: 72 },
  { date: '2024-08', storeId: 'store-a', organicKg: 172, inorganicKg: 70 },
  { date: '2024-09', storeId: 'store-a', organicKg: 155, inorganicKg: 62 },
  { date: '2024-10', storeId: 'store-a', organicKg: 142, inorganicKg: 56 },
  { date: '2024-11', storeId: 'store-a', organicKg: 138, inorganicKg: 54 },
  { date: '2024-12', storeId: 'store-a', organicKg: 148, inorganicKg: 59 },

  // Store B
  { date: '2024-01', storeId: 'store-b', organicKg: 95, inorganicKg: 38 },
  { date: '2024-02', storeId: 'store-b', organicKg: 108, inorganicKg: 42 },
  { date: '2024-03', storeId: 'store-b', organicKg: 102, inorganicKg: 40 },
  { date: '2024-04', storeId: 'store-b', organicKg: 118, inorganicKg: 47 },
  { date: '2024-05', storeId: 'store-b', organicKg: 125, inorganicKg: 50 },
  { date: '2024-06', storeId: 'store-b', organicKg: 138, inorganicKg: 55 },
  { date: '2024-07', storeId: 'store-b', organicKg: 150, inorganicKg: 60 },
  { date: '2024-08', storeId: 'store-b', organicKg: 145, inorganicKg: 58 },
  { date: '2024-09', storeId: 'store-b', organicKg: 128, inorganicKg: 51 },
  { date: '2024-10', storeId: 'store-b', organicKg: 115, inorganicKg: 46 },
  { date: '2024-11', storeId: 'store-b', organicKg: 110, inorganicKg: 44 },
  { date: '2024-12', storeId: 'store-b', organicKg: 122, inorganicKg: 49 },

  // Store C
  { date: '2024-01', storeId: 'store-c', organicKg: 78, inorganicKg: 32 },
  { date: '2024-02', storeId: 'store-c', organicKg: 85, inorganicKg: 35 },
  { date: '2024-03', storeId: 'store-c', organicKg: 82, inorganicKg: 33 },
  { date: '2024-04', storeId: 'store-c', organicKg: 92, inorganicKg: 38 },
  { date: '2024-05', storeId: 'store-c', organicKg: 98, inorganicKg: 40 },
  { date: '2024-06', storeId: 'store-c', organicKg: 110, inorganicKg: 45 },
  { date: '2024-07', storeId: 'store-c', organicKg: 125, inorganicKg: 51 },
  { date: '2024-08', storeId: 'store-c', organicKg: 118, inorganicKg: 48 },
  { date: '2024-09', storeId: 'store-c', organicKg: 105, inorganicKg: 42 },
  { date: '2024-10', storeId: 'store-c', organicKg: 92, inorganicKg: 37 },
  { date: '2024-11', storeId: 'store-c', organicKg: 88, inorganicKg: 36 },
  { date: '2024-12', storeId: 'store-c', organicKg: 98, inorganicKg: 40 },
];

// Last 30 days of daily data
const dailyWasteData: WastePoint[] = [];
const startDate = new Date(2024, 11, 1); // Dec 1, 2024
for (let i = 0; i < 30; i++) {
  const date = new Date(startDate);
  date.setDate(date.getDate() + i);
  const dateStr = date.toISOString().split('T')[0];

  dailyWasteData.push(
    { date: dateStr, storeId: 'store-a', organicKg: Math.floor(Math.random() * 20 + 8), inorganicKg: Math.floor(Math.random() * 8 + 3) },
    { date: dateStr, storeId: 'store-b', organicKg: Math.floor(Math.random() * 18 + 7), inorganicKg: Math.floor(Math.random() * 7 + 2) },
    { date: dateStr, storeId: 'store-c', organicKg: Math.floor(Math.random() * 15 + 6), inorganicKg: Math.floor(Math.random() * 6 + 2) }
  );
}

// Forecast vs Actual bar chart data
export const forecastActualData: ForecastActualPoint[] = [
  { label: 'Waste', forecastKg: 70, actualKg: 55 }
];

// Generate line chart data aggregated by month
export function generateLineChartData(monthlyData: WastePoint[]): LineChartPoint[] {
  const dataMap = new Map<string, LineChartPoint>();

  monthlyData.forEach(point => {
    if (!dataMap.has(point.date)) {
      dataMap.set(point.date, {
        date: point.date,
        'store-a': 0,
        'store-b': 0,
        'store-c': 0,
      });
    }

    const item = dataMap.get(point.date)!;
    const total = point.organicKg + point.inorganicKg;
    item[point.storeId] += total;
  });

  return Array.from(dataMap.values()).sort((a, b) => a.date.localeCompare(b.date));
}

// Calculate summary stats from waste data
export function calculateSummary(data: WastePoint[], previousData: WastePoint[]): Summary {
  const totalKg = data.reduce((sum, p) => sum + p.organicKg + p.inorganicKg, 0);
  const organicKg = data.reduce((sum, p) => sum + p.organicKg, 0);
  const inorganicKg = data.reduce((sum, p) => sum + p.inorganicKg, 0);

  const prevTotalOrganic = previousData.reduce((sum, p) => sum + p.organicKg, 0);
  const prevTotalInorganic = previousData.reduce((sum, p) => sum + p.inorganicKg, 0);

  const organicChangePct = prevTotalOrganic > 0 ? ((organicKg - prevTotalOrganic) / prevTotalOrganic) * 100 : 0;
  const inorganicChangePct = prevTotalInorganic > 0 ? ((inorganicKg - prevTotalInorganic) / prevTotalInorganic) * 100 : 0;

  return {
    totalKg,
    organicKg,
    inorganicKg,
    organicChangePct,
    inorganicChangePct,
  };
}

// Export mock data generators
export const mockData = {
  monthly: monthlyWasteData,
  daily: dailyWasteData,
  lineChart: generateLineChartData(monthlyWasteData),
  forecastActual: forecastActualData,
};

// Get data for current time range
export function getWasteDataForRange(timeRange: '12m' | '30d'): WastePoint[] {
  return timeRange === '12m' ? monthlyWasteData : dailyWasteData;
}

// Get previous period data for comparison
export function getPreviousWasteData(timeRange: '12m' | '30d'): WastePoint[] {
  if (timeRange === '12m') {
    // Return previous 12 months (2023)
    return monthlyWasteData.map(p => ({
      ...p,
      organicKg: Math.floor(p.organicKg * 0.95),
      inorganicKg: Math.floor(p.inorganicKg * 0.95),
    }));
  } else {
    // Return previous 30 days
    return dailyWasteData.slice(0, Math.ceil(dailyWasteData.length / 2)).map(p => ({
      ...p,
      organicKg: Math.floor(p.organicKg * 0.92),
      inorganicKg: Math.floor(p.inorganicKg * 0.92),
    }));
  }
}
