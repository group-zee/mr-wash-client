import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { 
  ChevronLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  CreditCard, 
  Truck, 
  CheckCircle,
  ArrowRight,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { removeFromCart, updateQuantity, clearCart } from '../store/customerSlice';
import { cn } from '../../shared/utils/cn';

const BookingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.customer);
  const [step, setStep] = useState(1); // 1: Details, 2: Success
  
  const [bookingData, setBookingData] = useState({
    address: '',
    pickupDate: '',
    pickupSlot: '',
    paymentMethod: 'Cash on Delivery'
  });

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 25;
  const grandTotal = totalAmount + deliveryFee;

  const handlePlaceOrder = () => {
    // In a real app, send to API here
    setStep(2);
    dispatch(clearCart());
    window.scrollTo(0, 0);
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="pt-32 pb-20 max-w-lg mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trash2 className="w-8 h-8 text-slate-300" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Your cart is empty</h2>
          <p className="text-slate-500 mt-2 font-medium">Add some services to start booking your wash.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-8 bg-brand text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-blue-200"
          >
            Explore Shops
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header />

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="booking-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left: Details Form */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h1 className="text-3xl font-black tracking-tight">Complete Your Booking</h1>
                </div>

                {/* Pickup Address */}
                <section className="bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-black">Pickup Address</h2>
                  </div>
                  <div className="space-y-4">
                    <textarea 
                      placeholder="Enter your full address (House No, Street, Landmark...)"
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-brand focus:bg-white rounded-2xl p-5 outline-none transition-all font-bold text-slate-800 placeholder:text-slate-400 min-h-[120px]"
                      value={bookingData.address}
                      onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                    />
                  </div>
                </section>

                {/* Schedule */}
                <section className="bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-black">Schedule Pickup</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Select Date</label>
                      <input 
                        type="date" 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-brand focus:bg-white rounded-2xl p-5 outline-none transition-all font-black text-slate-800"
                        value={bookingData.pickupDate}
                        onChange={(e) => setBookingData({ ...bookingData, pickupDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Select Time Slot</label>
                      <select 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-brand focus:bg-white rounded-2xl p-5 outline-none transition-all font-black text-slate-800 appearance-none"
                        value={bookingData.pickupSlot}
                        onChange={(e) => setBookingData({ ...bookingData, pickupSlot: e.target.value })}
                      >
                        <option value="">Choose a slot</option>
                        <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                        <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                        <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                        <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Payment Mode */}
                <section className="bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-black">Payment Method</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Cash on Delivery', 'Online Payment'].map((method) => (
                      <button
                        key={method}
                        onClick={() => setBookingData({ ...bookingData, paymentMethod: method })}
                        className={cn(
                          "p-6 rounded-2xl border-2 transition-all text-left group",
                          bookingData.paymentMethod === method 
                            ? "border-brand bg-blue-50/50" 
                            : "border-slate-100 hover:border-slate-200"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            "font-black text-lg",
                            bookingData.paymentMethod === method ? "text-brand" : "text-slate-600"
                          )}>{method}</span>
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            bookingData.paymentMethod === method ? "border-brand bg-brand" : "border-slate-200"
                          )}>
                            {bookingData.paymentMethod === method && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right: Summary Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden sticky top-24">
                  <div className="bg-slate-900 p-8 text-white">
                    <h2 className="text-xl font-black">Order Summary</h2>
                    <p className="text-white/50 text-sm font-bold mt-1">Review your items before booking</p>
                  </div>
                  
                  <div className="p-5 md:p-8 space-y-6">
                    <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                      {cart.map((item) => (
                        <div key={item.serviceId} className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h4 className="font-black text-slate-800 leading-tight">{item.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-bold text-slate-400">{item.quantity} x ₹{item.price}</span>
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => dispatch(updateQuantity({ serviceId: item.serviceId, quantity: item.quantity - 1 }))}
                                  className="w-5 h-5 rounded-md bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand"
                                >-</button>
                                <button 
                                  onClick={() => dispatch(updateQuantity({ serviceId: item.serviceId, quantity: item.quantity + 1 }))}
                                  className="w-5 h-5 rounded-md bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand"
                                >+</button>
                              </div>
                            </div>
                          </div>
                          <span className="font-black text-slate-900">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 pt-6 border-t border-slate-50">
                      <div className="flex justify-between text-slate-500 font-bold">
                        <span>Items Total</span>
                        <span>₹{totalAmount}</span>
                      </div>
                      <div className="flex justify-between text-slate-500 font-bold">
                        <div className="flex items-center gap-2">
                          <span>Delivery Fee</span>
                          <Truck className="w-4 h-4" />
                        </div>
                        <span>₹{deliveryFee}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t-2 border-slate-900 mt-4">
                        <span className="text-lg font-black text-slate-900">Total Amount</span>
                        <span className="text-2xl font-black text-brand">₹{grandTotal}</span>
                      </div>
                    </div>

                    <button 
                      onClick={handlePlaceOrder}
                      disabled={!bookingData.address || !bookingData.pickupDate || !bookingData.pickupSlot}
                      className="w-full bg-brand disabled:bg-slate-200 disabled:shadow-none text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95"
                    >
                      Confirm Booking
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    
                    <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest px-4">
                      By confirming, you agree to our terms and conditions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="booking-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto py-20 text-center space-y-8"
            >
              <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-inner">
                <CheckCircle className="w-16 h-16" />
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Booking Confirmed!</h1>
                <p className="text-xl text-slate-500 font-bold max-w-md mx-auto">
                  Your pickup has been scheduled. Our partner will arrive as per your requested slot.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-left max-w-md mx-auto">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Pickup Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">Scheduled Time</p>
                      <p className="font-black text-slate-800">{bookingData.pickupDate} at {bookingData.pickupSlot}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">Address</p>
                      <p className="font-black text-slate-800 line-clamp-1">{bookingData.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <button 
                  onClick={() => navigate('/')}
                  className="bg-brand text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-blue-200 w-full sm:w-auto"
                >
                  Return Home
                </button>
                <button 
                  className="bg-white border-2 border-slate-100 text-slate-600 px-10 py-5 rounded-2xl font-black hover:bg-slate-50 transition-all w-full sm:w-auto"
                >
                  Track Order
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
