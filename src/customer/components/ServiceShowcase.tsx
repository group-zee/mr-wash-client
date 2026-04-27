import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Shirt, Zap, Sparkles, Footprints, Home, Eraser } from 'lucide-react';

const SERVICES = [
  { 
    id: 1, 
    name: 'Wash & Fold', 
    desc: 'Everyday wear cleaned and perfectly folded.', 
    icon: <Shirt className="w-8 h-8 text-orange-500" />,
    color: 'bg-orange-50',
    count: '15+ Shops'
  },
  { 
    id: 2, 
    name: 'Steam Ironing', 
    desc: 'Crisp, wrinkle-free clothes delivered to you.', 
    icon: <Wind className="w-8 h-8 text-blue-500" />,
    color: 'bg-blue-50',
    count: '24+ Shops'
  },
  { 
    id: 3, 
    name: 'Dry Cleaning', 
    desc: 'Expert care for your delicate and premium fabrics.', 
    icon: <Sparkles className="w-8 h-8 text-purple-500" />,
    color: 'bg-purple-50',
    count: '10+ Shops'
  },
  { 
    id: 4, 
    name: 'Express Wash', 
    desc: 'Fresh clothes in under 2 hours. Super fast!', 
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    color: 'bg-yellow-50',
    count: '8 Shops'
  },
  { 
    id: 5, 
    name: 'Shoe Laundry', 
    desc: 'Make your sneakers and formals look brand new.', 
    icon: <Footprints className="w-8 h-8 text-emerald-500" />,
    color: 'bg-emerald-50',
    count: '5 Shops'
  },
  { 
    id: 6, 
    name: 'Home Linen', 
    desc: 'Deep cleaning for curtains, bedsheets & covers.', 
    icon: <Home className="w-8 h-8 text-rose-500" />,
    color: 'bg-rose-50',
    count: '12 Shops'
  },
];

const ServiceShowcase = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Explore by Service</h2>
          <p className="text-slate-500 font-bold">Choose the specialized care your clothes deserve</p>
        </div>
        <button className="text-brand font-black hover:underline text-sm uppercase tracking-widest">
          View all services
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group cursor-pointer"
          >
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group-hover:shadow-xl group-hover:border-swiggy/20 transition-all flex items-start gap-6">
              <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-800">{service.name}</h3>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter bg-slate-50 px-2 py-0.5 rounded-md">
                    {service.count}
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiceShowcase;
