
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'reviewer' | 'user';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@fraudmonitor.com',
  role: 'admin',
  avatar: ''
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing user session in localStorage
    const checkAuth = () => {
      const savedUser = localStorage.getItem('fraudMonitorUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    
    // Simulate network delay
    setTimeout(checkAuth, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call and delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple validation for demo purposes
      if (email === 'admin@fraudmonitor.com' && password === 'password') {
        setUser(mockUser);
        localStorage.setItem('fraudMonitorUser', JSON.stringify(mockUser));
        toast.success("Login successful");
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError('An unknown error occurred');
        toast.error('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fraudMonitorUser');
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
