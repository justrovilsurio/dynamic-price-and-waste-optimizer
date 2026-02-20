'use client';

import React, { ReactNode } from 'react';

export type BadgeVariant =
  // recommendation badges
  | 'promo'
  | 'increase'
  | 'decrease'
  | 'markdown'
  | 'keep'
  | 'review'
  // risk / confidence style badges
  | 'high'
  | 'medium'
  | 'low'
  // generic UI statuses
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const stylesByVariant: Record<BadgeVariant, React.CSSProperties> = {
  promo: { backgroundColor: 'var(--badge-promo-bg)', color: 'var(--badge-promo-text)' },
  increase: { backgroundColor: 'var(--badge-increase-bg)', color: 'var(--badge-increase-text)' },
  decrease: { backgroundColor: 'var(--badge-decrease-bg)', color: 'var(--badge-decrease-text)' },
  markdown: { backgroundColor: 'var(--badge-markdown-bg)', color: 'var(--badge-markdown-text)' },

  // ✅ new variants for our new types
  keep: { backgroundColor: 'var(--badge-keep-bg)', color: 'var(--badge-keep-text)' },
  review: { backgroundColor: 'var(--badge-review-bg)', color: 'var(--badge-review-text)' },

  high: { backgroundColor: 'var(--badge-high-bg)', color: 'var(--badge-high-text)' },
  medium: { backgroundColor: 'var(--badge-medium-bg)', color: 'var(--badge-medium-text)' },
  low: { backgroundColor: 'var(--badge-low-bg)', color: 'var(--badge-low-text)' },

  // keep your current mappings (you can change these tokens if you want)
  success: { backgroundColor: 'var(--badge-high-bg)', color: 'var(--badge-high-text)' },
  danger: { backgroundColor: 'var(--badge-low-bg)', color: 'var(--badge-low-text)' },
  warning: { backgroundColor: 'var(--badge-medium-bg)', color: 'var(--badge-medium-text)' },
  info: { backgroundColor: 'var(--badge-decrease-bg)', color: 'var(--badge-decrease-text)' },
};

export function Badge({ children, variant = 'info', className = '' }: BadgeProps) {
  // ✅ typed access, always returns a valid style
  const style = stylesByVariant[variant] ?? stylesByVariant.info;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}