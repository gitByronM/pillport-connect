
import { useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserContext } from '@/components/auth/UserProvider';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/account/UserAvatar';

export default function UserNavigation() {
  const { openAuth, closeAuth } = useAuth();
  const { isLoggedIn, login } = useUserContext();
  
  // Clean up any auth dialogs when component unmounts
  useEffect(() => {
    return () => {
      closeAuth();
    };
  }, [closeAuth]);

  // Memoized handlers to prevent recreating functions on each render
  const handleOpenAuth = useCallback((type: 'login' | 'register', e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation(); // Stop event propagation to prevent bubbling
    }
    
    // Use a timeout to ensure any existing operations are complete
    setTimeout(() => {
      openAuth(type);
    }, 0);
  }, [openAuth]);

  // For demo purposes - provides a quick way to "mock" login
  const handleQuickLogin = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    login();
  }, [login]);

  return (
    <div className="flex items-center space-x-3">
      {isLoggedIn ? (
        <UserAvatar />
      ) : (
        <>
          <div className="hidden md:flex space-x-2">
            <Button 
              variant="outline" 
              onClick={(e) => handleOpenAuth('login', e)}
            >
              Iniciar sesión
            </Button>
            <Button 
              onClick={(e) => handleOpenAuth('register', e)}
            >
              Regístrate
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleQuickLogin} 
              size="sm"
            >
              <User className="mr-1 h-4 w-4" />
              Demo Login
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center" 
              onClick={(e) => handleOpenAuth('login', e)}
            >
              <User className="h-4 w-4 mr-2" />
              <span>Accede</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
