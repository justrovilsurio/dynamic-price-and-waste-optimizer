'use client';

import * as React from 'react';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  name?: string;
  variant?: 'default' | 'segmented';
}

export function RadioGroup({
  label,
  options,
  value,
  onChange,
  className = '',
  name,
  variant = 'default',
}: RadioGroupProps) {
  // Use a stable unique name so multiple groups don't interfere
  const autoName = React.useId();
  const groupName = name ?? `${label ?? 'radio'}-${autoName}`;

  return (
    <fieldset className={className}>
      {label && (
        <legend
          className="text-sm font-semibold mb-3"
          style={{ color: 'var(--text-dark)' }}
        >
          {label}
        </legend>
      )}

      {variant === 'segmented' ? (
        <div
          className="inline-flex rounded-lg p-1 gap-1"
          style={{ backgroundColor: 'var(--surface-2)' }}
          role="radiogroup"
        >
          {options.map((option) => {
            const checked = value === option.value;

            return (
              <label key={option.value} className="relative">
                {/* Real radio input (accessible), but hidden visually */}
                <input
                  type="radio"
                  name={groupName}
                  value={option.value}
                  checked={checked}
                  onChange={() => onChange(option.value)}
                  className="sr-only"
                />

                {/* Segmented UI */}
                <span
                  className="px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer select-none"
                  style={{
                    backgroundColor: checked ? 'var(--primary)' : 'transparent',
                    color: checked ? 'var(--primary-foreground)' : 'var(--text-muted)',
                    boxShadow: checked ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      ) : (
        // Your old “dot radio” style (kept in case you still want it somewhere)
        <div className="space-y-3">
          {options.map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name={groupName}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 rounded"
                style={{
                  accentColor: 'var(--primary)',
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--surface)',
                }}
              />
              <span
                className="ml-3 text-sm font-medium group-hover:opacity-80"
                style={{ color: 'var(--text)' }}
              >
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </fieldset>
  );
}