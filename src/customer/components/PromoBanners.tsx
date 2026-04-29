import React from 'react';
import { motion } from 'framer-motion';

const BANNERS = [
  { id: 1, image: '/promo-1.png', title: '50% OFF on First Order', subtitle: 'Use code: WASH50', color: 'from-blue-600 to-indigo-700' },
  { id: 2, image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1000&auto=format&fit=crop', title: 'Express 2h Delivery', subtitle: 'Dry clothes in minutes', color: 'from-brand to-accent' },
  { id: 3, image: 'https://images.unsplash.com/photo-1545173168-9f1947eeba01?q=80&w=1000&auto=format&fit=crop', title: 'Premium Silk Care', subtitle: 'Specialized Polishing', color: 'from-purple-600 to-pink-600' },
];

const PromoBanners = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 mt-4">
      <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6 tracking-tight">Best offers for you</h2>
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
        {BANNERS.map((banner) => (
          <motion.div 
            key={banner.id}
            whileHover={{ scale: 1.02 }}
            className="flex-shrink-0 w-[280px] md:w-[400px] h-[160px] md:h-[220px] rounded-[2.5rem] overflow-hidden shadow-lg cursor-pointer relative group"
          >
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className={`absolute inset-0 bg-gradient-to-t ${banner.color}/40 to-transparent flex flex-col justify-end p-6 md:p-8`}>
              <h3 className="text-white font-black text-lg md:text-xl leading-tight">{banner.title}</h3>
              <p className="text-white/90 text-xs md:text-sm font-bold mt-1 uppercase tracking-wider">{banner.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PromoBanners;
