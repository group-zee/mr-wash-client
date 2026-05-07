import React, { useState } from 'react';
import { ShieldCheck, Bell, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import LogoutConfirmModal from './LogoutConfirmModal';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#' },
    { name: 'My Orders', href: '#' },
    { name: 'Support', href: '#' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 px-4 md:px-6 py-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-primary rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-slate-900">Mr.<span className="text-primary">Wash</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 text-[15px] font-semibold text-slate-600">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="hover:text-brand transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1 md:gap-3">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
            
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Customer</p>
                    <p className="text-sm font-bold text-slate-800">{user?.firstName || 'User'}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <User className="w-5 h-5 text-slate-600" />
                  </div>
                </Link>
                <button 
                  onClick={() => setShowLogoutModal(true)}
                  className="text-xs font-bold text-red-500 hover:text-red-600 ml-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/customer/login" className="text-sm font-bold text-slate-700 hover:text-brand transition-colors">Log in</Link>
                <Link to="/customer/signup" className="text-sm font-bold bg-brand text-white px-5 py-2.5 rounded-xl shadow-[0_4px_15px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 transition-all">Sign up</Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full md:hidden transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[48] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white z-[49] shadow-2xl md:hidden flex flex-col p-8"
            >
              {isAuthenticated ? (
                <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <User className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{user?.firstName || 'User'}</p>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-bold text-slate-400 hover:text-brand transition-colors block mt-0.5">View Profile</Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 mb-10 pb-6 border-b border-slate-100">
                  <Link to="/customer/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center rounded-xl font-bold text-slate-700 bg-slate-50 border border-slate-100">Log in</Link>
                  <Link to="/customer/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center rounded-xl font-bold text-white bg-brand shadow-lg shadow-brand/20">Sign up free</Link>
                </div>
              )}

              <div className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-black text-slate-700 hover:text-brand flex items-center justify-between group"
                  >
                    {link.name}
                    <div className="w-2 h-2 rounded-full bg-brand scale-0 group-hover:scale-100 transition-transform" />
                  </Link>
                ))}
              </div>

              {isAuthenticated && (
                <div className="mt-auto pt-10">
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black shadow-xl"
                  >
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LogoutConfirmModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          setShowLogoutModal(false);
        }}
      />
    </>
  );
};

export default Header;
