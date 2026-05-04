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
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Ready': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
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
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Booking Management</h1>
              <p className="text-slate-500 mt-1 text-base">Track and update the status of your customer orders. Click on a row to see detailed view.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search bookings..." 
                  className="pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm w-full md:w-64 shadow-sm text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <button className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </header>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((booking) => (
                    <tr 
                      key={booking.id} 
                      onClick={() => navigate(`/vendor/bookings/${booking.id}`)}
                      className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-5 font-mono text-sm font-semibold text-blue-600">
                        <div className="flex items-center gap-2">
                          {booking.id}
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 group-hover:text-blue-500" />
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-900 mb-1">{booking.customerName}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {booking.date}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-700">
                        {booking.serviceName}
                        <div className="mt-2">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded text-[11px] font-bold">
                            {booking.items} Items
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-900 text-lg">₹{booking.totalAmount}</td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => handleStatusChange(e, booking.id, 'In Progress')}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-lg transition-all" title="Mark In Progress">
                            <Clock className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => handleStatusChange(e, booking.id, 'Ready')}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 rounded-lg transition-all" title="Mark Ready">
                            <Package className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => handleStatusChange(e, booking.id, 'Delivered')}
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 rounded-lg transition-all" title="Mark Delivered">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => handleStatusChange(e, booking.id, 'Cancelled')}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition-all" title="Cancel Order">
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
