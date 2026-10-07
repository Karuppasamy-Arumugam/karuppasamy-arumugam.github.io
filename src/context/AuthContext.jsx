import React, { createContext, useContext, useState } from 'react';
import { getSupabaseConfig } from '../utils/supabaseConfig';

const AuthContext = createContext();

const ACCESS_TOKEN_KEY = 'portfolio_admin_access_token';
const ADMIN_USER_KEY = 'portfolio_admin_user';

const isJwtExpired = (token) => {
  if (!token) return true;

  try {
    const payloadPart = token.split('.')[1];
    const normalized = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(normalized));
    return payload?.exp ? payload.exp * 1000 <= Date.now() : false;
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    const saved = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    if (!saved || isJwtExpired(saved)) {
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      return null;
    }
    return saved;
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem(ADMIN_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const { url, key } = getSupabaseConfig();
  const cloudConfigured = Boolean(url && key);
  const isAuthenticated = Boolean(accessToken && !isJwtExpired(accessToken));

  const login = async (email, password) => {
    if (!cloudConfigured) {
      throw new Error(
        'Cloud admin login is not configured yet. Add your Supabase URL and publishable key to .env.'
      );
    }

    if (!email?.includes('@')) {
      throw new Error('Please enter the email address configured for your Supabase admin user.');
    }

    const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        apikey: key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.trim(), password })
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok || !payload?.access_token) {
      throw new Error(payload?.msg || payload?.error_description || 'Invalid admin email or password.');
    }

    const user = {
      id: payload.user?.id,
      email: payload.user?.email || email.trim(),
      name: 'Karuppasamy A',
      role: 'Super Admin'
    };

    sessionStorage.setItem(ACCESS_TOKEN_KEY, payload.access_token);
    sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));

    setAccessToken(payload.access_token);
    setAdminUser(user);

    return { success: true, user };
  };

  const logout = async () => {
    try {
      if (cloudConfigured && accessToken) {
        await fetch(`${url}/auth/v1/logout`, {
          method: 'POST',
          headers: {
            apikey: key,
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
    } catch (error) {
      console.warn('Supabase logout request failed:', error);
    } finally {
      setAccessToken(null);
      setAdminUser(null);
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(ADMIN_USER_KEY);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        accessToken,
        cloudConfigured,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
