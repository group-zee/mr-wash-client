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
    <>
   
    {/* <div className="max-w-7xl mx-auto px-6 py-8 border-b border-slate-100">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">What's on your mind?</h2>
      <div className="flex gap-10 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
        {CATEGORIES.map((cat) => (
          <motion.div 
            key={cat.id}
            whileHover={{ scale: 1.1 }}
            className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group"
          >
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-slate-50 flex items-center justify-center text-3xl md:text-4xl shadow-sm border border-slate-100 group-hover:border-brand group-hover:bg-blue-50 transition-all">
              {cat.icon}
            </div>
            <span className="text-sm font-bold text-slate-700 group-hover:text-brand">{cat.name}</span>
          </motion.div>
        ))}
      </div>
    </div> */}
     </>
  );
};

export default Categories;
