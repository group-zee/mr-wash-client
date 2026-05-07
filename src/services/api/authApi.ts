import axiosInstance from './axiosInstance';

export const authApi = {
  // Customer
  signup: async (data: any) => {
    const response = await axiosInstance.post('/auth/signup', data);
    return response.data;
  },
  login: async (data: any) => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  },

  // Vendor
  vendorSignup: async (data: any) => {
    const response = await axiosInstance.post('/auth/vendor/signup', data);
    return response.data;
  },
  vendorLogin: async (data: any) => {
    const response = await axiosInstance.post('/auth/vendor/login', data);
    return response.data;
  },

  // Shared
  verifyOTP: async (data: { phoneNumber: string; otp: string; userType?: 'customer' | 'vendor' }) => {
    const response = await axiosInstance.post('/auth/verify-otp', data);
    return response.data;
  },
  sendOTP: async (phoneNumber: string) => {
    const response = await axiosInstance.post('/auth/send-otp', { phoneNumber });
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },
};
