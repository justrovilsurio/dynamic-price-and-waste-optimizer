'use client';

import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  variant?: 'default' | 'surface' | 'flat';
}

export function Card({
  title,
  subtitle,
  children,
  actions,
  variant = 'default',
}: CardProps) {
  const variantClasses = {
    default: 'bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-700',
    surface: 'bg-slate-50 dark:bg-slate-800',
    flat: 'bg-transparent',
  };

  return (
    <div className={`rounded-2xl p-6 shadow-lg ${variantClasses[variant]}`}>
      {(title || subtitle || actions) && (
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {title && <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>}
            {subtitle && <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex gap-2 ml-4">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
