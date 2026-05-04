import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './customer/components/Header';
import Footer from './customer/components/Footer';

const VendorDashboard = React.lazy(() => import('./vendor/pages/VendorDashboard'));
const ManageServicesPage = React.lazy(() => import('./vendor/pages/ManageServicesPage'));
const BookingsPage = React.lazy(() => import('./vendor/pages/BookingsPage'));
const BookingDetailsPage = React.lazy(() => import('./vendor/pages/BookingDetailsPage'));
const ProfilePage = React.lazy(() => import('./vendor/pages/ProfilePage'));
const ReviewsPage = React.lazy(() => import('./vendor/pages/ReviewsPage'));
const VendorLoginPage = React.lazy(() => import('./vendor/auth/VendorLogin'));
const VendorSignupPage = React.lazy(() => import('./vendor/auth/VendorSignup'));
const VendorOtpPage = React.lazy(() => import('./vendor/auth/VendorOtp'));


// Lazy Load Pages
const HomePage = React.lazy(() => import('./customer/pages/HomePage'));
const ShopDetailsPage = React.lazy(() => import('./customer/pages/ShopDetailsPage'));
const BookingPage = React.lazy(() => import('./customer/pages/BookingPage'));
const CustomerProfilePage = React.lazy(() => import('./customer/pages/CustomerProfilePage'));
const CustomerLoginPage = React.lazy(() => import('./customer/pages/CustomerLoginPage'));
const CustomerSignupPage = React.lazy(() => import('./customer/pages/CustomerSignupPage'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-10 h-10 border-4 border-slate-100 border-t-brand rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Router>
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1e293b',
            border: '1px solid #e2e8f0',
            fontWeight: '500',
            fontSize: '14px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        }} 
      />
      <React.Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Customer Auth Routes */}
          <Route path="/login" element={<CustomerLoginPage />} />
          <Route path="/signup" element={<CustomerSignupPage />} />


          {/* Customer Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop/:id" element={<ShopDetailsPage />} />
          <Route path="/checkout" element={<BookingPage />} />
          <Route path="/profile" element={<CustomerProfilePage />} />
          
          {/* Vendor Auth Routes */}
          <Route path="/vendor/login" element={<VendorLoginPage />} />
          <Route path="/vendor/signup" element={<VendorSignupPage />} />
          <Route path="/vendor/otp" element={<VendorOtpPage />} />
          
          {/* Vendor Routes */}
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/vendor/services" element={<ManageServicesPage />} />
          <Route path="/vendor/bookings" element={<BookingsPage />} />
          <Route path="/vendor/bookings/:id" element={<BookingDetailsPage />} />
          <Route path="/vendor/profile" element={<ProfilePage />} />
          <Route path="/vendor/reviews" element={<ReviewsPage />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;

