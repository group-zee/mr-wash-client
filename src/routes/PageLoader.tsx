import React from 'react';

const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-slate-400 font-bold text-sm animate-pulse">Loading Mr. Wash...</p>
    </div>
  </div>
);

export default PageLoader;
