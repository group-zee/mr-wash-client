import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ShieldCheck, KeyRound, Timer } from 'lucide-react';
import toast from 'react-hot-toast';
import { authApi } from '../../services/api/authApi';
import { useAuth } from '../../context/AuthContext';

const CustomerOtpPage: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { login } = useAuth();
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber;

  useEffect(() => {
    if (!phoneNumber) {
      toast.error("Invalid session. Please signup again.");
      navigate('/customer/signup');
      return;
    }

    let interval: any;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, canResend, phoneNumber, navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await authApi.verifyOTP({
        phoneNumber: phoneNumber,
        otp: code
      });
      
      login(response.data.customer);
      
      toast.success('Mobile verified successfully! Welcome to Mr. Wash.');
      navigate('/home');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      newOtp[index] = char;
    });
    setOtp(newOtp);
    
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const resendOtp = async () => {
    if (!canResend) return;
    
    setIsLoading(true);
    try {
      await authApi.sendOTP(phoneNumber);
      toast.success('A new OTP has been sent to your mobile number.');
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-white font-sans text-slate-600 overflow-hidden">
      
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
            <KeyRound className="w-3.5 h-3.5 text-blue-200" />
            <span>Secure Access</span>
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
            One step away <br />
            <span className="text-blue-200">from clean clothes.</span>
          </h1>
          <p className="text-sm text-blue-100 max-w-sm font-medium leading-relaxed">
            Verify your mobile number to complete your registration and start booking our premium laundry services.
          </p>
        </div>
      </div>

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

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-slate-900">Verify Mobile</h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              We've sent a 6-digit verification code to <span className="font-bold text-slate-700">+{phoneNumber}</span>.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">Enter OTP Code</label>
                {timer > 0 && (
                  <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs bg-blue-50 px-2 py-1 rounded-md">
                    <Timer className="w-3 h-3" />
                    <span>00:{timer < 10 ? `0${timer}` : timer}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2 justify-between" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-center text-xl font-bold shadow-sm"
                  />
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || otp.join('').length < 6}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-100"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Verify Mobile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center flex flex-col gap-2">
            <p className="text-slate-500 text-xs font-medium">
              Didn't receive the code?
            </p>
            <button 
              type="button" 
              onClick={resendOtp} 
              disabled={!canResend || isLoading}
              className={`font-bold text-sm transition-colors ${canResend ? 'text-blue-600 hover:text-blue-800' : 'text-slate-300 cursor-not-allowed'}`}
            >
              {canResend ? 'Resend OTP Now' : `Resend in ${timer}s`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOtpPage;
