import type React from 'react';

export const TripCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
      <div className="h-48 bg-slate-200 w-full"></div>
      <div className="p-5">
        <div className="h-6 bg-slate-200 rounded-md w-3/4 mb-3"></div>
        <div className="h-4 bg-slate-200 rounded-md w-1/2 mb-4"></div>
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
          <div className="h-4 bg-slate-200 rounded-md w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded-md w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export const TripGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <TripCardSkeleton key={index} />
      ))}
    </div>
  );
};
