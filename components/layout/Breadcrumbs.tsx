'use client';

interface BreadcrumbsProps {
  items: Array<{ label: string; href?: string }>;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-slate-400">/</span>}
          {item.href ? (
            <a href={item.href} className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
              {item.label}
            </a>
          ) : (
            <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
