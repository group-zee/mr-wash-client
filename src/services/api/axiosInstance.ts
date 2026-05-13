import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Crucial for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// We no longer need to manually attach tokens from localStorage 
// because HTTP-only cookies are handled by the browser.

export default axiosInstance;
