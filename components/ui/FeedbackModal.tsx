'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  autoCloseDuration?: number; // ms, 0 = no auto close
}

export function FeedbackModal({
  open,
  onClose,
  title,
  message,
  type = 'info',
  autoCloseDuration = 4000,
}: FeedbackModalProps) {
  useEffect(() => {
    if (!open) return;

    // Auto-close if duration is set
    if (autoCloseDuration > 0) {
      const timer = setTimeout(onClose, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [open, onClose, autoCloseDuration]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-6 h-6" style={{ color: '#10b981' }} />;
      case 'error':
        return <AlertCircle className="w-6 h-6" style={{ color: '#ef4444' }} />;
      case 'info':
      default:
        return <Info className="w-6 h-6" style={{ color: 'var(--primary)' }} />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'rgba(16, 185, 129, 0.1)';
      case 'error':
        return 'rgba(239, 68, 68, 0.1)';
      case 'info':
      default:
        return 'rgba(59, 130, 246, 0.1)';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'rgba(16, 185, 129, 0.3)';
      case 'error':
        return 'rgba(239, 68, 68, 0.3)';
      case 'info':
      default:
        return 'rgba(59, 130, 246, 0.3)';
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-md rounded-xl shadow-xl overflow-hidden"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Content */}
          <div
            className="p-6 flex gap-4"
            style={{
              backgroundColor: getBackgroundColor(),
              borderBottom: `1px solid ${getBorderColor()}`,
            }}
          >
            <div className="flex-shrink-0">{getIcon()}</div>

            <div className="flex-1 min-w-0">
              {title && (
                <h3
                  className="font-semibold mb-1"
                  style={{ color: 'var(--text-dark)' }}
                >
                  {title}
                </h3>
              )}
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                {message}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 inline-flex items-center justify-center rounded-md p-1 hover:opacity-80 transition"
              aria-label="Close modal"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
