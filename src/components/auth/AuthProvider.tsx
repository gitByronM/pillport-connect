
import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
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
  const [dialogKey, setDialogKey] = useState(0); // Add a key to force re-render

  // Mock authentication state - in a real app, this would be connected to your backend
  const isAuthenticated = false;
  const user = null;

  // Memoize functions to prevent recreating them on each render
  const openAuth = useCallback((type: AuthDialogType = 'login') => {
    // First ensure any existing dialog is closed
    setIsAuthOpen(false);
    
    // Update dialog type and reset identifier state
    setAuthType(type);
    setHasEnteredIdentifier(false);
    
    // Use setTimeout to ensure state updates before opening
    setTimeout(() => {
      setDialogKey(prev => prev + 1); // Generate a new key for the dialog
      setIsAuthOpen(true);
    }, 0);
  }, []);

  const closeAuth = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  const switchAuthType = useCallback((type: AuthDialogType) => {
    setAuthType(type);
    setHasEnteredIdentifier(false);
  }, []);

  const logout = useCallback(() => {
    // In a real app, you would call your backend to log out
    console.log('User logged out');
  }, []);

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
      {/* Use key to force re-create dialog component when needed */}
      <AuthDialog 
        key={dialogKey}
        isOpen={isAuthOpen} 
        onClose={closeAuth} 
        defaultType={authType} 
      />
    </AuthContext.Provider>
  );
};
