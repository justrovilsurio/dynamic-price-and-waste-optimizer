export interface PromoItem {
  id: string;
  department: 'fresh' | 'meat' | 'deli';
  departmentDescription: string;
  region: 'national' | 'state' | 'store';
  state?: 'VIC' | 'NSW' | 'QLD';
  store?: string;
  item: string; // code
  itemName: string;
  itemDescription: string;
  actualSellThroughPct: number; // 0..100
  plannedSellThroughPct: number; // 0..100
  expirationDays: 2 | 3 | 4 | 5;
  recommendation: 'No change' | 'Promotion';
  promoType: string;
  promotionDurationDays?: number;
  userDefinedPromotion?: string;
  competitorCurrentPromo?: string;
}

export const mockPromoItems: PromoItem[] = [
  // Fresh Produce - National
  {
    id: 'promo-fp-001',
    department: 'fresh',
    departmentDescription: 'Fresh Produce',
    region: 'national',
    item: 'APL-001',
    itemName: 'Apples (Gala)',
    itemDescription: 'Fresh Gala apples, 2lb bag',
    actualSellThroughPct: 65,
    plannedSellThroughPct: 80,
    expirationDays: 3,
    recommendation: 'Promotion',
    promoType: 'Price Cut 15%',
    promotionDurationDays: 7,
    userDefinedPromotion: '$1.99/bag',
    competitorCurrentPromo: '$2.49 (Woolies)',
  },
  {
    id: 'promo-fp-002',
    department: 'fresh',
    departmentDescription: 'Fresh Produce',
    region: 'national',
    item: 'BAN-001',
    itemName: 'Bananas',
    itemDescription: 'Yellow bananas, per lb',
    actualSellThroughPct: 88,
    plannedSellThroughPct: 85,
    expirationDays: 2,
    recommendation: 'No change',
    promoType: 'None',
    competitorCurrentPromo: 'None',
  },
  {
    id: 'promo-fp-003',
    department: 'fresh',
    departmentDescription: 'Fresh Produce',
    region: 'state',
    state: 'VIC',
    item: 'LET-001',
    itemName: 'Lettuce (Iceberg)',
    itemDescription: 'Fresh iceberg lettuce, head',
    actualSellThroughPct: 52,
    plannedSellThroughPct: 75,
    expirationDays: 4,
    recommendation: 'Promotion',
    promoType: 'Buy 2 Get 1',
    promotionDurationDays: 10,
    userDefinedPromotion: '2 for $3.99',
    competitorCurrentPromo: '$2.99 (Coles)',
  },
  {
    id: 'promo-fp-004',
    department: 'fresh',
    departmentDescription: 'Fresh Produce',
    region: 'store',
    store: '505',
    item: 'TOM-001',
    itemName: 'Tomatoes (Roma)',
    itemDescription: 'Roma tomatoes, per lb',
    actualSellThroughPct: 71,
    plannedSellThroughPct: 80,
    expirationDays: 2,
    recommendation: 'No change',
    promoType: 'None',
    competitorCurrentPromo: '$1.99/lb (Rival)',
  },

  // Meat - National
  {
    id: 'promo-mt-001',
    department: 'meat',
    departmentDescription: 'Meat',
    region: 'national',
    item: 'CHK-001',
    itemName: 'Chicken Breasts',
    itemDescription: 'Boneless skinless chicken breasts, per lb',
    actualSellThroughPct: 58,
    plannedSellThroughPct: 82,
    expirationDays: 5,
    recommendation: 'Promotion',
    promoType: 'Bundle Deal',
    promotionDurationDays: 14,
    userDefinedPromotion: 'Buy 2 get 10% off',
    competitorCurrentPromo: '$5.99/lb (Safeway)',
  },
  {
    id: 'promo-mt-002',
    department: 'meat',
    departmentDescription: 'Meat',
    region: 'state',
    state: 'NSW',
    item: 'BEF-001',
    itemName: 'Ground Beef (80/20)',
    itemDescription: 'Lean ground beef, per lb',
    actualSellThroughPct: 75,
    plannedSellThroughPct: 78,
    expirationDays: 3,
    recommendation: 'No change',
    promoType: 'None',
    competitorCurrentPromo: '$7.99/lb (Coles)',
  },
  {
    id: 'promo-mt-003',
    department: 'meat',
    departmentDescription: 'Meat',
    region: 'store',
    store: '671',
    item: 'PRK-001',
    itemName: 'Pork Chops',
    itemDescription: 'Bone-in pork chops, per lb',
    actualSellThroughPct: 62,
    plannedSellThroughPct: 79,
    expirationDays: 4,
    recommendation: 'Promotion',
    promoType: 'Flash Sale',
    promotionDurationDays: 3,
    userDefinedPromotion: '$3.99/lb (was $4.99)',
    competitorCurrentPromo: '$4.49/lb (Woolies)',
  },

  // Deli - National
  {
    id: 'promo-dl-001',
    department: 'deli',
    departmentDescription: 'Deli',
    region: 'national',
    item: 'HAM-001',
    itemName: 'Sliced Ham',
    itemDescription: 'Premium sliced ham, per lb',
    actualSellThroughPct: 80,
    plannedSellThroughPct: 81,
    expirationDays: 2,
    recommendation: 'No change',
    promoType: 'None',
    competitorCurrentPromo: '$8.99/lb (Rival)',
  },
  {
    id: 'promo-dl-002',
    department: 'deli',
    departmentDescription: 'Deli',
    region: 'state',
    state: 'QLD',
    item: 'TUR-001',
    itemName: 'Sliced Turkey',
    itemDescription: 'Roasted turkey breast, per lb',
    actualSellThroughPct: 55,
    plannedSellThroughPct: 76,
    expirationDays: 3,
    recommendation: 'Promotion',
    promoType: 'BOGOF',
    promotionDurationDays: 7,
    userDefinedPromotion: 'Buy 1 Get 1 50% Off',
    competitorCurrentPromo: '$7.99/lb (Safeway)',
  },
  {
    id: 'promo-dl-003',
    department: 'deli',
    departmentDescription: 'Deli',
    region: 'store',
    store: '823',
    item: 'CHE-001',
    itemName: 'Cheddar Cheese',
    itemDescription: 'Sliced cheddar cheese, per lb',
    actualSellThroughPct: 68,
    plannedSellThroughPct: 82,
    expirationDays: 5,
    recommendation: 'Promotion',
    promoType: 'Volume Discount',
    promotionDurationDays: 10,
    userDefinedPromotion: '3+ lb: 20% off',
    competitorCurrentPromo: '$9.99/lb (Coles)',
  },
];

