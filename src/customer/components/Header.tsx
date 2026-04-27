import React from 'react';
import { ShieldCheck, Bell, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 px-6 py-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">Mr.<span className="text-primary">Wash</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-[15px] font-semibold text-slate-600">
          <Link to="/" className="text-brand">Home</Link>
          <a href="#" className="hover:text-brand transition-colors">Services</a>
          <a href="#" className="hover:text-brand transition-colors">My Orders</a>
          <a href="#" className="hover:text-brand transition-colors">Support</a>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Customer</p>
              <p className="text-sm font-bold text-slate-800">Alex Johnson</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
              <User className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
