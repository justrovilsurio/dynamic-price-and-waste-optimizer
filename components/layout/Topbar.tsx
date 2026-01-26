'use client';

import { ReactNode } from 'react';
import { Menu } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';

interface TopbarProps {
  title: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function Topbar({ title, breadcrumbs, sidebarOpen = true, onToggleSidebar }: TopbarProps) {
  return (
    <div className={`fixed top-0 left-0 right-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-30 transition-all duration-300 overflow-hidden ${
      sidebarOpen ? 'lg:left-64' : 'lg:left-20'
    }`}>
      <div className="h-16 px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Menu Button for Desktop when sidebar closed */}
        {!sidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="hidden lg:inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
        )}

        <div className="flex-1 pt-2">
          {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
          <h1 className="text-lg lg:text-2xl font-bold text-slate-900 dark:text-white mt-1">{title}</h1>
        </div>
      </div>
    </div>
  );
}
