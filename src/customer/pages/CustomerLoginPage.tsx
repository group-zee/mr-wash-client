import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Lock, ShieldCheck, ArrowRight, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authApi } from '../../services/api/authApi';

const CustomerLoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\+?[0-9]{10,15}$/, 'Enter a valid phone number (e.g. +1234567890)'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setApiError('');
      try {
        const response = await authApi.login({
          phoneNumber: values.phone,
          password: values.password,
        });
        
        // Save token (in real app, consider secure cookies or more robust state)
        localStorage.setItem('token', response.data.token);
        
        // Navigate to dashboard
        navigate('/');
      } catch (error: any) {
        setApiError(error.response?.data?.message || 'Invalid credentials or unverified account.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-50 font-sans selection:bg-brand/20">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/30 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400/20 rounded-full blur-[120px] pointer-events-none" style={{ animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-purple-400/20 rounded-full blur-[90px] pointer-events-none" style={{ animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>
      </div>

      <div className="w-full max-w-[1200px] flex z-10 mx-4 lg:mx-8 bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-white/50 overflow-hidden relative my-6">
        
        {/* Left Side: Brand & Visual (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-brand via-blue-600 to-indigo-800 rounded-[2rem] m-2 text-white">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay z-0"></div>
          
          {/* Glass floating elements */}
          <div className="absolute top-20 right-10 w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rotate-12 animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-32 left-10 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full -rotate-12 animate-[float_4s_ease-in-out_infinite_reverse]"></div>

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
              <span className="text-blue-50">Premium Care Guaranteed</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Redefining <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-100">laundry days.</span>
            </h1>
            <p className="text-lg text-blue-100/90 max-w-md font-medium leading-relaxed">
              Experience hassle-free laundry with our premium service. Fresh, clean, and delivered right to your door.
            </p>
          </div>
          
          {/* Customer Reviews snippet */}
          <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
            <div className="flex -space-x-3 mb-3">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 object-cover" src={`https://i.pravatar.cc/100?img=${i+10}`} alt={`User ${i}`} />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs font-bold">+2k</div>
            </div>
            <p className="text-sm font-medium text-blue-200">Trusted by 2,000+ customers nationwide</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-[55%] flex items-center justify-center p-8 sm:p-14 relative z-10">
          
          <div className="w-full max-w-[420px]">
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
              <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-3 tracking-tight">Welcome back</h2>
              <p className="text-slate-500 font-medium text-lg">Please enter your details to sign in.</p>
            </div>

            {apiError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-red-700">{apiError}</p>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-5">
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
                    placeholder="e.g. +1234567890" 
                    className={`w-full pl-11 pr-4 py-3.5 bg-white/80 backdrop-blur-sm border ${formik.touched.phone && formik.errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-brand focus:ring-brand/10'} rounded-xl text-slate-800 placeholder:text-slate-400 font-semibold focus:outline-none focus:ring-4 transition-all shadow-sm`}
                  />
                </div>
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-500 text-sm font-medium ml-1 mt-1">{formik.errors.phone}</div>
                ) : null}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <a href="#" className="text-sm font-bold text-brand hover:text-blue-700 transition-colors">Forgot Password?</a>
                </div>
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
                    placeholder="Enter your password" 
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
                disabled={isLoading}
                className="w-full relative group mt-6 overflow-hidden rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand to-indigo-600 transition-all duration-300 group-hover:scale-[1.02]"></div>
                <div className="relative flex items-center justify-center gap-2 text-white font-bold text-lg py-3.5 px-8 leading-none">
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Social Logins */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-slate-500 font-medium">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-slate-700 active:scale-[0.98] shadow-sm">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-slate-700 active:scale-[0.98] shadow-sm">
                  <svg className="w-5 h-5 text-black fill-current" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.78 3.55-.78 1.46.03 2.76.59 3.6 1.7-3.09 1.76-2.58 5.86.37 7.08-.75 1.83-1.74 3.32-2.6 4.17zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  Apple
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-slate-600 font-medium">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand font-bold hover:text-indigo-600 transition-colors underline decoration-brand/30 underline-offset-4">
                Sign up for free
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
      `}</style>
    </div>
  );
};

export default CustomerLoginPage;
