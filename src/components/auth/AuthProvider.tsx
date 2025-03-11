
import { createContext, useContext, ReactNode, useState } from 'react';
import { useAuth as useAuthHook } from '@/hooks/useAuth';
import { AuthDialogType } from '@/types/auth';
import AuthDialog from './AuthDialog';

type AuthContextType = {
  openAuth: (type?: AuthDialogType) => void;
  closeAuth: () => void;
  isAuthenticated: boolean;
  user: any | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    isAuthOpen,
    authType,
    openAuth,
    closeAuth,
    switchAuthType
  } = useAuthHook();

  // Mock authentication state - in a real app, this would be connected to your backend
  const isAuthenticated = false;
  const user = null;

  const logout = () => {
    // In a real app, you would call your backend to log out
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ openAuth, closeAuth, isAuthenticated, user, logout }}>
      {children}
      <AuthDialog 
        isOpen={isAuthOpen} 
        onClose={closeAuth} 
        defaultType={authType} 
      />
    </AuthContext.Provider>
  );
};
