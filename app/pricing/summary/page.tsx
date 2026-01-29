'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { mockItems } from '@/lib/mockItems';
import { DonutSummary } from '@/components/charts/DonutSummary';
import { RegionalSummary } from '@/components/charts/RegionalSummary';

export default function PricingSummaryPage() {
  // Calculate metrics from mock data
  const calculateMetrics = () => {
    let weeklyProfitCP = 0;
    let weeklyProfitRP = 0;
    let monthlyProfitCP = 0;
    let monthlyProfitRP = 0;
    let weeklyRevenueCP = 0;
    let weeklyRevenueRP = 0;
    let monthlyRevenueCP = 0;
    let monthlyRevenueRP = 0;

    const regionalMetrics: Record<string, { profit: number; revenue: number }> = {
      national: { profit: 0, revenue: 0 },
      state: { profit: 0, revenue: 0 },
      store: { profit: 0, revenue: 0 },
    };

    mockItems.forEach((item) => {
      const weeklyProfit = (item.rp - item.cp) * item.weeklyUnits;
      const weeklyRevenue = item.rp * item.weeklyUnits;
      const monthlyProfit = weeklyProfit * 4.33;
      const monthlyRevenue = weeklyRevenue * 4.33;

      // CP assumes cost price margin, RP assumes retail price
      weeklyProfitCP += (item.cp - item.cp * 0.15) * item.weeklyUnits; // Assuming 15% margin on CP
      weeklyProfitRP += weeklyProfit;
      monthlyProfitCP += weeklyProfitCP * 4.33;
      monthlyProfitRP += monthlyProfit;

      weeklyRevenueCP += item.cp * item.weeklyUnits;
      weeklyRevenueRP += weeklyRevenue;
      monthlyRevenueCP += weeklyRevenueCP * 4.33;
      monthlyRevenueRP += monthlyRevenue;

      // Regional breakdown
      regionalMetrics[item.region].profit += weeklyProfit;
      regionalMetrics[item.region].revenue += weeklyRevenue;
    });

    return {
      weeklyProfit: { cp: Math.abs(weeklyProfitCP), rp: weeklyProfitRP },
      monthlyProfit: { cp: Math.abs(monthlyProfitCP), rp: monthlyProfitRP },
      weeklyRevenue: { cp: weeklyRevenueCP, rp: weeklyRevenueRP },
      monthlyRevenue: { cp: monthlyRevenueCP, rp: monthlyRevenueRP },
      regional: regionalMetrics,
    };
  };

  const metrics = calculateMetrics();
  const totalRegionalProfit = Object.values(metrics.regional).reduce((sum, r) => sum + r.profit, 0);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#1a0b2e_0%,#0f0520_50%,#0a0a10_100%)] text-white
                    before:pointer-events-none before:content-[''] before:absolute before:inset-0
                    before:bg-[radial-gradient(1400px_700px_at_85%_-5%,rgba(124,35,200,0.75),rgba(100,30,180,0.4),transparent_50%)]
                    after:pointer-events-none after:content-[''] after:absolute after:inset-0
                    after:bg-[radial-gradient(1200px_650px_at_0%_120%,rgba(124,35,200,0.7),rgba(100,30,180,0.35),transparent_55%)]
                    relative">
      {/* Subtle noise layer */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.08]
                  bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAG0lEQVQYV2NkYGD4z0AEMDEwMDAwGJgYQwAA1c0F6bX2vZEAAAAASUVORK5CYII=')]"
      />

      {/* Grid and vignette overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-20 mix-blend-screen"
      >
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="white"
                strokeWidth="0.75"
                strokeOpacity="0.15"
              />
            </pattern>
            <radialGradient id="vignette" cx="50%" cy="40%" r="70%">
              <stop offset="60%" stopColor="transparent" />
              <stop offset="100%" stopColor="#0a0a10" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#vignette)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/pricing"
          className="mb-6 inline-flex p-3 rounded-lg border-2 border-white/20 bg-white/[0.08] text-white/90
                    hover:border-white/40 hover:text-white hover:shadow-[0_0_24px] hover:shadow-violet-600/30
                    backdrop-blur-3xl transition-all duration-300 items-center gap-2 group"
        >
          <ArrowLeft size={20} className="group-hover:text-violet-400 transition-colors duration-300" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Price Optimization Summary</h1>
          <p className="text-white/70">
            Performance overview of pricing strategies across all regions and departments
          </p>
        </div>

        {/* Profit Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Profit Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DonutSummary
              title="Weekly Profit"
              cpValue={metrics.weeklyProfit.cp}
              rpValue={metrics.weeklyProfit.rp}
              cpLabel="CP Margin"
              rpLabel="RP Margin"
            />
            <DonutSummary
              title="Monthly Profit"
              cpValue={metrics.monthlyProfit.cp}
              rpValue={metrics.monthlyProfit.rp}
              cpLabel="CP Margin"
              rpLabel="RP Margin"
            />
          </div>
        </div>

        {/* Revenue Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Revenue Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DonutSummary
              title="Weekly Revenue"
              cpValue={metrics.weeklyRevenue.cp}
              rpValue={metrics.weeklyRevenue.rp}
              cpLabel="CP Revenue"
              rpLabel="RP Revenue"
            />
            <DonutSummary
              title="Monthly Revenue"
              cpValue={metrics.monthlyRevenue.cp}
              rpValue={metrics.monthlyRevenue.rp}
              cpLabel="CP Revenue"
              rpLabel="RP Revenue"
            />
          </div>
        </div>

        {/* Regional Breakdown */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Regional Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RegionalSummary
              title="Profit by Region"
              metrics={[
                {
                  name: 'National',
                  value: metrics.regional.national.profit,
                  percentage: (metrics.regional.national.profit / totalRegionalProfit) * 100,
                },
                {
                  name: 'State',
                  value: metrics.regional.state.profit,
                  percentage: (metrics.regional.state.profit / totalRegionalProfit) * 100,
                },
                {
                  name: 'Store',
                  value: metrics.regional.store.profit,
                  percentage: (metrics.regional.store.profit / totalRegionalProfit) * 100,
                },
              ]}
            />
            <RegionalSummary
              title="Revenue by Region"
              metrics={[
                {
                  name: 'National',
                  value: metrics.regional.national.revenue,
                  percentage: (metrics.regional.national.revenue / Object.values(metrics.regional).reduce((sum, r) => sum + r.revenue, 0)) * 100,
                },
                {
                  name: 'State',
                  value: metrics.regional.state.revenue,
                  percentage: (metrics.regional.state.revenue / Object.values(metrics.regional).reduce((sum, r) => sum + r.revenue, 0)) * 100,
                },
                {
                  name: 'Store',
                  value: metrics.regional.store.revenue,
                  percentage: (metrics.regional.store.revenue / Object.values(metrics.regional).reduce((sum, r) => sum + r.revenue, 0)) * 100,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
