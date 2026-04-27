import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VendorLayout from '../components/VendorLayout';
import { Booking } from '../types';
import { 
  ArrowLeft, User, Phone, Mail, MapPin, 
  Package, Calendar, CreditCard, Tag, 
  CheckCircle, Clock, XCircle, ChevronRight,
  ClipboardList, Map as MapIcon, Navigation
} from 'lucide-react';

const BookingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock fetching booking data - in a real app, this would be an API call
  const booking: Booking = {
    id: id || 'BK001',
    customerName: 'John Doe',
    customerPhone: '+91 98765 43210',
    customerEmail: 'john.doe@example.com',
    customerAddress: 'Apartment 4B, Blue Sky Residency, Downtown, Metro City - 400001',
    serviceName: 'Premium Laundry & Wash',
    status: 'In Progress',
    date: '2026-04-27',
    totalAmount: 450,
    items: 12,
    deliveryPartnerName: 'Rahul Sharma',
    deliveryPartnerPhone: '+91 98223 34455',
    currentLiveLocation: 'Near Westside Main Cross Road',
    paymentStatus: 'Paid',
    paymentMethod: 'Online'
  };

  const getStatusInfo = (status: Booking['status']) => {
    switch (status) {
      case 'Pending': return { color: 'bg-amber-50 text-amber-600 border-amber-100', icon: Clock };
      case 'In Progress': return { color: 'bg-blue-50 text-blue-600 border-blue-100', icon: Package };
      case 'Ready': return { color: 'bg-indigo-50 text-indigo-600 border-indigo-100', icon: CheckCircle };
      case 'Delivered': return { color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: CheckCircle };
      case 'Cancelled': return { color: 'bg-red-50 text-red-600 border-red-100', icon: XCircle };
      default: return { color: 'bg-slate-50 text-slate-600 border-slate-100', icon: Clock };
    }
  };

  const statusInfo = getStatusInfo(booking.status);
  const StatusIcon = statusInfo.icon;

  return (
    <VendorLayout>
      <div className="p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/vendor/bookings')}
                className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <span className="text-sm font-semibold uppercase tracking-wider">Order</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-sm font-bold text-indigo-600 font-mono">#{booking.id}</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Booking Details</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border ${statusInfo.color}`}>
                <StatusIcon className="w-4 h-4" />
                {booking.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Order & Items */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Summary */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                  <ClipboardList className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-800">Order Summary</h3>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                          <Tag className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Service</p>
                          <p className="font-bold text-slate-800 text-lg">{booking.serviceName}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Quantity</p>
                          <p className="font-bold text-slate-800 text-lg">{booking.items} Items Total</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Order Date</p>
                          <p className="font-bold text-slate-800 text-lg">{booking.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Amount</p>
                          <p className="font-bold text-slate-800 text-lg">₹{booking.totalAmount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Timeline Placeholder */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <h3 className="font-bold text-slate-800 mb-6">Processing Status</h3>
                <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                  <div className="flex gap-4 relative">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-sm z-10" />
                    <div>
                      <p className="font-bold text-slate-800">Order Placed</p>
                      <p className="text-sm text-slate-500">April 27, 2026 at 10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative">
                    <div className="w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-sm z-10" />
                    <div>
                      <p className="font-bold text-slate-800">Picked Up</p>
                      <p className="text-sm text-slate-500">April 27, 2026 at 02:15 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 border-4 border-white shadow-sm z-10 animate-pulse" />
                    <div>
                      <p className="font-bold text-indigo-600">In Progress</p>
                      <p className="text-sm text-slate-500">Processing at main facility</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Partner Details */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Package className="w-5 h-5 text-indigo-600" />
                    Delivery Assignment
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg uppercase">Assigned</span>
                </div>
                
                <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-16 h-16 bg-slate-200 rounded-2xl overflow-hidden flex items-center justify-center border-4 border-white shadow-sm">
                    <User className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Delivery Partner</p>
                    <h4 className="text-lg font-bold text-slate-800">{booking.deliveryPartnerName || 'Rahul Sharma'}</h4>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-indigo-500" />
                        {booking.deliveryPartnerPhone || '+91 98223 34455'}
                      </div>
                      <div className="h-4 w-[1px] bg-slate-200" />
                      <div className="text-sm font-bold text-amber-500 flex items-center gap-1">
                        ★ 4.9
                      </div>
                    </div>
                  </div>
                  <button className="p-4 bg-white border border-slate-200 rounded-2xl text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm">
                    <Phone className="w-5 h-5" />
                  </button>
                </div>

                {/* Live Location Section */}
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                      <span className="text-sm font-bold text-slate-700">Live Tracking</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg uppercase tracking-wider">Updates Every 30s</span>
                  </div>

                  <div className="relative h-40 bg-indigo-50 rounded-2xl overflow-hidden border border-indigo-100/50 group">
                    {/* Simulated Map Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-12 h-12 bg-indigo-600/20 rounded-full animate-ping absolute -inset-0" />
                        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl relative z-10 border-4 border-white">
                          <Navigation className="w-6 h-6 rotate-45" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Map Overlay Info */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white shadow-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                          <MapPin className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Current Location</p>
                          <p className="text-xs font-bold text-slate-800 truncate max-w-[180px]">{booking.currentLiveLocation}</p>
                        </div>
                      </div>
                      <button className="text-[10px] font-bold text-indigo-600 hover:bg-indigo-50 px-2 py-1.5 rounded-lg transition-all border border-indigo-100">
                        View Map
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Customer Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                    <User className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{booking.customerName}</h3>
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-0.5">Regular Customer</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                      <p className="font-semibold text-slate-700">{booking.customerPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                      <p className="font-semibold text-slate-700">{booking.customerEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Address</p>
                      <p className="font-semibold text-slate-700 leading-relaxed">{booking.customerAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Payment</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-700">{booking.paymentMethod}</span>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase ${
                          booking.paymentStatus === 'Paid' 
                            ? 'bg-emerald-50 text-emerald-600' 
                            : 'bg-amber-50 text-amber-600'
                        }`}>
                          {booking.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 space-y-3">
                  <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
                    Contact Customer
                  </button>
                  <button className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95">
                    Print Invoice
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
                <h3 className="font-bold mb-6">Update Status</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex flex-col items-center gap-2 transition-all group">
                    <Clock className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">Pending</span>
                  </button>
                  <button className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex flex-col items-center gap-2 transition-all group border border-indigo-500/50">
                    <Package className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">In Progress</span>
                  </button>
                  <button className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex flex-col items-center gap-2 transition-all group">
                    <CheckCircle className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">Ready</span>
                  </button>
                  <button className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex flex-col items-center gap-2 transition-all group">
                    <CheckCircle className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">Delivered</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default BookingDetailsPage;
