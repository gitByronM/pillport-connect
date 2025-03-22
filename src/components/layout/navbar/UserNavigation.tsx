
import { useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserContext } from '@/components/auth/UserProvider';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/account/UserAvatar';
import { useNavigate } from 'react-router-dom';

export default function UserNavigation() {
  const { openAuth, closeAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
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

  // Handle account navigation
  const handleAccountNavigation = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/account');
  }, [navigate]);

  return (
    <div className="flex items-center space-x-3">
      {isAuthenticated ? (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleAccountNavigation}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Mi Cuenta</span>
          </Button>
          <UserAvatar />
        </div>
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
          </div>
          
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center" 
              onClick={(e) => handleOpenAuth('login', e)}
            >
              <span>Accede</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
