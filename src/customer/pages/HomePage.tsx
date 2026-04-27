import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search as SearchIcon } from 'lucide-react';
import Header from '../components/Header';
import ShopCard, { Shop } from '../components/ShopCard';
import Footer from '../components/Footer';
import PromoBanners from '../components/PromoBanners';
import Categories from '../components/Categories';
import HeroCarousel from '../components/HeroCarousel';
import ServiceShowcase from '../components/ServiceShowcase';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setShops } from '../store/customerSlice';

// Mock Data for Laundry Providers
const INITIAL_SHOPS: Shop[] = [
  {
    id: 1,
    name: "Crystal Clean Hub",
    location: "MG Road, Central Metro",
    rating: 4.8,
    reviews: 428,
    openTime: "08:00 AM",
    closeTime: "09:00 PM",
    image: "/laundry-1.png",
    specialty: "Express 2h Delivery",
    priceRange: "₹₹",
    status: "Open",
    services: [
      { id: '1-1', name: 'Wash & Fold', price: 49, unit: 'kg', description: 'Standard machine wash with premium detergent.' },
      { id: '1-2', name: 'Wash & Iron', price: 69, unit: 'kg', description: 'Washed, dried and perfectly steam ironed.' },
      { id: '1-3', name: 'Premium Dry Clean', price: 149, unit: 'piece', description: 'Careful dry cleaning for delicate garments.' },
    ]
  },
  {
    id: 2,
    name: "Royal Wash & Dry",
    location: "Whitefield, Tech Corridor",
    rating: 4.9,
    reviews: 892,
    openTime: "07:00 AM",
    closeTime: "10:00 PM",
    image: "/laundry-2.png",
    specialty: "Eco-Friendly Wash",
    priceRange: "₹₹₹",
    status: "Open",
    services: [
      { id: '2-1', name: 'Eco Wash', price: 59, unit: 'kg', description: 'Using 100% biodegradable detergents.' },
      { id: '2-2', name: 'Deep Clean', price: 89, unit: 'kg', description: 'Intensive cleaning for tough stains.' },
      { id: '2-3', name: 'Saree Polishing', price: 199, unit: 'piece', description: 'Specialized care for silk and designer sarees.' },
    ]
  },
  {
    id: 3,
    name: "The Laundry Room",
    location: "Indiranagar, 12th Main",
    rating: 4.5,
    reviews: 1210,
    openTime: "09:00 AM",
    closeTime: "08:00 PM",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eeba01?q=80&w=1000&auto=format&fit=crop",
    specialty: "Deep Steam Cleaning",
    priceRange: "₹",
    status: "Closing Soon",
    services: [
      { id: '3-1', name: 'Basic Wash', price: 39, unit: 'kg', description: 'Standard wash for everyday clothes.' },
      { id: '3-2', name: 'Curtain Cleaning', price: 120, unit: 'pair', description: 'Professional steam cleaning for home curtains.' },
    ]
  }
];

const HomePage = () => {
  const dispatch = useDispatch();
  const { shops } = useSelector((state: RootState) => state.customer);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  // Simulate fetching data
  React.useEffect(() => {
    if (shops.length === 0) {
      dispatch(setShops(INITIAL_SHOPS));
    }
  }, [dispatch, shops.length]);

  const filteredProviders = useMemo(() => {
    return shops.filter(provider => 
      (provider.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (provider.location.toLowerCase().includes(locationQuery.toLowerCase()))
    );
  }, [shops, searchQuery, locationQuery]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Header with Overlay Support */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Hero Carousel (Full Screen Immersive Banner) */}
      <HeroCarousel 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        locationQuery={locationQuery}
        setLocationQuery={setLocationQuery}
      />

      {/* Promo Banners */}
      <PromoBanners />

      {/* Categories */}
      <Categories />

      {/* Section 1: Laundry Shops Grid */}
      <main id="results-section" className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Laundry shops near you</h2>
            <p className="text-slate-500 font-bold mt-1">Discover the best rated fabric care experts in your area</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-black text-xs text-slate-700 shadow-sm uppercase tracking-widest">
              <Filter className="w-4 h-4 text-brand" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-black text-xs text-slate-700 shadow-sm uppercase tracking-widest">
              Sort By
            </button>
          </div>
        </div>

        {/* Shop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode='popLayout'>
            {filteredProviders.map((shop, index) => (
              <ShopCard key={shop.id} shop={shop} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {filteredProviders.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No shops found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-2 font-medium">Try adjusting your search in the banner above to find local services.</p>
          </div>
        )}
      </main>

      {/* Section 2: Explore by Service */}
      <div className="bg-slate-50/50">
        <ServiceShowcase />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