// Filter items by applied filters
export function filterPromoItems(
  items: PromoItem[],
  filters: {
    department?: string;
    itemId?: string;
    expirationDays?: string;
    region?: string;
    state?: string;
    store?: string;
  },
  search?: string
): PromoItem[] {
  let filtered = items;

  if (filters.department && filters.department !== 'all') {
    filtered = filtered.filter((item) => item.department === filters.department);
  }

  if (filters.itemId && filters.itemId !== 'all') {
    filtered = filtered.filter((item) => item.id === filters.itemId);
  }

  if (filters.expirationDays && filters.expirationDays !== 'all') {
    const days = parseInt(filters.expirationDays);
    filtered = filtered.filter((item) => item.expirationDays === days);
  }

  if (filters.region && filters.region !== 'all') {
    filtered = filtered.filter((item) => item.region === filters.region);
  }

  if (filters.state && filters.state !== 'all') {
    filtered = filtered.filter((item) => item.state === filters.state);
  }

  if (filters.store && filters.store !== 'all') {
    filtered = filtered.filter((item) => item.store === filters.store);
  }

  if (search && search.trim()) {
    const query = search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.itemName.toLowerCase().includes(query) ||
        item.item.toLowerCase().includes(query) ||
        item.itemDescription.toLowerCase().includes(query)
    );
  }

  return filtered;
}
