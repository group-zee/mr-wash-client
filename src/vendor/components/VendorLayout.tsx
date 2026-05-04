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
    <div className="min-h-screen bg-slate-50 text-slate-600 flex font-sans selection:bg-blue-500/30">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:relative lg:translate-x-0 shadow-sm
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Mr. Wash</span>
          </div>
          <button className="lg:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 font-semibold'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 font-medium'
                }`}
              >
                <item.icon className={`w-5 h-5 relative z-10 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 mt-auto">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all font-medium group">
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Header for Mobile */}
        <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900">Mr. Wash</span>
          </div>
          <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
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
