import { createContext, useContext, useState, useCallback } from 'react';
import { AuthDialog } from './AuthDialog';
import { useAuth } from '@/hooks/useAuth';

type AuthDialogType = 'login' | 'register';

type AuthContextType = {
  isAuthOpen: boolean;
  authType: AuthDialogType;
  hasEnteredIdentifier: boolean;
  openAuth: (type?: AuthDialogType) => void;
  closeAuth: () => void;
  switchAuthType: (type: AuthDialogType) => void;
  setHasEnteredIdentifier: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authType, setAuthType] = useState<AuthDialogType>('login');
  const [hasEnteredIdentifier, setHasEnteredIdentifier] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);

  const openAuth = useCallback((type: AuthDialogType = 'login') => {
    setAuthType(type);
    setHasEnteredIdentifier(false);
    setDialogKey(prev => prev + 1);
    setIsAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  const switchAuthType = useCallback((type: AuthDialogType) => {
    setAuthType(type);
    setHasEnteredIdentifier(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthOpen,
        authType,
        hasEnteredIdentifier,
        openAuth,
        closeAuth,
        switchAuthType,
        setHasEnteredIdentifier,
      }}
    >
      {children}
      <AuthDialog key={dialogKey} isOpen={isAuthOpen} onClose={closeAuth} defaultType={authType} />
    </AuthContext.Provider>
  );
}

export function useAuthUI() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthUI must be used within an AuthProvider');
  }
  return context;
}
