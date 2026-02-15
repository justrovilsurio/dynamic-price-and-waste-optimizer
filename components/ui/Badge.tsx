'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'promo' | 'increase' | 'decrease' | 'markdown' | 'high' | 'medium' | 'low' | 'success' | 'danger' | 'warning' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'info', className = '' }: BadgeProps) {
  const getStyles = (variant: string) => {
    const styles: Record<string, React.CSSProperties> = {
      promo: { backgroundColor: 'var(--badge-promo-bg)', color: 'var(--badge-promo-text)' },
      increase: { backgroundColor: 'var(--badge-increase-bg)', color: 'var(--badge-increase-text)' },
      decrease: { backgroundColor: 'var(--badge-decrease-bg)', color: 'var(--badge-decrease-text)' },
      markdown: { backgroundColor: 'var(--badge-markdown-bg)', color: 'var(--badge-markdown-text)' },
      high: { backgroundColor: 'var(--badge-high-bg)', color: 'var(--badge-high-text)' },
      medium: { backgroundColor: 'var(--badge-medium-bg)', color: 'var(--badge-medium-text)' },
      low: { backgroundColor: 'var(--badge-low-bg)', color: 'var(--badge-low-text)' },
      success: { backgroundColor: 'var(--badge-high-bg)', color: 'var(--badge-high-text)' },
      danger: { backgroundColor: 'var(--badge-low-bg)', color: 'var(--badge-low-text)' },
      warning: { backgroundColor: 'var(--badge-medium-bg)', color: 'var(--badge-medium-text)' },
      info: { backgroundColor: 'var(--badge-decrease-bg)', color: 'var(--badge-decrease-text)' },
    };
    return styles[variant] || styles.info;
  };

  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}
      style={getStyles(variant)}
    >
      {children}
    </span>
  );
}

