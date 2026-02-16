export type PricingRecommendation = 'Promo' | 'Increase' | 'Decrease' | 'Markdown';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export type SimulationScenario = 'Current price' | 'Optimized Price' | 'Promo';

export interface SimulationRow {
  scenario: SimulationScenario;
  revenue: string;
  margin: string; // e.g. "22%"
  waste: string;  // e.g. "28%"
}

export interface PricingProduct {
  id: string;
  name: string;
  imageUrl: string;
  aiRecommendation: PricingRecommendation;
  currentPrice: string;
  recommendedPrice: string;
  reason: string;
  expectedImpact: string;
  confidence: ConfidenceLevel;
  explanation: string;
  simulation?: SimulationRow[];
}

export interface PricingProductsResponse {
  products: PricingProduct[];
}

export const mockPricingProducts: PricingProductsResponse = {
  products: [
    {
      id: 'prod-001',
      name: 'Greek Yogurt 500ml',
      imageUrl: '/homebrand_apple_juice.png',
      aiRecommendation: 'Promo',
      currentPrice: '₱85',
      recommendedPrice: '₱75',
      reason: 'High inventory, competitor pricing analysis',
      expectedImpact: 'Increase volume by 15–20%',
      confidence: 'High',
      explanation:
        'Price was reduced because competitor pricing is 10–15% lower and excess inventory levels are projected to exceed demand within the next 14 days.',
      simulation: [
        { scenario: 'Current price', revenue: '₱120K', margin: '22%', waste: '28%' },
        { scenario: 'Optimized Price', revenue: '₱135K', margin: '24%', waste: '26%' },
        { scenario: 'Promo', revenue: '₱150K', margin: '21%', waste: '18%' },
      ],
    },
    {
      id: 'prod-002',
      name: 'Wholegrain Cereal 400g',
      imageUrl:
        'https://images.unsplash.com/photo-1599599810694-b3a7bc4d5f1d?w=100&h=100&fit=crop',
      aiRecommendation: 'Increase',
      currentPrice: '₱120',
      recommendedPrice: '₱135',
      reason: 'Low elasticity, strong demand trend',
      expectedImpact: 'Maintain volume, increase margin by 8%',
      confidence: 'High',
      explanation:
        'Price was increased due to consistently strong demand, low price sensitivity, and limited competitor discounting within the category.',
    },
    {
      id: 'prod-003',
      name: 'Homebrand Cheese 250g',
      imageUrl:
        'https://images.unsplash.com/photo-1585238341710-4dd0de5f202f?w=100&h=100&fit=crop',
      aiRecommendation: 'Markdown',
      currentPrice: '₱95',
      recommendedPrice: '₱80',
      reason: 'Expiring stock, waste risk increasing',
      expectedImpact: 'Clear stock, prevent waste loss',
      confidence: 'Medium',
      explanation:
        'Price was reduced because current stock is approaching expiry within 9 days and sell-through velocity is below forecast, increasing waste risk.',
    },
    {
      id: 'prod-004',
      name: 'Canned Soup 400ml',
      imageUrl:
        'https://images.unsplash.com/photo-1547069741-7bcb94d83f52?w=100&h=100&fit=crop',
      aiRecommendation: 'Decrease',
      currentPrice: '₱65',
      recommendedPrice: '₱58',
      reason: 'Market saturation, seasonal shift',
      expectedImpact: 'Stabilize shelf movement',
      confidence: 'Medium',
      explanation:
        'Price was adjusted downward due to reduced seasonal demand and increased category competition, which has slowed shelf movement.',
    },
    {
      id: 'prod-005',
      name: 'Fresh Bread Loaf',
      imageUrl:
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&h=100&fit=crop',
      aiRecommendation: 'Promo',
      currentPrice: '₱70',
      recommendedPrice: '₱62',
      reason: 'High waste rate, perishable item',
      expectedImpact: 'Reduce daily waste by 25%',
      confidence: 'High',
      explanation:
        'Price was reduced because daily waste levels exceed acceptable thresholds and historical data shows improved sell-through with short-term promotional pricing.',
    },
  ],
};
