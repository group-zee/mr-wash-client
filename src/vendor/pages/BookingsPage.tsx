import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VendorLayout from '../components/VendorLayout';
import { Booking } from '../types';
import { Calendar, Search, Filter, CheckCircle, Clock, Package, XCircle, ExternalLink } from 'lucide-react';

const BookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'BK001',
      customerName: 'John Doe',
      customerPhone: '+91 98765 43210',
      customerEmail: 'john@example.com',
      customerAddress: 'Apartment 4B, Blue Sky Residency, Downtown',
      serviceName: 'Regular Wash',
      status: 'Pending',
      date: '2026-04-27',
      totalAmount: 150,
      items: 3,
      paymentStatus: 'Unpaid',
      paymentMethod: 'Cash'
    },
    {
      id: 'BK002',
      customerName: 'Sarah Smith',
      customerPhone: '+91 87654 32109',
      customerEmail: 'sarah.s@gmail.com',
      customerAddress: 'House No. 12, Green Valley Lane, Westside',
      serviceName: 'Premium Ironing',
      status: 'In Progress',
      date: '2026-04-26',
      totalAmount: 45,
      items: 3,
      paymentStatus: 'Paid',
      paymentMethod: 'Online'
    },
    {
      id: 'BK003',
      customerName: 'Mike Ross',
      customerPhone: '+91 76543 21098',
      customerEmail: 'mike.law@pearson.com',
      customerAddress: '601 Park Avenue, Upper East Side, New York',
      serviceName: 'Dry Clean',
      status: 'Ready',
      date: '2026-04-25',
      totalAmount: 200,
      items: 1,
      paymentStatus: 'Paid',
      paymentMethod: 'Wallet'
    }
  ]);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'Pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'In Progress': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Ready': return 'bg-violet-500/10 text-violet-300 border-violet-500/20';
      case 'Delivered': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-white/5 text-slate-300 border-white/10';
    }
  };

  const handleStatusChange = (e: React.MouseEvent, id: string, newStatus: Booking['status']) => {
    e.stopPropagation();
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <VendorLayout>
      <div className="p-6 md:p-10 lg:px-12 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Booking Management</h1>
              <p className="text-slate-400 mt-2 text-lg">Track and update the status of your customer orders. Click on a row to see detailed view.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search bookings..." 
                  className="pl-10 pr-4 py-3 bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all text-sm w-full md:w-64 shadow-sm text-slate-200 placeholder:text-slate-500"
                />
              </div>
              <button className="p-3 bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all shadow-sm">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </header>

          <div className="bg-[#111827]/60 backdrop-blur-xl rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/5 overflow-hidden p-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bookings.map((booking) => (
                    <tr 
                      key={booking.id} 
                      onClick={() => navigate(`/vendor/bookings/${booking.id}`)}
                      className="hover:bg-violet-500/10 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-5 font-mono text-sm font-semibold text-violet-400">
                        <div className="flex items-center gap-2">
                          {booking.id}
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 group-hover:text-violet-300" />
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-white mb-1">{booking.customerName}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {booking.date}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-300">
                        {booking.serviceName}
                        <div className="mt-2">
                          <span className="px-2 py-0.5 bg-white/10 text-slate-300 border border-white/5 rounded text-[11px] font-bold">
                            {booking.items} Items
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-extrabold text-white text-lg">₹{booking.totalAmount}</td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => handleStatusChange(e, booking.id, 'In Progress')}
                            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-xl transition-all" title="Mark In Progress">
                            <Clock className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => handleStatusChange(e, booking.id, 'Ready')}
                            className="p-2 text-slate-400 hover:text-violet-400 hover:bg-violet-500/20 rounded-xl transition-all" title="Mark Ready">
                            <Package className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => handleStatusChange(e, booking.id, 'Delivered')}
                            className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/20 rounded-xl transition-all" title="Mark Delivered">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => handleStatusChange(e, booking.id, 'Cancelled')}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/20 rounded-xl transition-all" title="Cancel Order">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default BookingsPage;

