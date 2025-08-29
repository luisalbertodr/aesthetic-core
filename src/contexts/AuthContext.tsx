
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, type AuthUser } from '@/services/authService';
import { useSessionControl } from '@/hooks/useSessionControl';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isInactive: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Control de sesión por inactividad
  const { isInactive, resetActivityTimer } = useSessionControl({
    inactivityTimeout: 30 * 60 * 1000, // 30 minutos
    onSessionExpired: () => {
      console.log('Sesión expirada por inactividad');
    }
  });

  // Verificar usuario autenticado al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Verificando autenticación...');
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          console.log('Usuario autenticado:', currentUser.email);
        }
      } catch (error) {
        console.log('No hay usuario autenticado');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const loggedUser = await authService.login({ email, password });
      setUser(loggedUser);
      resetActivityTimer();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    setIsLoading(true);
    try {
      const newUser = await authService.register({ email, password, name });
      setUser(newUser);
      resetActivityTimer();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      await authService.loginWithGoogle();
      // El OAuth redirigirá, no necesitamos manejar el estado aquí
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetSession = (): void => {
    resetActivityTimer();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isInactive,
    login,
    register,
    loginWithGoogle,
    logout,
    resetSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
