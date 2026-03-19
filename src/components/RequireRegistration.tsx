import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireRegistration({ children }: { children: ReactNode }) {
  const location = useLocation();
  const registered = (() => {
    try {
      return localStorage.getItem('gs.registered') === '1';
    } catch {
      return false;
    }
  })();

  if (registered) return <>{children}</>;

  // Always allow the marketing landing page and the registration flow.
  if (location.pathname === '/register' || location.pathname === '/') return <>{children}</>;

  return <Navigate to="/register" replace state={{ from: location.pathname }} />;
}

