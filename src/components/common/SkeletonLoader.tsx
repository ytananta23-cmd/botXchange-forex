import React from 'react';

export const CardSkeleton: React.FC<{ count?: number; className?: string }> = ({
  count = 1,
  className = 'h-32',
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`skel-${i}`}
          className={`w-full rounded-2xl bg-slate-800/40 border border-slate-700/30 animate-pulse ${className}`}
        >
          <div className="p-5 flex flex-col justify-between h-full space-y-3">
            <div className="h-4 bg-slate-700/50 rounded w-1/3" />
            <div className="h-7 bg-slate-700/60 rounded w-2/3" />
            <div className="h-3 bg-slate-700/40 rounded w-1/2" />
          </div>
        </div>
      ))}
    </>
  );
};

export const ChartSkeleton: React.FC<{ height?: string }> = ({ height = 'h-72' }) => {
  return (
    <div className={`w-full rounded-2xl bg-slate-800/30 border border-slate-700/30 animate-pulse p-6 flex flex-col justify-between ${height}`}>
      <div className="flex justify-between items-center">
        <div className="h-5 bg-slate-700/50 rounded w-48" />
        <div className="h-5 bg-slate-700/40 rounded w-24" />
      </div>
      <div className="space-y-2 my-auto">
        <div className="h-2 bg-slate-700/30 rounded w-full" />
        <div className="h-2 bg-slate-700/30 rounded w-5/6" />
        <div className="h-2 bg-slate-700/30 rounded w-4/6" />
      </div>
      <div className="flex justify-between">
        <div className="h-3 bg-slate-700/40 rounded w-12" />
        <div className="h-3 bg-slate-700/40 rounded w-12" />
        <div className="h-3 bg-slate-700/40 rounded w-12" />
        <div className="h-3 bg-slate-700/40 rounded w-12" />
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full rounded-2xl bg-slate-800/20 border border-slate-700/30 divide-y divide-slate-800/50 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={`row-${i}`} className="p-4 flex items-center justify-between gap-4">
          <div className="h-4 bg-slate-700/50 rounded w-1/4" />
          <div className="h-4 bg-slate-700/40 rounded w-1/6" />
          <div className="h-4 bg-slate-700/40 rounded w-1/6" />
          <div className="h-4 bg-slate-700/50 rounded w-1/5" />
        </div>
      ))}
    </div>
  );
};
