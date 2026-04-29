import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Store, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

const VendorSignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/vendor');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-violet-500/30 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-violet-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay z-0 pointer-events-none"></div>

      <div className="w-full max-w-5xl bg-[#111827]/70 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.3)] relative z-10 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Value Props */}
        <div className="w-full lg:w-5/12 bg-gradient-to-br from-violet-600/90 to-fuchsia-700/90 p-10 lg:p-12 text-white relative flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-sm mb-12 hover:bg-black/30 transition-colors">
              <Store className="w-5 h-5" />
              <span className="text-lg font-bold tracking-tight">Mr. Wash Partners</span>
            </Link>

            <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 leading-tight">Start scaling your laundry business today.</h2>
            <p className="text-violet-100 text-lg mb-10">Join thousands of vendors earning more with our streamlined management platform.</p>

            <div className="space-y-6">
              {[
                'Zero setup fees & instant payout options',
                'Advanced analytics and reporting tools',
                'Dedicated 24/7 partner support team',
                'Automated booking & scheduling'
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-fuchsia-300 shrink-0" />
                  <span className="font-medium text-white/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-7/12 p-10 lg:p-16 flex flex-col justify-center bg-[#0B0F19]/50">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">Create Partner Account</h1>
            <p className="text-slate-400">Fill in your details to get started.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Business Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                  </div>
                  <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required placeholder="Crystal Cleaners" 
                    className="w-full pl-11 pr-4 py-3 bg-[#111827]/80 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Owner Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                  </div>
                  <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required placeholder="John Doe" 
                    className="w-full pl-11 pr-4 py-3 bg-[#111827]/80 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                  </div>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="partner@mrwash.com" 
                    className="w-full pl-11 pr-4 py-3 bg-[#111827]/80 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Phone Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                  </div>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 234 567 8900" 
                    className="w-full pl-11 pr-4 py-3 bg-[#111827]/80 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                </div>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create a strong password" 
                  className="w-full pl-11 pr-4 py-3 bg-[#111827]/80 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                />
              </div>
            </div>

            <button type="submit" className="w-full relative group mt-8 pt-4">
              <div className="absolute top-4 -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold py-4 px-8 rounded-xl leading-none transition-all">
                <span>Create Partner Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400">
            Already have an account?{' '}
            <Link to="/vendor/login" className="font-bold text-white hover:text-violet-300 transition-colors underline decoration-white/20 underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorSignupPage;
