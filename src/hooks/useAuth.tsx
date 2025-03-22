
import { useAuthContext } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useCallback } from 'react';
import { toast } from 'sonner';

export function useAuth() {
  const auth = useAuthContext();
  
  // Add a function to get the current authenticated user from Supabase
  const getAuthUser = useCallback(async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error getting auth user:", error);
    }
    return { user: data.user, error };
  }, []);
  
  // Add password recovery functionality
  const resetPassword = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/account?tab=contact-info`,
      });
      
      if (error) {
        toast.error(error.message || "Error al enviar el correo de recuperación");
        return { success: false, error };
      }
      
      toast.success("Se ha enviado un correo para recuperar tu contraseña");
      return { success: true, error: null };
    } catch (error: any) {
      toast.error(error.message || "Error al enviar el correo de recuperación");
      return { success: false, error };
    }
  }, []);
  
  return {
    ...auth,
    getAuthUser,
    resetPassword
  };
}
