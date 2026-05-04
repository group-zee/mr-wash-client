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

import { ShopCardSkeleton } from '../components/Skeleton';

const HomePage = () => {
  const dispatch = useDispatch();
  const { shops, loading } = useSelector((state: RootState) => state.customer);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

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
          {loading ? (
            <>
              <ShopCardSkeleton />
              <ShopCardSkeleton />
              <ShopCardSkeleton />
              <ShopCardSkeleton />
              <ShopCardSkeleton />
              <ShopCardSkeleton />
            </>
          ) : (
            <AnimatePresence mode='popLayout'>
              {filteredProviders.map((shop, index) => (
                <motion.div
                  key={shop.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ShopCard shop={shop} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
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
