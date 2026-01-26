'use client';

import { useState, useRef } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { MiniBars } from '@/components/ui/MiniBars';
import { EmptyState } from '@/components/ui/EmptyState';
import { BarForecastVsActual } from '@/components/charts/BarForecastVsActual';
import { DonutTotalWaste } from '@/components/charts/DonutTotalWaste';
import { LineByStore } from '@/components/charts/LineByStore';
import { TimeRangeToggle } from '@/components/pricing/TimeRangeToggle';
import { ExportMenu } from '@/components/pricing/ExportMenu';
import { useDashboardStore } from '@/lib/state/useDashboardStore';
import { 
  mockData, 
  getWasteDataForRange, 
  getPreviousWasteData,
  calculateSummary,
  generateLineChartData
} from '@/lib/mock';
import { Leaf, Zap } from 'lucide-react';

export default function DashboardPage() {
  const { timeRange, setTimeRange, selectedStores, sidebarOpen, toggleSidebar } = useDashboardStore();
  const [showEmptyState, setShowEmptyState] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Get current data based on time range
  const currentData = getWasteDataForRange(timeRange).filter(
    (item) => selectedStores.has(item.storeId)
  );
  
  const previousData = getPreviousWasteData(timeRange).filter(
    (item) => selectedStores.has(item.storeId)
  );

  const summary = calculateSummary(currentData, previousData);

  // Generate line chart data filtered by selected stores
  const lineData = generateLineChartData(
    getWasteDataForRange(timeRange).filter(
      (item) => selectedStores.has(item.storeId)
    )
  ).map(point => ({
    date: point.date,
    'store-a': selectedStores.has('store-a') ? point['store-a'] : 0,
    'store-b': selectedStores.has('store-b') ? point['store-b'] : 0,
    'store-c': selectedStores.has('store-c') ? point['store-c'] : 0,
  }));

  // Mini chart data for stat tiles
  const organicTrendData = currentData
    .filter((d) => d.storeId === 'store-a')
    .slice(0, 7)
    .map((d) => d.organicKg);

  const inorganicTrendData = currentData
    .filter((d) => d.storeId === 'store-a')
    .slice(0, 7)
    .map((d) => d.inorganicKg);

  const handleExportCSV = () => {
    const headers = ['Date', 'Store', 'Organic (kg)', 'Inorganic (kg)', 'Total (kg)'];
    const rows = currentData.map((d) => [
      d.date,
      d.storeId.toUpperCase(),
      d.organicKg,
      d.inorganicKg,
      d.organicKg + d.inorganicKg,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waste-data-${timeRange}.csv`;
    a.click();
  };

  const handleExportPNG = async () => {
    if (!chartRef.current) return;
    const htmlToImage = (await import('html-to-image')).default;
    try {
      const image = await htmlToImage.toPng(chartRef.current);
      const a = document.createElement('a');
      a.href = image;
      a.download = `waste-chart-${timeRange}.png`;
      a.click();
    } catch (err) {
      console.error('Failed to export chart:', err);
    }
  };

  if (selectedStores.size === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Sidebar activeRoute="overview" isOpen={sidebarOpen} onToggle={toggleSidebar} />
        <Topbar title="Dashboard" breadcrumbs={[{ label: 'Home' }, { label: 'Dashboard' }]} sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
        <Container sidebarOpen={sidebarOpen}>
          <Card>
            <EmptyState
              title="No stores selected"
              description="Please select at least one store to view the dashboard"
            />
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar activeRoute="overview" isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <Topbar title="Dashboard" breadcrumbs={[{ label: 'Home' }, { label: 'Dashboard' }]} sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
      
      <Container sidebarOpen={sidebarOpen}>
        {/* Header with Time Range Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Waste Management Overview</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Track and analyze waste generation across your stores
            </p>
          </div>
          <TimeRangeToggle timeRange={timeRange} onChange={setTimeRange} />
        </div>

        {/* Top Grid - Bar Chart + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <BarForecastVsActual data={mockData.forecastActual} />
          </div>
          
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-fuchsia-500 rounded-2xl p-6 shadow-lg">
              <DonutTotalWaste 
                organicKg={summary.organicKg} 
                inorganicKg={summary.inorganicKg}
              />
            </div>
          </div>
        </div>

        {/* Stat Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card variant="surface">
            <StatTile
              label="Organic Waste"
              value={summary.organicKg}
              deltaPct={summary.organicChangePct}
              icon={<Leaf className="text-emerald-500" size={24} />}
              miniChart={<MiniBars data={organicTrendData} color="emerald" />}
            />
          </Card>
          
          <Card variant="surface">
            <StatTile
              label="Inorganic Waste"
              value={summary.inorganicKg}
              deltaPct={summary.inorganicChangePct}
              icon={<Zap className="text-purple-500" size={24} />}
              miniChart={<MiniBars data={inorganicTrendData} color="fuchsia" />}
            />
          </Card>
        </div>

        {/* Line Chart - Full Width */}
        <div ref={chartRef}>
          <Card
            title="Waste Generation by Store Locations"
            actions={
              <div className="flex gap-2">
                <ExportMenu
                  onExportCSV={handleExportCSV}
                  onExportPNG={handleExportPNG}
                />
              </div>
            }
          >
            <LineByStore
              data={lineData}
              selectedStores={selectedStores}
              timeRange={timeRange}
            />
          </Card>
        </div>
      </Container>
    </div>
  );
}
