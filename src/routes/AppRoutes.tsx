import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import PageLoader from './PageLoader';

// Lazy Load Pages
const LandingPage = lazy(() => import('../shared/pages/LandingPage'));
const HomePage = lazy(() => import('../customer/pages/HomePage'));
const ShopDetailsPage = lazy(() => import('../customer/pages/ShopDetailsPage'));
const BookingPage = lazy(() => import('../customer/pages/BookingPage'));
const CustomerProfilePage = lazy(() => import('../customer/pages/CustomerProfilePage'));
const CustomerLoginPage = lazy(() => import('../customer/pages/CustomerLoginPage'));
const CustomerSignupPage = lazy(() => import('../customer/pages/CustomerSignupPage'));
const CustomerOtpPage = lazy(() => import('../customer/pages/CustomerOtpPage'));

// Vendor Pages
const VendorDashboard = lazy(() => import('../vendor/pages/VendorDashboard'));
const ManageServicesPage = lazy(() => import('../vendor/pages/ManageServicesPage'));
const BookingsPage = lazy(() => import('../vendor/pages/BookingsPage'));
const BookingDetailsPage = lazy(() => import('../vendor/pages/BookingDetailsPage'));
const ProfilePage = lazy(() => import('../vendor/pages/ProfilePage'));
const ReviewsPage = lazy(() => import('../vendor/pages/ReviewsPage'));
const VendorLoginPage = lazy(() => import('../vendor/auth/VendorLogin'));
const VendorSignupPage = lazy(() => import('../vendor/auth/VendorSignup'));
const VendorOtpPage = lazy(() => import('../vendor/auth/VendorOtp'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Customer Auth Routes */}
        <Route path="/customer/login" element={<PublicRoute><CustomerLoginPage /></PublicRoute>} />
        <Route path="/customer/signup" element={<PublicRoute><CustomerSignupPage /></PublicRoute>} />
        <Route path="/customer/otp" element={<PublicRoute><CustomerOtpPage /></PublicRoute>} />

        {/* Protected Customer Routes */}
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/shop/:id" element={<ProtectedRoute><ShopDetailsPage /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><CustomerProfilePage /></ProtectedRoute>} />
        
        {/* Vendor Auth Routes */}
        <Route path="/vendor/login" element={<PublicRoute><VendorLoginPage /></PublicRoute>} />
        <Route path="/vendor/signup" element={<PublicRoute><VendorSignupPage /></PublicRoute>} />
        <Route path="/vendor/otp" element={<PublicRoute><VendorOtpPage /></PublicRoute>} />
        
        {/* Protected Vendor Routes */}
        <Route path="/vendor" element={<ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute>} />
        <Route path="/vendor/services" element={<ProtectedRoute role="vendor"><ManageServicesPage /></ProtectedRoute>} />
        <Route path="/vendor/bookings" element={<ProtectedRoute role="vendor"><BookingsPage /></ProtectedRoute>} />
        <Route path="/vendor/bookings/:id" element={<ProtectedRoute role="vendor"><BookingDetailsPage /></ProtectedRoute>} />
        <Route path="/vendor/profile" element={<ProtectedRoute role="vendor"><ProfilePage /></ProtectedRoute>} />
        <Route path="/vendor/reviews" element={<ProtectedRoute role="vendor"><ReviewsPage /></ProtectedRoute>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
