import type { SignupFormData, User } from "../types";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@lib/api/client";

interface AuthContextType {
  user: User | null;
  login: (name: string, password: string) => Promise<void>;
  register: (signupData: SignupFormData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data } = await api.get('/me');
      setUser(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (name: string, password: string) => {
    const { data } = await api.post('/login', { name, password });
    setUser(data.user);
  };

  const register = async (signupData: SignupFormData) => {
    const { data } = await api.post('/signup', signupData);
    setUser(data.user);
  };

  const logout = async () => {
    const { data } = await api.get('/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        isAuthenticated: !!user
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
}