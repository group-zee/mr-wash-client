import React from 'react';
import { motion } from 'framer-motion';

const BANNERS = [
  { id: 1, image: '/promo-1.png', title: '50% OFF on First Order', subtitle: 'Use code: WASH50' },
  { id: 2, image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1000&auto=format&fit=crop', title: 'Monsoon Special: 2h Express', subtitle: 'Dry clothes in minutes' },
  { id: 3, image: 'https://images.unsplash.com/photo-1545173168-9f1947eeba01?q=80&w=1000&auto=format&fit=crop', title: 'Premium Silk Care', subtitle: 'Specialized Saree Polishing' },
];

const PromoBanners = () => {
  return (

    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* <h2 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">Best offers for you</h2>
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
        {BANNERS.map((banner) => (
          <motion.div 
            key={banner.id}
            whileHover={{ scale: 1.02 }}
            className="flex-shrink-0 w-[300px] md:w-[420px] h-[180px] md:h-[240px] rounded-3xl overflow-hidden shadow-md cursor-pointer relative"
          >
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white font-bold text-xl">{banner.title}</h3>
              <p className="text-white/80 text-sm font-medium">{banner.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div> */}
    </div>
  );
};

export default PromoBanners;
