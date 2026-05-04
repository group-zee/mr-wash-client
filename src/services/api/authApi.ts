import axiosInstance from './axiosInstance';

export const authApi = {
  // Customer Signup
  signup: async (data: any) => {
    const response = await axiosInstance.post('/auth/signup', data);
    return response.data;
  },

  // Customer Login
  login: async (data: any) => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  },

  // Verify OTP
  verifyOTP: async (data: { phoneNumber: string; otp: string }) => {
    const response = await axiosInstance.post('/auth/verify-otp', data);
    return response.data;
  },
};
