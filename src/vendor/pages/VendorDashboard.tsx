import React from 'react';
import VendorLayout from '../components/VendorLayout';

import { TrendingUp, Activity, IndianRupee, Star, ChevronRight, Package, Loader2 } from 'lucide-react';

const VendorDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Orders', value: '124', change: '+12%', color: 'from-violet-500 to-violet-600', icon: Package, changeType: 'positive' },
    { label: 'Active Services', value: '12', change: '0%', color: 'from-cyan-500 to-blue-500', icon: Activity, changeType: 'neutral' },
    { label: 'Revenue', value: '₹14,500', change: '+18%', color: 'from-emerald-400 to-emerald-500', icon: IndianRupee, changeType: 'positive' },
    { label: 'Rating', value: '4.8', change: '+0.2', color: 'from-amber-400 to-orange-500', icon: Star, changeType: 'positive' },
  ];

  return (
    <VendorLayout>
      <div className="p-6 md:p-10 lg:px-12 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Dashboard</h1>
              <p className="text-slate-400 mt-2 text-lg">Welcome back! Here's what's happening with your business today.</p>
            </div>
            <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white flex items-center gap-2 self-start md:self-auto px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-violet-500/25 transition-all">
              <span>View Live Site</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="group bg-[#111827]/60 backdrop-blur-xl p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/5 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <div className={`absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.15] rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500`}></div>
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg opacity-90 group-hover:opacity-100 transition-opacity ring-1 ring-white/20`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className={`text-xs font-bold px-2.5 py-1.5 rounded-xl flex items-center gap-1 ${
                    stat.changeType === 'positive' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 
                    stat.changeType === 'negative' ? 'text-red-400 bg-red-500/10 border border-red-500/20' : 'text-slate-300 bg-white/5 border border-white/10'
                  }`}>
                    {stat.changeType === 'positive' && <TrendingUp className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-400 mb-1">{stat.label}</div>
                <div className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Main Content Area: Charts & Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#111827]/60 backdrop-blur-xl rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/5 p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white">Recent Orders</h3>
                <button className="text-sm font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 group transition-colors">
                  View All
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="py-16 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                <Package className="w-12 h-12 mb-3 text-slate-600" />
                <p className="font-medium text-slate-400">No recent orders found.</p>
                <p className="text-sm mt-1">Orders will appear here once customers book services.</p>
              </div>
            </div>
            
            {/* Quick Actions or Summary */}
            <div className="bg-[#111827]/60 backdrop-blur-xl rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/5 p-6 md:p-8">
               <h3 className="text-xl font-bold text-white mb-6">Store Status</h3>
               <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                      <span className="font-semibold text-emerald-400">Accepting Orders</span>
                    </div>
                 </div>
                 <div className="pt-6 mt-6 border-t border-white/5">
                    <h4 className="font-semibold text-slate-300 mb-4">Pending Tasks</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 border border-amber-500/30">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <span className="text-sm text-slate-400">Update pricing for 'Premium Wash'</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 mt-0.5 border border-violet-500/30">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <span className="text-sm text-slate-400">Review 3 new customer feedback</span>
                      </li>
                    </ul>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorDashboard;

