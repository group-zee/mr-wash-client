import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  locationQuery: string;
  setLocationQuery: (val: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery, locationQuery, setLocationQuery }: SearchBarProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto w-full"
    >
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xl flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all">
          <Search className="w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search laundry shops (e.g. Crystal Clean)..." 
            className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-400 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all">
          <MapPin className="w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Enter city or area..." 
            className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-400 font-medium"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-10 py-3 rounded-xl font-bold text-white shadow-lg shadow-blue-200 transition-all active:scale-95">
          Find Services
        </button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
