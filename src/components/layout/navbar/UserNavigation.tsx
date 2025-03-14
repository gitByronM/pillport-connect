
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserContext } from '@/components/auth/UserProvider';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthDialog from '@/components/auth/AuthDialog';
import UserAvatar from '@/components/account/UserAvatar';

export default function UserNavigation() {
  const { openAuth } = useAuth();
  const { isLoggedIn, login } = useUserContext();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  // Fix for modal duplication bug - ensure dialog state is controlled here
  const handleOpenAuthDialog = (type: 'login' | 'register') => {
    // First close any existing dialog to prevent duplication
    setIsAuthDialogOpen(false);
    
    // Use setTimeout to ensure state is updated before opening new dialog
    setTimeout(() => {
      openAuth(type);
      setIsAuthDialogOpen(true);
    }, 10);
  };

  // For demo purposes - provides a quick way to "mock" login
  const handleQuickLogin = () => {
    login();
  };

  return (
    <div className="flex items-center space-x-3">
      {isLoggedIn ? (
        <UserAvatar />
      ) : (
        <>
          <div className="hidden md:flex space-x-2">
            <Button variant="outline" onClick={() => handleOpenAuthDialog('login')}>
              Iniciar sesión
            </Button>
            <Button onClick={() => handleOpenAuthDialog('register')}>
              Regístrate
            </Button>
            <Button variant="secondary" onClick={handleQuickLogin} size="sm">
              <User className="mr-1 h-4 w-4" />
              Demo Login
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center" 
              onClick={() => handleOpenAuthDialog('login')}
            >
              <User className="h-4 w-4 mr-2" />
              <span>Accede</span>
            </Button>
          </div>
          
          {/* Only render one instance of the dialog */}
          {isAuthDialogOpen && (
            <AuthDialog 
              isOpen={isAuthDialogOpen} 
              onClose={() => setIsAuthDialogOpen(false)} 
            />
          )}
        </>
      )}
    </div>
  );
}
