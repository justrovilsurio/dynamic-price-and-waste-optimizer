import { NextResponse } from 'next/server';
import { mockPricingProducts } from '@/lib/mockPricingProducts';

// Optional: force dynamic (avoid caching during dev / changes)
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // OPTIONAL: try backend first if you have an endpoint for products
    // Example backend route: GET /api/pricing-products
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (backendUrl) {
      const endpoint = `${backendUrl}/api/pricing-products`;

      try {
        const res = await fetch(endpoint, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          // If backend is slow, this prevents hanging too long
          cache: 'no-store',
        });

        if (res.ok) {
          const data = await res.json();

          // Support either { products: [...] } or direct array response
          const products = Array.isArray(data) ? data : data.products;

          if (Array.isArray(products) && products.length > 0) {
            return NextResponse.json(
              { products, source: 'backend' },
              { status: 200 }
            );
          }
        }
      } catch (backendErr) {
        // backend failed; fall back below
        console.warn('Backend fetch failed, falling back to mock:', backendErr);
      }
    }

    // Fallback: return mock
    return NextResponse.json(
      { products: mockPricingProducts, source: 'mock' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Pricing products route error:', err);

    // Even on error, you may want to still return mock to keep UI usable
    return NextResponse.json(
      { products: mockPricingProducts, source: 'mock', error: 'Fallback to mock' },
      { status: 200 }
    );
  }
}
