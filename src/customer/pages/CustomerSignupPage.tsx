import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2, Eye, EyeOff, Activity, AlertCircle } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { authApi } from '../../services/api/authApi';

const CustomerSignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required('Name is required')
        .matches(/^\S+(?: \S+)*$/, 'No leading/trailing or multiple spaces allowed')
        .min(2, 'Name too short'),
      phone: Yup.string()
        .required('Phone is required')
        .matches(/^\d+$/, 'No spaces allowed')
        .min(10, 'Invalid phone number'),
      password: Yup.string()
        .required('Password is required')
        .matches(/^\S+$/, 'Spaces are not acceptable')
        .min(6, 'At least 6 chars'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await authApi.signup({
          firstName: values.userName.split(' ')[0],
          lastName: values.userName.split(' ')[1] || '',
          phoneNumber: values.phone,
          email: `${values.phone}@mrwash.com`, // Temporary email mapping if backend requires it
          password: values.password
        });
        toast.success("Account created! Please verify your mobile.");
        navigate('/customer/otp', { state: { phoneNumber: values.phone } });
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Signup failed");
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
            <span>Join the Revolution</span>
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
            Freshness <br />
            <span className="text-blue-200">delivered to you.</span>
          </h1>
          <p className="text-sm text-blue-100 max-w-sm font-medium leading-relaxed mb-8">
            The easiest way to get your laundry done. Professional care for your clothes, just a tap away.
          </p>
          <div className="space-y-3">
            {['Expert cleaning', 'Real-time tracking', '24h Express delivery'].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0" />
                <span className="text-sm font-medium text-white">{benefit}</span>
              </div>
            ))}
          </div>
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
            <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
            <p className="text-xs text-slate-500 mt-1">Sign up to experience premium laundry care.</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                User Name
                {formik.touched.userName && formik.errors.userName && <span className="text-red-500 font-normal text-[10px]">{formik.errors.userName}</span>}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-4 w-4 ${formik.touched.userName && formik.errors.userName ? 'text-red-400' : 'text-slate-400'} group-focus-within:text-blue-500 transition-colors`} />
                </div>
                <input type="text" {...formik.getFieldProps('userName')} placeholder="John Doe" 
                  className={`w-full pl-9 pr-3 py-2.5 bg-white border ${formik.touched.userName && formik.errors.userName ? 'border-red-400' : 'border-slate-300'} rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                Mobile Number
                {formik.touched.phone && formik.errors.phone && <span className="text-red-500 font-normal text-[10px]">{formik.errors.phone}</span>}
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
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                Password
                {formik.touched.password && formik.errors.password && <AlertCircle className="w-3 h-3 text-red-500 mt-0.5" />}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-4 w-4 ${formik.touched.password && formik.errors.password ? 'text-red-400' : 'text-slate-400'} group-focus-within:text-blue-500 transition-colors`} />
                </div>
                <input type={showPassword ? "text" : "password"} {...formik.getFieldProps('password')} placeholder="Create password" 
                  className={`w-full pl-9 pr-9 py-2.5 bg-white border ${formik.touched.password && formik.errors.password ? 'border-red-400' : 'border-slate-300'} rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                Confirm Password
                {formik.touched.confirmPassword && formik.errors.confirmPassword && <AlertCircle className="w-3 h-3 text-red-500 mt-0.5" />}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-4 w-4 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'text-red-400' : 'text-slate-400'} group-focus-within:text-blue-500 transition-colors`} />
                </div>
                <input type={showConfirmPassword ? "text" : "password"} {...formik.getFieldProps('confirmPassword')} placeholder="Repeat password" 
                  className={`w-full pl-9 pr-9 py-2.5 bg-white border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-400' : 'border-slate-300'} rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm`}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-70 shadow-md shadow-blue-100"
            >
              {isLoading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : (
                <><span>Create Account</span><ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-xs">
            Already have an account? <Link to="/customer/login" className="text-blue-600 font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignupPage;
