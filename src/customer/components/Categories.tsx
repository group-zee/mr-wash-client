import React from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: 1, name: 'Wash & Fold', icon: '🧺' },
  { id: 2, name: 'Wash & Iron', icon: '👕' },
  { id: 3, name: 'Dry Clean', icon: '👔' },
  { id: 4, name: 'Premium Care', icon: '✨' },
  { id: 5, name: 'Shoes & Bags', icon: '👟' },
  { id: 6, name: 'Home Linen', icon: '🏠' },
  { id: 7, name: 'Iron Only', icon: '💨' },
];

const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-8 tracking-tight">What's on your mind?</h2>
      <div className="flex gap-8 md:gap-12 overflow-x-auto no-scrollbar pb-6 -mx-6 px-6">
        {CATEGORIES.map((cat) => (
          <motion.div 
            key={cat.id}
            whileHover={{ y: -5 }}
            className="flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-slate-50 flex items-center justify-center text-3xl md:text-4xl shadow-sm border border-slate-100 group-hover:border-brand group-hover:bg-blue-50/50 transition-all">
              {cat.icon}
            </div>
            <span className="text-xs md:text-sm font-black text-slate-600 group-hover:text-brand transition-colors text-center max-w-[80px] md:max-w-none">
              {cat.name}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="h-[1px] bg-slate-100 w-full mt-4" />
    </div>
  );
};

export default Categories;
