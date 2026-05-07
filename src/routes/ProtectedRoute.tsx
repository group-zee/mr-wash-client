import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageLoader from './PageLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'customer' | 'vendor';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role = 'customer' }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <PageLoader />;

  if (!isAuthenticated) {
    return <Navigate to={role === 'vendor' ? '/vendor/login' : '/customer/login'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
