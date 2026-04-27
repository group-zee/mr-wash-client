import React from 'react';
import VendorLayout from '../components/VendorLayout';

const VendorDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Orders', value: '124', change: '+12%', color: 'bg-blue-500' },
    { label: 'Active Services', value: '12', change: '0%', color: 'bg-emerald-500' },
    { label: 'Revenue', value: '₹14,500', change: '+18%', color: 'bg-indigo-500' },
    { label: 'Rating', value: '4.8', change: '+0.2', color: 'bg-amber-500' },
  ];

  return (
    <VendorLayout>
      <div className="p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Vendor Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your laundry business.</p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="text-sm font-medium text-slate-500 mb-2">{stat.label}</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className={`text-xs font-bold px-2 py-1 rounded-lg ${
                    stat.change.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600 bg-slate-50'
                  }`}>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders Placeholder */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Recent Orders</h3>
              <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View All</button>
            </div>
            <div className="p-12 text-center text-slate-400">
              <p>Order history will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorDashboard;

