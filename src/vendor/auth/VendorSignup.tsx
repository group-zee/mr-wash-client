import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Lock, ArrowRight, Store, CheckCircle2, Eye, EyeOff, Activity, UploadCloud, AlertCircle } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { authApi } from '../../services/api/authApi';

const VendorSignup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ownerName: '',
      phone: '',
      idType: 'Aadhaar Card',
      idFrontImage: null as File | null,
      idBackImage: null as File | null,
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      ownerName: Yup.string()
        .required('Owner name is required')
        .matches(/^\S+(?: \S+)*$/, 'No leading/trailing or multiple spaces allowed')
        .min(2, 'Name too short'),
      phone: Yup.string()
        .required('Phone is required')
        .matches(/^\d+$/, 'No spaces allowed')
        .min(10, 'Invalid phone number'),
      idType: Yup.string().required('ID type is required'),
      idFrontImage: Yup.mixed().required('Front side image is required'),
      idBackImage: Yup.mixed().when('idType', {
        is: (val: string) => ['Aadhaar Card', 'Voter ID'].includes(val),
        then: (schema) => schema.required('Back side image is required'),
        otherwise: (schema) => schema.nullable(),
      }),
      password: Yup.string()
        .required('Password is required')
        .matches(/^\S+$/, 'Spaces are not acceptable')
        .min(6, 'At least 6 characters'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Prepare data for backend (In a real app, images would be uploaded to S3 first)
        await authApi.vendorSignup({
          ownerName: values.ownerName,
          phoneNumber: values.phone,
          idType: values.idType,
          idFrontUrl: "https://mock-storage.com/id-front.jpg", // Placeholder until real upload is implemented
          idBackUrl: values.idBackImage ? "https://mock-storage.com/id-back.jpg" : undefined,
          password: values.password
        });
        
        toast.success("Account created! Please verify your phone.");
        navigate('/vendor/otp', { state: { phoneNumber: values.phone } });
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
              <Store className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Mr. Wash <span className="font-medium text-blue-200">Partners</span></span>
          </Link>
        </div>
        <div className="relative z-10 mt-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-5 border border-white/20">
            <Activity className="w-3.5 h-3.5 text-blue-200" />
            <span>Join the Network</span>
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
            Start your <br />
            <span className="text-blue-200">growth journey.</span>
          </h1>
          <p className="text-sm text-blue-100 max-w-sm font-medium leading-relaxed mb-8">
            Access thousands of customers and streamline your operations with our premium vendor platform.
          </p>
          <div className="space-y-3">
            {['Zero setup fees', 'Advanced analytics', 'Automated booking'].map((benefit, i) => (
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
                <Store className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Mr. Wash <span className="font-medium text-blue-600">Partners</span></span>
            </Link>
          </div>

          <div className="mb-6 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
            <p className="text-xs text-slate-500 mt-1">Register to start managing your business.</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                Owner Name
                {formik.touched.ownerName && formik.errors.ownerName && <span className="text-red-500 font-normal">{formik.errors.ownerName}</span>}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-4 w-4 ${formik.touched.ownerName && formik.errors.ownerName ? 'text-red-400' : 'text-slate-400'} group-focus-within:text-blue-500 transition-colors`} />
                </div>
                <input type="text" {...formik.getFieldProps('ownerName')} placeholder="John Doe" 
                  className={`w-full pl-9 pr-3 py-2 bg-white border ${formik.touched.ownerName && formik.errors.ownerName ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'} rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
                />
              </div>
            </div>

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
                  className={`w-full pl-9 pr-3 py-2 bg-white border ${formik.touched.phone && formik.errors.phone ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'} rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">ID Verification Type</label>
              <select {...formik.getFieldProps('idType')} onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue('idFrontImage', null);
                formik.setFieldValue('idBackImage', null);
              }}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
              >
                <option value="Aadhaar Card">Aadhaar Card</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 flex flex-col">
                <label className={`flex-1 flex flex-col items-center justify-center py-2 px-2 border border-dashed rounded-md cursor-pointer hover:bg-slate-50 transition-all group text-center ${formik.touched.idFrontImage && formik.errors.idFrontImage ? 'border-red-400 bg-red-50/30' : 'border-slate-300 hover:border-blue-400'}`}>
                  <UploadCloud className={`w-4 h-4 ${formik.touched.idFrontImage && formik.errors.idFrontImage ? 'text-red-400' : 'text-slate-400'} group-hover:text-blue-500 mb-0.5`} />
                  <span className={`text-[10px] font-medium leading-tight ${formik.touched.idFrontImage && formik.errors.idFrontImage ? 'text-red-500' : 'text-slate-600'} group-hover:text-blue-600`}>
                    {formik.values.idFrontImage ? (formik.values.idFrontImage as File).name.substring(0,12)+'...' : "Front Side"}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => formik.setFieldValue('idFrontImage', e.target.files?.[0] || null)} />
                </label>
              </div>

              {['Aadhaar Card', 'Voter ID'].includes(formik.values.idType) && (
                <div className="flex-1 flex flex-col">
                  <label className={`flex-1 flex flex-col items-center justify-center py-2 px-2 border border-dashed rounded-md cursor-pointer hover:bg-slate-50 transition-all group text-center ${formik.touched.idBackImage && formik.errors.idBackImage ? 'border-red-400 bg-red-50/30' : 'border-slate-300 hover:border-blue-400'}`}>
                    <UploadCloud className={`w-4 h-4 ${formik.touched.idBackImage && formik.errors.idBackImage ? 'text-red-400' : 'text-slate-400'} group-hover:text-blue-500 mb-0.5`} />
                    <span className={`text-[10px] font-medium leading-tight ${formik.touched.idBackImage && formik.errors.idBackImage ? 'text-red-500' : 'text-slate-600'} group-hover:text-blue-600`}>
                      {formik.values.idBackImage ? (formik.values.idBackImage as File).name.substring(0,12)+'...' : "Back Side"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => formik.setFieldValue('idBackImage', e.target.files?.[0] || null)} />
                  </label>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Password
                  {formik.touched.password && formik.errors.password && <AlertCircle className="w-3 h-3 text-red-500 mt-0.5" />}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Lock className={`h-4 w-4 ${formik.touched.password && formik.errors.password ? 'text-red-400' : 'text-slate-400'} group-focus-within:text-blue-500`} />
                  </div>
                  <input type={showPassword ? "text" : "password"} {...formik.getFieldProps('password')} placeholder="Password" 
                    className={`w-full pl-8 pr-8 py-2 bg-white border ${formik.touched.password && formik.errors.password ? 'border-red-400' : 'border-slate-300'} rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  Confirm
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && <AlertCircle className="w-3 h-3 text-red-500 mt-0.5" />}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Lock className={`h-4 w-4 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'text-red-400' : 'text-slate-400'} group-focus-within:text-blue-500`} />
                  </div>
                  <input type={showConfirmPassword ? "text" : "password"} {...formik.getFieldProps('confirmPassword')} placeholder="Confirm" 
                    className={`w-full pl-8 pr-8 py-2 bg-white border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-400' : 'border-slate-300'} rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600">
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md transition-colors flex items-center justify-center gap-1.5 disabled:opacity-70"
            >
              {isLoading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : (
                <><span>Sign Up</span><ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-500 text-xs">
            Already have an account? <Link to="/vendor/login" className="text-blue-600 font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;
