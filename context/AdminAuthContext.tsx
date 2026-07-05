import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const SESSION_KEY = 'qibla_admin_session';
const PASSWORD_KEY = 'qibla_admin_pwd';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'qibla-admin';

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

function readSession(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(readSession);

  const login = useCallback((password: string) => {
    if (password !== ADMIN_PASSWORD) return false;
    sessionStorage.setItem(SESSION_KEY, '1');
    sessionStorage.setItem(PASSWORD_KEY, password);
    setIsAuthenticated(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(PASSWORD_KEY);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
