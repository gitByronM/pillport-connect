
import { useEffect, useState } from 'react';
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
  
  // Close any existing dialog when component unmounts
  useEffect(() => {
    return () => {
      setIsAuthDialogOpen(false);
    };
  }, []);

  // Fix for modal duplication bug
  const handleOpenAuthDialog = (type: 'login' | 'register', e?: React.MouseEvent) => {
    // Prevent default form submission if this is triggered from a form button
    if (e) {
      e.preventDefault();
    }
    
    // First ensure any existing dialog is closed
    setIsAuthDialogOpen(false);
    
    // Use requestAnimationFrame to ensure state has time to update
    // before opening the new dialog
    requestAnimationFrame(() => {
      openAuth(type);
      setIsAuthDialogOpen(true);
    });
  };

  // For demo purposes - provides a quick way to "mock" login
  const handleQuickLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="flex items-center space-x-3">
      {isLoggedIn ? (
        <UserAvatar />
      ) : (
        <>
          <div className="hidden md:flex space-x-2">
            <Button 
              variant="outline" 
              onClick={(e) => handleOpenAuthDialog('login', e)}
            >
              Iniciar sesión
            </Button>
            <Button 
              onClick={(e) => handleOpenAuthDialog('register', e)}
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
              onClick={(e) => handleOpenAuthDialog('login', e)}
            >
              <User className="h-4 w-4 mr-2" />
              <span>Accede</span>
            </Button>
          </div>
          
          {/* Only render the dialog when isAuthDialogOpen is true */}
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
