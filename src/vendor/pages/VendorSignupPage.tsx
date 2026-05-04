import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Store, Phone, ArrowRight, CheckCircle2, Eye, EyeOff, Activity } from 'lucide-react';

const VendorSignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/vendor');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0B0F19] font-sans selection:bg-violet-500/30 text-slate-300">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" style={{ animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[90px] pointer-events-none" style={{ animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none z-0"></div>
      </div>

      <div className="w-full max-w-[1200px] flex z-10 mx-4 lg:mx-8 bg-[#131B2C]/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-white/5 overflow-hidden relative my-6">
        
        {/* Left Side: Value Props (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-violet-900 via-[#1e1b4b] to-fuchsia-900 rounded-[2rem] m-2 text-white">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay z-0"></div>
          
          {/* Glass floating elements */}
          <div className="absolute top-24 right-12 w-20 h-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl rotate-12 animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-40 left-12 w-16 h-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-full -rotate-12 animate-[float_4s_ease-in-out_infinite_reverse]"></div>

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 w-max group inline-flex">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white shadow-lg border border-white/20 group-hover:bg-white group-hover:text-violet-900 transition-all duration-300">
                <Store className="w-7 h-7" />
              </div>
              <span className="text-3xl font-black text-white tracking-tight">Mr. Wash <span className="text-violet-400 font-medium">Partners</span></span>
            </Link>
          </div>

          <div className="relative z-10 mb-8 mt-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-semibold mb-6">
              <Activity className="w-4 h-4 text-violet-300" />
              <span className="text-violet-100">Become a Partner</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Start your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-violet-300">growth journey.</span>
            </h1>
            <p className="text-lg text-violet-200/80 max-w-md font-medium leading-relaxed mb-6">
              Join thousands of vendors earning more with our streamlined management platform.
            </p>

            <div className="space-y-4">
              {[
                'Zero setup fees',
                'Advanced analytics',
                'Automated booking'
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" />
                  <span className="font-medium text-white/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full lg:w-[55%] flex items-center justify-center p-8 sm:p-14 relative z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          <div className="w-full max-w-[460px] py-4">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-10 flex justify-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-[1.05] transition-transform">
                  <Store className="w-7 h-7" />
                </div>
                <span className="text-3xl font-black text-white tracking-tight">Mr. Wash <span className="text-violet-400 font-medium text-xl block mt-[-5px]">Partners</span></span>
              </Link>
            </div>

            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">Create Account</h2>
              <p className="text-slate-400 font-medium text-lg">Fill in your details to get started.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 ml-1">Business Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Store className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                    </div>
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required placeholder="Crystal Cleaners" 
                      className="w-full pl-11 pr-4 py-3.5 bg-[#1C2538]/80 backdrop-blur-sm border border-white/5 rounded-xl text-white placeholder:text-slate-500 font-semibold focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all shadow-sm hover:border-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 ml-1">Owner Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                    </div>
                    <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required placeholder="John Doe" 
                      className="w-full pl-11 pr-4 py-3.5 bg-[#1C2538]/80 backdrop-blur-sm border border-white/5 rounded-xl text-white placeholder:text-slate-500 font-semibold focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all shadow-sm hover:border-white/10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                  </div>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="partner@mrwash.com" 
                    className="w-full pl-11 pr-4 py-3.5 bg-[#1C2538]/80 backdrop-blur-sm border border-white/5 rounded-xl text-white placeholder:text-slate-500 font-semibold focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all shadow-sm hover:border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Phone Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                  </div>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 (555) 000-0000" 
                    className="w-full pl-11 pr-4 py-3.5 bg-[#1C2538]/80 backdrop-blur-sm border border-white/5 rounded-xl text-white placeholder:text-slate-500 font-semibold focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all shadow-sm hover:border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                  </div>
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required placeholder="Create a strong password" 
                    className="w-full pl-11 pr-12 py-3.5 bg-[#1C2538]/80 backdrop-blur-sm border border-white/5 rounded-xl text-white placeholder:text-slate-500 font-semibold focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all shadow-sm hover:border-white/10"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full relative group mt-6 overflow-hidden rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all duration-300 group-hover:scale-[1.02]"></div>
                <div className="relative flex items-center justify-center gap-2 text-white font-bold text-lg py-3.5 px-8 leading-none">
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            <p className="mt-8 text-center text-slate-400 font-medium">
              Already have an account?{' '}
              <Link to="/vendor/login" className="text-white font-bold hover:text-violet-400 transition-colors underline decoration-white/20 underline-offset-4">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Required css for custom animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        
        /* Custom scrollbar for form area if needed */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(139, 92, 246, 0.3);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default VendorSignupPage;
