import React from 'react';
import { MapPin, Clock, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../../shared/utils/cn';

export interface Service {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
}

export interface Shop {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  openTime: string;
  closeTime: string;
  image: string;
  specialty: string;
  priceRange: string;
  status: string;
  services?: Service[];
}

interface ShopCardProps {
  shop: Shop;
  index: number;
}

const ShopCard = ({ shop, index }: ShopCardProps) => {
  return (
    <Link to={`/shop/${shop.id}`}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md hover:border-primary/40 transition-all group h-full"
      >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={shop.image} 
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={cn(
            "px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider",
            shop.status === "Open" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
          )}>
            {shop.status}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-white shadow-lg rounded-lg border border-slate-100 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-slate-800">{shop.rating}</span>
          <span className="text-[10px] text-slate-400 font-medium border-l border-slate-200 pl-1.5">{shop.reviews}</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-800 group-hover:text-primary transition-colors line-clamp-1 leading-tight">{shop.name}</h3>
          <div className="flex items-center gap-1 text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-[13px] font-medium">{shop.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs py-3 border-y border-slate-50">
          <div className="flex items-center gap-2 text-slate-600 font-bold">
            <Clock className="w-4 h-4 text-primary" />
            <span>{shop.openTime} - {shop.closeTime}</span>
          </div>
          <div className="text-slate-900 font-extrabold">{shop.priceRange}</div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-1">
          <div className="text-xs text-slate-500 font-bold">
            <span className="text-primary">{shop.specialty}</span>
            <span className="mx-2 text-slate-200">•</span>
            {shop.reviews} Reviews
          </div>
          <button className="p-2 bg-slate-50 rounded-lg hover:bg-primary hover:text-white text-slate-400 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      </motion.div>
    </Link>
  );
};

export default ShopCard;
