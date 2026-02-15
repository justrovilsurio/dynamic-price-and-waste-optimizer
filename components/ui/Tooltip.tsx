'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
  maxWidth?: number;
}

export function Tooltip({
  content,
  children,
  side = 'top',
  offset = 10,
  maxWidth = 360,
}: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const triggerRef = React.useRef<HTMLSpanElement | null>(null);
  const [pos, setPos] = React.useState({ top: 0, left: 0, actualSide: side });

  React.useEffect(() => setMounted(true), []);

  const computePosition = React.useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    // Estimate tooltip placement. We'll auto-flip if it would go off-screen.
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    // We'll position based on trigger center
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Simple dimensions guess (safe default). Tooltip will be centered.
    // Because the tooltip content can vary, we bias toward keeping it on-screen.
    const tooltipW = Math.min(maxWidth, 360);
    const tooltipH = 140; // rough estimate; fine for flipping logic

    const canShowTop = rect.top >= tooltipH + offset;
    const canShowBottom = viewportH - rect.bottom >= tooltipH + offset;

    let actualSide = side;

    if (side === 'top' && !canShowTop && canShowBottom) actualSide = 'bottom';
    if (side === 'bottom' && !canShowBottom && canShowTop) actualSide = 'top';

    let top = 0;
    let left = 0;

    if (actualSide === 'top') {
      top = rect.top - offset;
      left = cx;
    } else if (actualSide === 'bottom') {
      top = rect.bottom + offset;
      left = cx;
    } else if (actualSide === 'left') {
      top = cy;
      left = rect.left - offset;
    } else {
      top = cy;
      left = rect.right + offset;
    }

    // Clamp horizontally to viewport for top/bottom
    if (actualSide === 'top' || actualSide === 'bottom') {
      const minX = 12 + tooltipW / 2;
      const maxX = viewportW - 12 - tooltipW / 2;
      left = Math.max(minX, Math.min(maxX, left));
    }

    // Clamp vertically to viewport for left/right
    if (actualSide === 'left' || actualSide === 'right') {
      const minY = 12;
      const maxY = viewportH - 12;
      top = Math.max(minY, Math.min(maxY, top));
    }

    setPos({ top, left, actualSide });
  }, [side, offset, maxWidth]);

  React.useEffect(() => {
    if (!open) return;
    computePosition();

    const onScrollOrResize = () => computePosition();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [open, computePosition]);

  const tooltip = open ? (
    <div
      role="tooltip"
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        transform:
          pos.actualSide === 'top'
            ? 'translate(-50%, -100%)'
            : pos.actualSide === 'bottom'
            ? 'translate(-50%, 0)'
            : pos.actualSide === 'left'
            ? 'translate(-100%, -50%)'
            : 'translate(0, -50%)',
        zIndex: 9999,
        maxWidth,
        backgroundColor: 'var(--surface)',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '10px 12px',
        boxShadow: '0 12px 28px rgba(0,0,0,0.14)',
        fontSize: 12,
        lineHeight: 1.35,
      }}
    >
      {content}
    </div>
  ) : null;

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-flex"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {children}
      </span>

      {mounted && tooltip ? createPortal(tooltip, document.body) : null}
    </>
  );
}
``