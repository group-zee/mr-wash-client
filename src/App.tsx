import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './customer/components/Header';
import Footer from './customer/components/Footer';

// Lazy Load Pages
const HomePage = React.lazy(() => import('./customer/pages/HomePage'));
const ShopDetailsPage = React.lazy(() => import('./customer/pages/ShopDetailsPage'));
const BookingPage = React.lazy(() => import('./customer/pages/BookingPage'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-10 h-10 border-4 border-slate-100 border-t-brand rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Router>
      <React.Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop/:id" element={<ShopDetailsPage />} />
          <Route path="/checkout" element={<BookingPage />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
