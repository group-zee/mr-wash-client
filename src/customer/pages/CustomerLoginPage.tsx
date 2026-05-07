import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Lock, ArrowRight, ShieldCheck, Eye, EyeOff, Activity } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { authApi } from '../../services/api/authApi';
import { useAuth } from '../../context/AuthContext';

const CustomerLoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required('Required')
        .matches(/^\d+$/, 'No spaces allowed')
        .min(10, 'Invalid phone number'),
      password: Yup.string()
        .required('Required')
        .matches(/^\S+$/, 'Spaces not acceptable'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await authApi.login({
          phoneNumber: values.phone,
          password: values.password,
        });
        
        login(response.data.customer);
        
        toast.success("Welcome back to Mr. Wash!");
        navigate('/home');
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Login failed");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="h-screen w-full flex bg-white font-sans text-slate-600 overflow-hidden">
      
      {/* Left Side: Brand Panel */}
      <div className="hidden lg:flex w-[40%] flex-col justify-between p-10 xl:p-14 bg-blue-600 text-white relative">
        <div className="absolute inset-0 bg-blue-700/50" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5 group w-max">
            <div className="w-9 h-9 bg-white text-blue-600 rounded-lg flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Mr. Wash</span>
          </Link>
        </div>
        <div className="relative z-10 mt-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-5 border border-white/20">
            <Activity className="w-3.5 h-3.5 text-blue-200" />
            <span>Premium Care</span>
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
            Welcome back to <br />
            <span className="text-blue-200">quality laundry.</span>
          </h1>
          <p className="text-sm text-blue-100 max-w-sm font-medium leading-relaxed">
            Sign in to manage your bookings, track your laundry in real-time, and access exclusive member offers.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-12 relative overflow-y-auto">
        <div className="w-full max-w-[380px] my-auto">
          <div className="lg:hidden mb-8 flex justify-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Mr. Wash</span>
            </Link>
          </div>

          <div className="mb-6 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-slate-900">Sign In</h2>
            <p className="text-xs text-slate-500 mt-1">Enter your details to access your account.</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                Mobile Number
                {formik.touched.phone && formik.errors.phone && <span className="text-red-500 font-normal">{formik.errors.phone}</span>}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className={`h-4 w-4 ${formik.touched.phone && formik.errors.phone ? 'text-red-400' : 'text-slate-400'} group-focus-within:text-blue-500 transition-colors`} />
                </div>
                <input type="tel" {...formik.getFieldProps('phone')} placeholder="9876543210" 
                  className={`w-full pl-9 pr-3 py-2.5 bg-white border ${formik.touched.phone && formik.errors.phone ? 'border-red-400' : 'border-slate-300'} rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 flex justify-between gap-1">
                  Password
                  {formik.touched.password && formik.errors.password && <span className="text-red-500 font-normal">{formik.errors.password}</span>}
                </label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">Forgot?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-4 w-4 ${formik.touched.password && formik.errors.password ? 'text-red-400' : 'text-slate-400'} group-focus-within:text-blue-500 transition-colors`} />
                </div>
                <input type={showPassword ? "text" : "password"} {...formik.getFieldProps('password')} placeholder="Enter password" 
                  className={`w-full pl-9 pr-9 py-2.5 bg-white border ${formik.touched.password && formik.errors.password ? 'border-red-400' : 'border-slate-300'} rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-70 shadow-md shadow-blue-100"
            >
              {isLoading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : (
                <><span>Sign In</span><ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-xs">
            Don't have an account? <Link to="/customer/signup" className="text-blue-600 font-semibold hover:underline">Create one for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoginPage;
