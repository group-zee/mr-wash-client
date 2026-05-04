import React, { useState } from 'react';
import VendorLayout from '../components/VendorLayout';

import { TrendingUp, Activity, IndianRupee, Star, ChevronRight, Package, Clock, XCircle, CheckCircle2, AlertCircle } from 'lucide-react';

type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'acknowledged';

const VendorDashboard: React.FC = () => {
  // Simulated state for demonstration. Admin will control this later.
  // Change this to 'verified', 'rejected', or 'pending' to see the different UI states.
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('pending');

  const stats = [
    { label: 'Total Orders', value: '124', change: '+12%', color: 'text-blue-600', bgColor: 'bg-blue-100', icon: Package, changeType: 'positive' },
    { label: 'Active Services', value: '12', change: '0%', color: 'text-indigo-600', bgColor: 'bg-indigo-100', icon: Activity, changeType: 'neutral' },
    { label: 'Revenue', value: '₹14,500', change: '+18%', color: 'text-emerald-600', bgColor: 'bg-emerald-100', icon: IndianRupee, changeType: 'positive' },
    { label: 'Rating', value: '4.8', change: '+0.2', color: 'text-amber-600', bgColor: 'bg-amber-100', icon: Star, changeType: 'positive' },
  ];

  const isDashboardActive = verificationStatus === 'verified' || verificationStatus === 'acknowledged';

  return (
    <VendorLayout>
      <div className="p-6 md:p-10 lg:px-12 animate-fade-in max-w-7xl mx-auto">
        
        {/* Verification Status Banner */}
        {verificationStatus === 'pending' && (
          <div className="mb-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm animate-in slide-in-from-top-4 duration-500">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-900">Account Under Verification</h3>
              <p className="text-sm text-amber-700 mt-1 font-medium leading-relaxed">
                Your vendor profile is currently being reviewed by our admin team. You will be able to manage your services and receive orders once approved. This process usually takes 24-48 hours.
              </p>
            </div>
          </div>
        )}

        {verificationStatus === 'rejected' && (
          <div className="mb-8 p-5 bg-red-50 border border-red-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm animate-in slide-in-from-top-4 duration-500">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-900">Verification Rejected</h3>
              <p className="text-sm text-red-700 mt-1 font-medium leading-relaxed">
                Unfortunately, your account verification was rejected due to blurry or invalid ID proof documents. Please update your details to re-apply.
              </p>
            </div>
            <button className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shadow-sm">
              View Reason & Update
            </button>
          </div>
        )}

        {verificationStatus === 'verified' && (
          <div className="mb-8 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm animate-in slide-in-from-top-4 duration-500">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-emerald-900">Account Verified!</h3>
              <p className="text-sm text-emerald-700 mt-1 font-medium leading-relaxed">
                Great news! Your account has been fully verified. You can now manage your services, view your dashboard, and start accepting bookings.
              </p>
            </div>
            <button 
              onClick={() => setVerificationStatus('acknowledged')}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              Acknowledge & Start
            </button>
          </div>
        )}

        {/* Temporary Dev Controls to demonstrate the different states */}
        <div className="mb-8 flex gap-2 justify-end opacity-20 hover:opacity-100 transition-opacity">
          <span className="text-xs text-slate-400 my-auto mr-2">Dev State Toggles:</span>
          <button onClick={() => setVerificationStatus('pending')} className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">Pending</button>
          <button onClick={() => setVerificationStatus('verified')} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Verified</button>
          <button onClick={() => setVerificationStatus('rejected')} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Rejected</button>
        </div>

        {/* Wrapper that disables/blurs the dashboard if not verified */}
        <div className={`transition-all duration-500 ${!isDashboardActive ? 'opacity-50 pointer-events-none filter blur-[2px] select-none' : ''}`}>
          
          <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
              <p className="text-slate-500 mt-1 text-base">Welcome back! Here's what's happening with your business today.</p>
            </div>
            <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-lg font-medium shadow-sm transition-all">
              <span>View Live Site</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${
                    stat.changeType === 'positive' ? 'text-emerald-700 bg-emerald-50' : 
                    stat.changeType === 'negative' ? 'text-red-700 bg-red-50' : 'text-slate-600 bg-slate-100'
                  }`}>
                    {stat.changeType === 'positive' && <TrendingUp className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-500 mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Main Content Area: Charts & Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="py-12 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <Package className="w-10 h-10 mb-3 text-slate-400" />
                <p className="font-medium text-slate-600">No recent orders found.</p>
                <p className="text-sm text-slate-500 mt-1">Orders will appear here once customers book services.</p>
              </div>
            </div>
            
            {/* Quick Actions or Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
               <h3 className="text-lg font-bold text-slate-900 mb-6">Store Status</h3>
               <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="font-medium text-emerald-700">Accepting Orders</span>
                    </div>
                 </div>
                 <div className="pt-6 mt-6 border-t border-slate-100">
                    <h4 className="font-semibold text-slate-700 mb-4">Pending Tasks</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <span className="text-sm text-slate-600 font-medium">Update pricing for 'Premium Wash'</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <span className="text-sm text-slate-600 font-medium">Review 3 new customer feedback</span>
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
