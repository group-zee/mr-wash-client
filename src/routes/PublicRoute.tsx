import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageLoader from './PageLoader';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <PageLoader />;

  if (isAuthenticated) {
    return <Navigate to={user?.role === 'vendor' ? '/vendor' : '/home'} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
