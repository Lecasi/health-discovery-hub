
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './use-toast';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would validate the token with your backend
        const userData = localStorage.getItem('doctordicas_user');
        
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to restore authentication state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, this would call your auth API
    setIsLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        // Simple validation for demo purposes
        if (email === 'demo@example.com' && password === 'password') {
          const userData: User = {
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Demo+User'
          };
          
          localStorage.setItem('doctordicas_user', JSON.stringify(userData));
          setUser(userData);
          setIsLoading(false);
          resolve();
        } else {
          // Check if user exists in localStorage from registration
          const registeredUsers = JSON.parse(localStorage.getItem('doctordicas_registered_users') || '[]');
          const foundUser = registeredUsers.find((u: any) => u.email === email && u.password === password);
          
          if (foundUser) {
            const userData: User = {
              id: foundUser.id,
              name: foundUser.name,
              email: foundUser.email,
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(foundUser.name)}`
            };
            
            localStorage.setItem('doctordicas_user', JSON.stringify(userData));
            setUser(userData);
            setIsLoading(false);
            resolve();
          } else {
            setIsLoading(false);
            reject(new Error('Invalid credentials'));
          }
        }
      }, 1000);
    });
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would call your auth API
    setIsLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        // Get existing registered users
        const registeredUsers = JSON.parse(localStorage.getItem('doctordicas_registered_users') || '[]');
        
        // Check if email already exists
        if (registeredUsers.some((user: any) => user.email === email)) {
          setIsLoading(false);
          reject(new Error('Email already exists'));
          return;
        }
        
        // Create new user
        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          password, // Never store plaintext passwords in a real app!
          createdAt: new Date().toISOString()
        };
        
        // Save user to "database"
        localStorage.setItem('doctordicas_registered_users', JSON.stringify([...registeredUsers, newUser]));
        
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('doctordicas_user');
    setUser(null);
    
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado com sucesso.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy context use
export const useAuth = () => useContext(AuthContext);
