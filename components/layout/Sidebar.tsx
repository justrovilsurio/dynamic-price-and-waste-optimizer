'use client';

import { ReactNode } from 'react';
import {
  LayoutDashboard,
  Timer,
  Tag,
  Bell,
  BarChart3,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  activeRoute?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ activeRoute = 'overview', isOpen = true, onToggle }: SidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'expiry', label: 'Expiry', icon: Timer },
    { id: 'clearance', label: 'Clearance', icon: Tag },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 lg:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar - Desktop version (always visible, width changes) */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo/Header */}
        <div className={`p-6 border-b border-slate-200 dark:border-slate-800 flex items-center ${
          isOpen ? 'justify-between' : 'justify-center'
        }`}>
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                D
              </div>
              <span className="font-bold text-slate-900 dark:text-white">Waste Pro</span>
            </div>
          )}
          {!isOpen && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
              D
            </div>
          )}
          {isOpen && (
            <button
              onClick={onToggle}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
              aria-label="Collapse sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.id;
            return (
              <Link
                key={item.id}
                href={`/${item.id === 'overview' ? '' : item.id}`}
                title={isOpen ? undefined : item.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isOpen ? '' : 'justify-center'
                } ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Avatar Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          {isOpen && (
            <div className="flex items-center gap-3 px-3 py-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                RS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">Rovil Surio</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 truncate">Admin</p>
              </div>
            </div>
          )}
          {!isOpen && (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              RS
            </div>
          )}
        </div>
      </aside>

      {/* Sidebar - Mobile version (slides in/out) */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              D
            </div>
            <span className="font-bold text-slate-900 dark:text-white">Waste Pro</span>
          </div>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.id;
            return (
              <Link
                key={item.id}
                href={`/${item.id === 'overview' ? '' : item.id}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
                onClick={() => {
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 1024) {
                    onToggle?.();
                  }
                }}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Avatar Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 px-3 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              RS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">Rovil Surio</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 truncate">Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
