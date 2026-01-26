'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';

interface ExportMenuProps {
  onExportCSV: () => void;
  onExportPNG: () => void;
}

export function ExportMenu({ onExportCSV, onExportPNG }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-sm font-medium transition-colors"
      >
        <Download size={16} />
        Export
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-10">
          <button
            onClick={() => {
              onExportCSV();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 first:rounded-t-lg"
          >
            Export CSV (current view)
          </button>
          <button
            onClick={() => {
              onExportPNG();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 last:rounded-b-lg"
          >
            Export PNG (chart)
          </button>
        </div>
      )}
    </div>
  );
}
