import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, MapPin, Navigation, Sparkles } from 'lucide-react';

const HERO_SLIDES = [
  { 
    id: 1, 
    image: '/search-hero-1.png', 
    title: 'Find Premium Laundry Near You', 
    subtitle: 'Search through hundreds of verified laundry shops in your city and book instantly.',
    tag: 'LOCAL DISCOVERY'
  },
  { 
    id: 2, 
    image: '/search-hero-2.png', 
    title: 'Track Your Wash in Real-Time', 
    subtitle: 'Enter your location to find delivery partners who can pick up and drop off your clothes.',
    tag: 'LIVE TRACKING'
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=2000&auto=format&fit=crop', 
    title: 'Quality Care for Every Fabric', 
    subtitle: 'From silk sarees to heavy blankets, find specialized experts for all your needs.',
    tag: 'EXPERT CARE'
  },
];

interface HeroCarouselProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  locationQuery: string;
  setLocationQuery: (val: string) => void;
}

const HeroCarousel = ({ searchQuery, setSearchQuery, locationQuery, setLocationQuery }: HeroCarouselProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-slate-900">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img 
            src={HERO_SLIDES[current].image} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10">
        <motion.div 
          key={`text-${current}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-5xl space-y-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-white/60 font-black text-xs md:text-sm tracking-[0.3em] uppercase">
              {HERO_SLIDES[current].tag}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[1] tracking-tighter">
            {HERO_SLIDES[current].title.split(' ').map((word, i) => (
              <span key={i} className={word === 'Laundry' || word === 'Real-Time' || word === 'Premium' ? 'bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          
          <p className="text-white/70 text-lg md:text-2xl font-bold max-w-3xl mx-auto leading-relaxed">
            {HERO_SLIDES[current].subtitle}
          </p>

          {/* THE STANDARD PROFESSIONAL SEARCH HUB */}
          <div className="mt-12 w-full max-w-4xl mx-auto relative px-2">
            <div className="bg-white p-2 rounded-[1.5rem] md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-200">
              <div className="flex flex-col md:flex-row items-center gap-0">
                
                {/* Search Input */}
                <div className="flex-[1.2] w-full flex items-center gap-4 px-8 py-4 group/input">
                  <Search className="w-5 h-5 text-slate-400 group-focus-within/input:text-brand transition-colors" />
                  <div className="flex flex-col items-start flex-1">
                    <input 
                      type="text" 
                      placeholder="Search for laundry shops..." 
                      className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-400 font-bold text-base md:text-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block w-[1px] h-10 bg-slate-200" />

                {/* Location Input */}
                <div className="flex-1 w-full flex items-center gap-4 px-8 py-4 group/loc">
                  <MapPin className="w-5 h-5 text-slate-400 group-focus-within/loc:text-red-500 transition-colors" />
                  <div className="flex flex-col items-start flex-1 text-left">
                    <input 
                      type="text" 
                      placeholder="Select your area" 
                      className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-400 font-bold text-base md:text-lg"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={() => {
                    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full md:w-auto bg-[#1d4ed8] bg-brand hover:bg-[#1d4ed8] px-12 py-5 rounded-[1.2rem] md:rounded-full font-bold text-white shadow-lg shadow-blue-600/20 transition-all active:scale-95 text-lg whitespace-nowrap"
                >
                  Find Shops
                </button>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Popular:</span>
              {['Dry Clean', 'Whitefield', 'Indiranagar'].map((tag) => (
                <button 
                  key={tag}
                  className="text-white/80 hover:text-white font-bold text-xs px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:border-brand transition-all"
                  onClick={() => {
                    if (tag === 'Whitefield' || tag === 'Indiranagar') setLocationQuery(tag);
                    else setSearchQuery(tag);
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
        {HERO_SLIDES.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              current === i ? "w-10 bg-brand" : "w-3 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
