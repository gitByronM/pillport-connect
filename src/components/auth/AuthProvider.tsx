
import { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { AuthDialogType } from '@/types/auth';
import AuthDialog from './AuthDialog';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  isAuthOpen: boolean;
  authType: AuthDialogType;
  hasEnteredIdentifier: boolean;
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  openAuth: (type?: AuthDialogType) => void;
  closeAuth: () => void;
  switchAuthType: (type: AuthDialogType) => void;
  setHasEnteredIdentifier: (value: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  signUp: (formData: any) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check for session on initial load
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          // Close auth dialog when signed in
          setIsAuthOpen(false);
          toast({
            title: "Inicio de sesión exitoso",
            description: "Bienvenido a Mi farmatodo",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Sesión cerrada",
            description: "Has cerrado sesión exitosamente",
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

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

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Por favor intenta de nuevo",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const signUp = useCallback(async (formData: any) => {
    try {
      setLoading(true);
      
      // Format the phone with prefix
      const phone = formData.phonePrefix 
        ? `${formData.phonePrefix}-${formData.phoneNumber}` 
        : formData.phoneNumber;
      
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.name,
            last_name: formData.surname,
            phone: phone,
            gender: formData.gender,
            idType: formData.idType,
            documentNumber: formData.documentNumber,
          },
        }
      });

      if (error) throw error;
      
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada exitosamente",
      });
    } catch (error: any) {
      toast({
        title: "Error al registrar",
        description: error.message || "Por favor intenta de nuevo",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error al cerrar sesión",
        description: error.message || "Por favor intenta de nuevo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthOpen,
        authType,
        hasEnteredIdentifier,
        isAuthenticated: !!user,
        user,
        session,
        openAuth,
        closeAuth,
        switchAuthType,
        setHasEnteredIdentifier,
        login,
        signUp,
        logout,
        loading
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
