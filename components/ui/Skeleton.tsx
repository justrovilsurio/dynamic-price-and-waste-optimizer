'use client';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-slate-200 dark:bg-slate-700 rounded animate-pulse ${className}`}
    />
  );
}

export function SkeletonBar() {
  return <Skeleton className="h-8 mb-4" />;
}

export function SkeletonChart() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-32" />
      <div className="flex gap-2">
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 flex-1" />
      </div>
    </div>
  );
}
