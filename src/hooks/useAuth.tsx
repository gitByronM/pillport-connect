
import { useState } from 'react';
import { AuthDialogType } from '@/types/auth';

export function useAuth() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authType, setAuthType] = useState<AuthDialogType>('login');
  const [hasEnteredIdentifier, setHasEnteredIdentifier] = useState(false);

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

  return {
    isAuthOpen,
    authType,
    hasEnteredIdentifier,
    setHasEnteredIdentifier,
    openAuth,
    closeAuth,
    switchAuthType,
  };
}
