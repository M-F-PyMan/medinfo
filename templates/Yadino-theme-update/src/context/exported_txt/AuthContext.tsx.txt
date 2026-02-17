import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  purchasedCourses: string[];
}

interface AuthContextType {
  user: User | null;
  login: (phone: string) => Promise<boolean>;
  register: (phone: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (phone: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    if (phone) {
      setUser({
        id: '1',
        name: 'کاربر جدید',
        email: 'user@example.com',
        phone: phone,
        purchasedCourses: ['1', '3']
      });
      return true;
    }
    return false;
  };

  const register = async (phone: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful registration
    if (phone) {
      setUser({
        id: '1',
        name: 'کاربر جدید',
        email: 'user@example.com',
        phone: phone,
        purchasedCourses: []
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}