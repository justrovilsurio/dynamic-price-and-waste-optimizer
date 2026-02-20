import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface PricingOptimizationRequest {
  asOfDate: string;
  primaryGoal: 'maximize' | 'reduce' | 'balance';
  mode: 'advisor' | 'autopilot';
  policies: {
    maxWeeklyPriceChangePct: number;
    minPriceFloorPctOfCurrent: number;
    homebrandMustBeLECompetitor: boolean;
    competitorUndercutTriggerPct: number;
    competitorOverpriceOpportunityPct: number;
    markdownOnlyIfDaysToExpiryLTE: number;
    promoOnlyIfDaysToExpiryLTE: number;
    dataQualityGapPctOutlier: number;
    maxPromoDepthPct: number;
    maxMarkdownDepthPct: number;
    goalWeights: {
      maximize: { profit: number; waste: number; competitiveness: number };
      reduce: { profit: number; waste: number; competitiveness: number };
      balance: { profit: number; waste: number; competitiveness: number };
    };
  };
  items: Array<any>;
}

export async function POST(request: Request) {
  try {
    const body: PricingOptimizationRequest = await request.json();

    console.log('🚀 [API] Pricing Optimization Request received:', {
      asOfDate: body.asOfDate,
      primaryGoal: body.primaryGoal,
      mode: body.mode,
      itemsCount: body.items?.length,
    });

    // Get backend URL
    const backendUrl = process.env.LOCAL;
    // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.LOCAL;

    console.log('🔍 [API] Backend URL:', backendUrl);

    if (!backendUrl) {
      console.error('❌ [API] No backend URL configured');
      return NextResponse.json(
        { success: false, error: 'Backend service not configured' },
        { status: 500 }
      );
    }

    const endpoint = `${backendUrl}/api/pricing-workflow`;
    console.log('📨 [API] Calling endpoint:', endpoint);

    try {
      console.log('⏳ [API] Waiting for backend response...');
      const backendRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache: 'no-store',
      });

      console.log('📥 [API] Backend response status:', backendRes.status);

      if (!backendRes.ok) {
        const errorText = await backendRes.text();
        console.error('❌ [API] Backend returned error:', backendRes.status, errorText);
        return NextResponse.json(
          { success: false, error: `Backend error: ${backendRes.status}`, details: errorText },
          { status: backendRes.status }
        );
      }

      const backendData = await backendRes.json();
      console.log('✅ [API] Backend response received:', backendData);

      return NextResponse.json(
        { success: true, data: backendData, source: 'backend' },
        { status: 200 }
      );
    } catch (backendErr) {
      console.error('❌ [API] Backend fetch failed:', backendErr);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to reach backend service',
          details: backendErr instanceof Error ? backendErr.message : String(backendErr)
        },
        { status: 503 }
      );
    }
  } catch (err) {
    console.error('❌ [API] Request processing error:', err);

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process pricing optimization request',
        details: err instanceof Error ? err.message : String(err)
      },
      { status: 400 }
    );
  }
}
