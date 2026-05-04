import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, ArrowRight, User, Phone, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authApi } from '../../services/api/authApi';

const CustomerSignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Full Name is required').min(2, 'Name must be at least 2 characters'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().required('Phone number is required').matches(/^\+?[0-9]{10,15}$/, 'Enter a valid phone number'),
      password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setApiError('');
      try {
        // Split name into first and last for backend
        const nameParts = values.name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || '';

        await authApi.signup({
          firstName,
          lastName,
          email: values.email,
          phoneNumber: values.phone,
          password: values.password,
        });
        
        setIsSuccess(true);
        // Next step would typically be OTP verification, but for now we redirect to login
        setTimeout(() => navigate('/login'), 2000);
      } catch (error: any) {
        setApiError(error.response?.data?.message || 'Something went wrong during signup.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-50 font-sans selection:bg-brand/20">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/30 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-400/20 rounded-full blur-[120px] pointer-events-none" style={{ animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-purple-400/20 rounded-full blur-[90px] pointer-events-none" style={{ animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>
      </div>

      <div className="w-full max-w-[1200px] flex z-10 mx-4 lg:mx-8 bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-white/50 overflow-hidden relative my-6">
        
        {/* Left Side: Brand & Visual (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-brand via-blue-600 to-indigo-800 rounded-[2rem] m-2 text-white">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay z-0"></div>
          
          {/* Glass floating elements */}
          <div className="absolute top-24 right-12 w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rotate-12 animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-40 left-12 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full -rotate-12 animate-[float_4s_ease-in-out_infinite_reverse]"></div>

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 w-max group inline-flex">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white shadow-lg border border-white/30 group-hover:bg-white group-hover:text-brand transition-all duration-300">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <span className="text-3xl font-black text-white tracking-tight">Mr. Wash</span>
            </Link>
          </div>

          <div className="relative z-10 mb-8 mt-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span className="text-blue-50">Join the Laundry Revolution</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Start your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-100">fresh journey.</span>
            </h1>
            <p className="text-lg text-blue-100/90 max-w-md font-medium leading-relaxed">
              Say goodbye to laundry day. Schedule a pickup in seconds and get your clothes back fresh, folded, and perfect.
            </p>
          </div>
          
          {/* Feature highlights */}
          <div className="relative z-10 mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-black text-white mb-1">24h</p>
              <p className="text-sm font-medium text-blue-200">Express Delivery</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white mb-1">100%</p>
              <p className="text-sm font-medium text-blue-200">Quality Assured</p>
            </div>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full lg:w-[55%] flex items-center justify-center p-8 sm:p-14 relative z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          <div className="w-full max-w-[420px] py-4">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-10 flex justify-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-brand to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-[1.05] transition-transform">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="text-3xl font-black text-slate-800 tracking-tight">Mr.<span className="text-brand">Wash</span></span>
              </Link>
            </div>

            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-3 tracking-tight">Create Account</h2>
              <p className="text-slate-500 font-medium text-lg">Join us for premium, hassle-free laundry.</p>
            </div>

            {apiError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-red-700">{apiError}</p>
              </div>
            )}

            {isSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-green-700">Account created successfully! Redirecting...</p>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${formik.touched.name && formik.errors.name ? 'text-red-400' : 'text-slate-400 group-focus-within:text-brand'} transition-colors`} />
                  </div>
                  <input 
                    type="text" 
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Alex Johnson" 
                    className={`w-full pl-11 pr-4 py-3.5 bg-white/80 backdrop-blur-sm border ${formik.touched.name && formik.errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-brand focus:ring-brand/10'} rounded-xl text-slate-800 placeholder:text-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all shadow-sm`}
                  />
                </div>
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm font-medium ml-1 mt-1">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${formik.touched.email && formik.errors.email ? 'text-red-400' : 'text-slate-400 group-focus-within:text-brand'} transition-colors`} />
                  </div>
                  <input 
                    type="email" 
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="you@example.com" 
                    className={`w-full pl-11 pr-4 py-3.5 bg-white/80 backdrop-blur-sm border ${formik.touched.email && formik.errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-brand focus:ring-brand/10'} rounded-xl text-slate-800 placeholder:text-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all shadow-sm`}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm font-medium ml-1 mt-1">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className={`h-5 w-5 ${formik.touched.phone && formik.errors.phone ? 'text-red-400' : 'text-slate-400 group-focus-within:text-brand'} transition-colors`} />
                  </div>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="+1 (555) 000-0000" 
                    className={`w-full pl-11 pr-4 py-3.5 bg-white/80 backdrop-blur-sm border ${formik.touched.phone && formik.errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-brand focus:ring-brand/10'} rounded-xl text-slate-800 placeholder:text-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all shadow-sm`}
                  />
                </div>
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-500 text-sm font-medium ml-1 mt-1">{formik.errors.phone}</div>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${formik.touched.password && formik.errors.password ? 'text-red-400' : 'text-slate-400 group-focus-within:text-brand'} transition-colors`} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Create a password" 
                    className={`w-full pl-11 pr-12 py-3.5 bg-white/80 backdrop-blur-sm border ${formik.touched.password && formik.errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-brand focus:ring-brand/10'} rounded-xl text-slate-800 placeholder:text-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all shadow-sm`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm font-medium ml-1 mt-1">{formik.errors.password}</div>
                ) : null}
              </div>

              <button 
                type="submit" 
                disabled={isLoading || !formik.isValid}
                className="w-full relative group mt-6 overflow-hidden rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand to-indigo-600 transition-all duration-300 group-hover:scale-[1.02]"></div>
                <div className="relative flex items-center justify-center gap-2 text-white font-bold text-lg py-3.5 px-8 leading-none">
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            <p className="mt-8 text-center text-slate-600 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-brand font-bold hover:text-indigo-600 transition-colors underline decoration-brand/30 underline-offset-4">
                Log in here
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
          background-color: rgba(148, 163, 184, 0.3);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default CustomerSignupPage;
