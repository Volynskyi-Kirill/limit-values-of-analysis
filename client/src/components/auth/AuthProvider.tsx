'use client';

import { Gender, LOCAL_STORAGE_KEYS } from '@/lib/constants';
import { createContext, useContext, useState, useEffect } from 'react';

export type User = {
  id: number;
  document: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  gender: Gender;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);

      if (token) {
        setIsAuthenticated(true);
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleSetUser = (user: User) => {
    setUser(user);
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        setUser: handleSetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
