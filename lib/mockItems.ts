export interface Item {
  id: string;
  department: 'fresh' | 'meat' | 'deli';
  departmentDescription: string;
  region: 'national' | 'state' | 'store';
  state?: 'VIC' | 'NSW' | 'QLD';
  store?: string;
  item: string;
  itemName: string;
  itemDescription: string;
  cp: number; // Cost Price
  rp: number; // Retail Price
  weeklyUnits: number;
}

export const mockItems: Item[] = [
  // Fresh Produce - National
  {
    id: 'fp-001',
    department: 'fresh',
    departmentDescription: 'Fresh Produce',
    region: 'national',
    item: 'APL-001',
    itemName: 'Apples (Gala)',
    itemDescription: 'Fresh Gala apples, 2lb bag',
    cp: 1.2,
    rp: 3.99,
    weeklyUnits: 450,
  },
  {
    id: 'fp-002',
    department: 'fresh',
    departmentDescription: 'Fresh Produce',
    region: 'national',
    item: 'BAN-001',
    itemName: 'Bananas',
    itemDescription: 'Yellow bananas, per lb',
    cp: 0.35,
    rp: 0.79,
    weeklyUnits: 680,
  },
  {
    id: 'fp-003',
    department: 'fresh',
    departmentDescription: 'Fresh Produce',
    region: 'state',
    state: 'VIC',
    item: 'LET-001',
    itemName: 'Lettuce (Iceberg)',
    itemDescription: 'Fresh iceberg lettuce, head',
    cp: 0.45,
    rp: 1.99,
    weeklyUnits: 320,
  },
  {
    id: 'fp-004',
    department: 'fresh',
    departmentDescription: 'Fresh Produce',
    region: 'store',
    store: '505',
    item: 'TOM-001',
    itemName: 'Tomatoes (Roma)',
    itemDescription: 'Roma tomatoes, per lb',
    cp: 0.6,
    rp: 1.49,
    weeklyUnits: 250,
  },

  // Meat - National
  {
    id: 'mt-001',
    department: 'meat',
    departmentDescription: 'Meat',
    region: 'national',
    item: 'CHK-001',
    itemName: 'Chicken Breasts',
    itemDescription: 'Boneless skinless chicken breasts, per lb',
    cp: 2.1,
    rp: 5.99,
    weeklyUnits: 380,
  },
  {
    id: 'mt-002',
    department: 'meat',
    departmentDescription: 'Meat',
    region: 'state',
    state: 'NSW',
    item: 'BEF-001',
    itemName: 'Ground Beef (80/20)',
    itemDescription: 'Lean ground beef, per lb',
    cp: 2.8,
    rp: 7.49,
    weeklyUnits: 290,
  },
  {
    id: 'mt-003',
    department: 'meat',
    departmentDescription: 'Meat',
    region: 'store',
    store: '671',
    item: 'PRK-001',
    itemName: 'Pork Chops',
    itemDescription: 'Bone-in pork chops, per lb',
    cp: 1.95,
    rp: 4.99,
    weeklyUnits: 210,
  },

  // Deli - National
  {
    id: 'dl-001',
    department: 'deli',
    departmentDescription: 'Deli',
    region: 'national',
    item: 'HAM-001',
    itemName: 'Sliced Ham',
    itemDescription: 'Premium sliced ham, per lb',
    cp: 3.2,
    rp: 8.99,
    weeklyUnits: 180,
  },
  {
    id: 'dl-002',
    department: 'deli',
    departmentDescription: 'Deli',
    region: 'state',
    state: 'QLD',
    item: 'TUR-001',
    itemName: 'Sliced Turkey',
    itemDescription: 'Roasted turkey breast, per lb',
    cp: 2.95,
    rp: 7.99,
    weeklyUnits: 220,
  },
  {
    id: 'dl-003',
    department: 'deli',
    departmentDescription: 'Deli',
    region: 'store',
    store: '823',
    item: 'CHE-001',
    itemName: 'Cheddar Cheese',
    itemDescription: 'Sliced cheddar cheese, per lb',
    cp: 3.5,
    rp: 9.49,
    weeklyUnits: 150,
  },
];

// Filter items by applied filters
export function filterItems(
  items: Item[],
  filters: { 
    action?: string; 
    department?: string; 
    region?: string;
    state?: string;
    store?: string;
  },
  search?: string
): Item[] {
  let filtered = items;

  if (filters.department && filters.department !== 'all') {
    filtered = filtered.filter((item) => item.department === filters.department);
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
        item.item.toLowerCase().includes(query)
    );
  }

  return filtered;
}
