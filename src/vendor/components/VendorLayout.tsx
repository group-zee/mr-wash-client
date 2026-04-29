import React from 'react';
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Menu, X, CalendarCheck, MessageSquare, UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface VendorLayoutProps {
  children: React.ReactNode;
}

const VendorLayout: React.FC<VendorLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/vendor', icon: LayoutDashboard },
    { label: 'Manage Services', path: '/vendor/services', icon: ShoppingBag },
    { label: 'Bookings', path: '/vendor/bookings', icon: CalendarCheck },
    { label: 'Reviews', path: '/vendor/reviews', icon: MessageSquare },
    { label: 'My Profile', path: '/vendor/profile', icon: UserCircle },
    { label: 'Settings', path: '/vendor/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 flex font-sans selection:bg-violet-500/30">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#111827]/80 backdrop-blur-2xl border-r border-white/5 transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:relative lg:translate-x-0 shadow-[4px_0_24px_rgba(0,0,0,0.2)]
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-500/20 ring-1 ring-white/10">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">Mr. Wash</span>
          </div>
          <button className="lg:hidden p-2 text-slate-500 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? 'text-white font-medium shadow-lg shadow-violet-500/10 border border-white/10'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {isActive && <div className="absolute inset-0 bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 opacity-100"></div>}
                <item.icon className={`w-5 h-5 relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-violet-400'}`} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 mt-auto">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-medium group">
            <LogOut className="w-5 h-5 text-red-500/70 group-hover:text-red-400 transition-colors" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
        
        {/* Top Header for Mobile */}
        <header className="lg:hidden bg-[#111827]/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center text-white shadow-sm ring-1 ring-white/10">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="font-bold text-white">Mr. Wash</span>
          </div>
          <button className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto scroll-smooth relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
