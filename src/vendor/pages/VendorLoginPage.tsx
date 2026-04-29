import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Store } from 'lucide-react';

const VendorLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/vendor');
  };

  return (
    <div className="min-h-screen flex bg-[#0B0F19] text-slate-300 font-sans selection:bg-violet-500/30 overflow-hidden">
      
      {/* Left Side: Brand & Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-[#0B0F19] to-fuchsia-900/20 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay z-0"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 w-max group">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(139,92,246,0.3)] ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-300">
              <Store className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">Mr. Wash <span className="text-violet-400 font-medium">Partners</span></span>
          </Link>
        </div>

        <div className="relative z-10 mb-20">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Grow your laundry <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">business instantly.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-md">
            Join the elite network of premium laundry vendors. Manage your services, track bookings, and boost your revenue all in one powerful dashboard.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-8 left-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Store className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">Mr. Wash Partners</span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h2>
            <p className="text-slate-400">Sign in to your partner dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="vendor@mrwash.com" 
                  className="w-full pl-11 pr-4 py-3.5 bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-4 py-3.5 bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>

            <button type="submit" className="w-full relative group mt-8">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-4 px-8 rounded-xl leading-none">
                <span>Sign In Securely</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </form>

          <p className="mt-10 text-center text-slate-400">
            Don't have a partner account?{' '}
            <Link to="/vendor/signup" className="font-bold text-white hover:text-violet-300 transition-colors underline decoration-white/20 underline-offset-4">
              Apply to join us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorLoginPage;
