import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { addToCart, updateQuantity } from '../store/customerSlice';
import { ChevronLeft, MapPin, Star, Clock, Info, ShieldCheck, ShoppingCart, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { cn } from '../../shared/utils/cn';

import { ShopDetailsSkeleton } from '../components/Skeleton';

const ShopDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shops, cart, loading } = useSelector((state: RootState) => state.customer);
  const shop = shops.find(s => s.id === Number(id));

  const getQuantity = (serviceId: string) => {
    return cart.find(item => item.serviceId === serviceId)?.quantity || 0;
  };

  const handleUpdateCart = (service: any, delta: number) => {
    const currentQty = getQuantity(service.id);
    const newQty = currentQty + delta;
    
    if (currentQty === 0 && delta > 0) {
      dispatch(addToCart({
        shopId: Number(id),
        serviceId: service.id,
        name: service.name,
        price: service.price,
        quantity: 1,
        unit: service.unit
      }));
    } else {
      dispatch(updateQuantity({ serviceId: service.id, quantity: newQty }));
    }
  };

  const cartCount = cart.length;
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <ShopDetailsSkeleton />
        <Footer />
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Shop not found</h2>
          <button onClick={() => navigate('/')} className="mt-4 text-blue-600 font-bold hover:underline">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header />

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 transition-colors font-semibold text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Shop Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm sticky top-24">
              <div className="relative h-64">
                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm border",
                    shop.status === "Open" ? "bg-green-50 text-green-700 border-green-100" : "bg-orange-50 text-orange-700 border-orange-100"
                  )}>
                    {shop.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">{shop.name}</h1>
                  <div className="flex items-center gap-1 text-slate-500 mt-1">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">{shop.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-4 border-y border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Rating</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-slate-800">{shop.rating}</span>
                      <span className="text-xs text-slate-400">({shop.reviews})</span>
                    </div>
                  </div>
                  <div className="w-[1px] h-8 bg-slate-100"></div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Timing</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-bold text-slate-800">{shop.openTime} - {shop.closeTime}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
                  <div className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                    <p className="text-xs text-blue-800 font-medium leading-relaxed">
                      {shop.specialty}. This shop is a verified Mr. Wash partner ensuring high-quality fabric care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Services */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-slate-900">Available Services</h2>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                {shop.services?.length || 0} Services
              </span>
            </div>

            <div className="grid gap-4">
              {shop.services?.map((service) => (
                <motion.div 
                  key={service.id}
                  whileHover={{ y: -2 }}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 transition-all hover:border-blue-300"
                >
                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{service.description}</p>
                    <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                      <span className="text-blue-600 font-extrabold text-xl">₹{service.price}</span>
                      <span className="text-slate-400 text-sm font-bold">/ {service.unit}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <button 
                      onClick={() => handleUpdateCart(service, -1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 active:scale-90 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-black text-slate-800 w-4 text-center">{getQuantity(service.id)}</span>
                    <button 
                      onClick={() => handleUpdateCart(service, 1)}
                      className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 active:scale-90 transition-all shadow-sm shadow-blue-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {(!shop.services || shop.services.length === 0) && (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center">
                <Info className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800">No services listed</h3>
                <p className="text-slate-500 text-sm">This shop hasn't updated their service list yet.</p>
              </div>
            )}

            {/* Checkout Sticky Bar */}
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.div 
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  exit={{ y: 100 }}
                  className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:flex justify-center z-40"
                >
                  <div className="max-w-7xl w-full flex items-center justify-between gap-6 px-4">
                    <div className="hidden sm:flex flex-col">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Amount</span>
                      <span className="text-xl font-black text-slate-900">₹{cartTotal}</span>
                    </div>
                    <button 
                      onClick={() => navigate('/checkout')}
                      className="w-full sm:w-auto bg-blue-600 text-white px-12 py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Proceed to Booking ({cartCount} Items)
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShopDetailsPage;
