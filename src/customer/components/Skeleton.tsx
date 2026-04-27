import React from 'react';

export const ShopCardSkeleton = () => (
  <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm animate-pulse">
    <div className="h-56 bg-slate-100 w-full" />
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <div className="h-6 bg-slate-100 rounded-md w-3/4" />
        <div className="h-4 bg-slate-100 rounded-md w-1/2" />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-8 bg-slate-100 rounded-lg w-16" />
        <div className="h-8 bg-slate-100 rounded-lg w-16" />
      </div>
    </div>
  </div>
);

export const ServiceItemSkeleton = () => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 animate-pulse">
    <div className="flex-1 space-y-2 w-full">
      <div className="h-5 bg-slate-50 rounded-md w-1/3" />
      <div className="h-4 bg-slate-50 rounded-md w-2/3" />
      <div className="h-6 bg-slate-50 rounded-md w-20 mt-2" />
    </div>
    <div className="h-12 bg-slate-50 rounded-xl w-24 shrink-0" />
  </div>
);

export const ShopDetailsSkeleton = () => (
  <div className="max-w-7xl mx-auto px-6 py-24 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-100 h-[500px]" />
      </div>
      <div className="lg:col-span-2 space-y-6">
        <div className="h-8 bg-slate-100 rounded-md w-1/4 mb-8" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <ServiceItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
