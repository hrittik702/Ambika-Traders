import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-mono-950 text-mono-0 flex flex-col items-center justify-center space-y-4 font-intern">
        <Loader2 className="w-8 h-8 animate-spin text-mono-300" aria-hidden="true" />
        <span className="font-mono text-xs text-mono-400 uppercase tracking-widest">
          [VERIFYING ADMIN AUTHENTICATION]
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
