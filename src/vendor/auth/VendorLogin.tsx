import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Lock, ArrowRight, Store, Eye, EyeOff, Activity, Info } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/api/authApi';
import toast from 'react-hot-toast';

const VendorLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.message) {
      setNotification(location.state.message);
    }
  }, [location]);

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
        const response = await authApi.vendorLogin({
          phoneNumber: values.phone,
          password: values.password,
        });
        
        login(response.data.vendor);
        
        toast.success("Welcome back to your dashboard!");
        navigate('/vendor');
      } catch (error: any) {
        if (error.response?.status === 403) {
          // Handle unverified account
          toast.error("Account not verified. Redirecting...");
          navigate('/vendor/otp', { state: { phoneNumber: values.phone } });
        } else {
          toast.error(error.response?.data?.message || "Login failed");
        }
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
              <Store className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Mr. Wash <span className="font-medium text-blue-200">Partners</span></span>
          </Link>
        </div>
        <div className="relative z-10 mt-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-5 border border-white/20">
            <Activity className="w-3.5 h-3.5 text-blue-200" />
            <span>Partner Dashboard</span>
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
            Scale your <br />
            <span className="text-blue-200">laundry business.</span>
          </h1>
          <p className="text-sm text-blue-100 max-w-sm font-medium leading-relaxed">
            Join the elite network of premium laundry vendors. Manage your services, track bookings, and boost your revenue effortlessly.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-12 relative overflow-y-auto">
        <div className="w-full max-w-[380px] my-auto">
          <div className="lg:hidden mb-8 flex justify-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Mr. Wash <span className="font-medium text-blue-600">Partners</span></span>
            </Link>
          </div>

          <div className="mb-6 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
            <p className="text-xs text-slate-500 mt-1">Sign in to your partner dashboard.</p>
          </div>

          {notification && (
            <div className="mb-5 p-3 rounded-md bg-blue-50 border border-blue-100 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 font-medium leading-relaxed">{notification}</p>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                Mobile Number
                {formik.touched.phone && formik.errors.phone && <span className="text-red-500 font-normal">{formik.errors.phone}</span>}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className={`h-4 w-4 ${formik.touched.phone && formik.errors.phone ? 'text-red-400' : 'text-slate-400'} group-focus-within:text-blue-500 transition-colors`} />
                </div>
                <input type="tel" {...formik.getFieldProps('phone')} placeholder="9876543210" 
                  className={`w-full pl-9 pr-3 py-2 bg-white border ${formik.touched.phone && formik.errors.phone ? 'border-red-400' : 'border-slate-300'} rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                />
              </div>
            </div>

            <div className="space-y-1">
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
                  className={`w-full pl-9 pr-9 py-2 bg-white border ${formik.touched.password && formik.errors.password ? 'border-red-400' : 'border-slate-300'} rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md transition-colors flex items-center justify-center gap-1.5 disabled:opacity-70"
            >
              {isLoading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : (
                <><span>Sign In</span><ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-500 text-xs">
            Don't have a partner account? <Link to="/vendor/signup" className="text-blue-600 font-semibold hover:underline">Apply to join us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
