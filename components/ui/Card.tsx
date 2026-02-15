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
    default: 'bg-surface border border-border shadow-lg',
    surface: 'bg-surface-2',
    flat: 'bg-transparent',
  };

  return (
    <div 
      className={`rounded-2xl p-6 ${variantClasses[variant]}`} 
      style={
        variant === 'default' 
          ? { 
              backgroundColor: 'var(--surface)', 
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)',
            } 
          : {}
      }
    >  {(title || subtitle || actions) && (
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {title && <h2 className="text-lg font-semibold" style={{ color: 'var(--text-dark)' }}>{title}</h2>}
            {subtitle && <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
          </div>
          {actions && <div className="flex gap-2 ml-4">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

