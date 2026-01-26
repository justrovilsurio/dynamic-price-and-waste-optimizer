'use client';

import { create } from 'zustand';
import { DashboardState, StoreId } from '../types';

interface ExtendedDashboardState extends DashboardState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useDashboardStore = create<ExtendedDashboardState>((set) => ({
  timeRange: '12m',
  selectedStores: new Set<StoreId>(['store-a', 'store-b', 'store-c']),
  sidebarOpen: true,
  
  setTimeRange: (range) => set({ timeRange: range }),
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  toggleStore: (storeId) => set((state) => {
    const newStores = new Set(state.selectedStores);
    if (newStores.has(storeId)) {
      newStores.delete(storeId);
    } else {
      newStores.add(storeId);
    }
    return { selectedStores: newStores };
  }),
  
  selectAllStores: () => set({
    selectedStores: new Set<StoreId>(['store-a', 'store-b', 'store-c']),
  }),
  
  resetStores: () => set({
    selectedStores: new Set<StoreId>(),
  }),
}));
