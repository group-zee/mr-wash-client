import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './customer/pages/HomePage';
import ShopDetailsPage from './customer/pages/ShopDetailsPage';
import VendorDashboard from './vendor/pages/VendorDashboard';
import ManageServicesPage from './vendor/pages/ManageServicesPage';
import BookingsPage from './vendor/pages/BookingsPage';
import BookingDetailsPage from './vendor/pages/BookingDetailsPage';
import ProfilePage from './vendor/pages/ProfilePage';
import ReviewsPage from './vendor/pages/ReviewsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop/:id" element={<ShopDetailsPage />} />
        
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
    </Router>
  );
}

export default App;

