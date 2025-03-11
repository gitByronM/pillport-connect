
import { createContext, useContext, ReactNode, useState } from 'react';
import { AuthDialogType } from '@/types/auth';
import AuthDialog from './AuthDialog';

type AuthContextType = {
  isAuthOpen: boolean;
  authType: AuthDialogType;
  hasEnteredIdentifier: boolean;
  isAuthenticated: boolean;
  user: any | null;
  openAuth: (type?: AuthDialogType) => void;
  closeAuth: () => void;
  switchAuthType: (type: AuthDialogType) => void;
  setHasEnteredIdentifier: (value: boolean) => void;
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
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authType, setAuthType] = useState<AuthDialogType>('login');
  const [hasEnteredIdentifier, setHasEnteredIdentifier] = useState(false);

  // Mock authentication state - in a real app, this would be connected to your backend
  const isAuthenticated = false;
  const user = null;

  const openAuth = (type: AuthDialogType = 'login') => {
    setAuthType(type);
    setIsAuthOpen(true);
    setHasEnteredIdentifier(false);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const switchAuthType = (type: AuthDialogType) => {
    setAuthType(type);
    setHasEnteredIdentifier(false);
  };

  const logout = () => {
    // In a real app, you would call your backend to log out
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthOpen,
        authType,
        hasEnteredIdentifier,
        isAuthenticated,
        user,
        openAuth,
        closeAuth,
        switchAuthType,
        setHasEnteredIdentifier,
        logout
      }}
    >
      {children}
      <AuthDialog 
        isOpen={isAuthOpen} 
        onClose={closeAuth} 
        defaultType={authType} 
      />
    </AuthContext.Provider>
  );
};
