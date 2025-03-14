
import { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import PasswordRecoveryForm from "./PasswordRecoveryForm";
import { X } from "lucide-react";

type AuthDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'login' | 'register' | 'recovery';
};

export default function AuthDialog({
  isOpen,
  onClose,
  defaultType = 'login',
}: AuthDialogProps) {
  const {
    authType,
    hasEnteredIdentifier,
    setHasEnteredIdentifier,
    switchAuthType,
  } = useAuth();
  
  // Ensure we clean up when dialog closes
  useEffect(() => {
    if (!isOpen) {
      // Reset state when dialog is closed
      setHasEnteredIdentifier(false);
    }
  }, [isOpen, setHasEnteredIdentifier]);

  const handleSwitchToLogin = () => {
    switchAuthType('login');
    setHasEnteredIdentifier(false);
  };

  const handleSwitchToRegister = () => {
    switchAuthType('register');
  };

  const handleSwitchToRecovery = () => {
    switchAuthType('recovery');
  };

  const handleAuthSuccess = () => {
    // In a real app, you might want to redirect or show a success message
    console.log('Authentication successful');
    onClose();
  };

  const getTitleText = () => {
    switch(authType) {
      case 'login': return 'Iniciar sesión';
      case 'register': return 'Registro de usuario';
      case 'recovery': return 'Recuperar contraseña';
      default: return 'Autenticación';
    }
  };

  // Use the hideCloseButton prop to manage our own close button
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto" hideCloseButton>
        <DialogTitle className="sr-only">{getTitleText()}</DialogTitle>
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {authType === 'login' && (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            onSwitchToRecovery={handleSwitchToRecovery}
            onLoginSuccess={handleAuthSuccess}
            hasEnteredIdentifier={hasEnteredIdentifier}
            setHasEnteredIdentifier={setHasEnteredIdentifier}
          />
        )}

        {authType === 'register' && (
          <RegisterForm
            onSwitchToLogin={handleSwitchToLogin}
            onRegisterSuccess={handleAuthSuccess}
          />
        )}

        {authType === 'recovery' && (
          <PasswordRecoveryForm
            onSwitchToLogin={handleSwitchToLogin}
            onRecoverySuccess={handleAuthSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
