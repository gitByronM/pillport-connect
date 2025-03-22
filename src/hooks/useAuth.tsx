
import { useAuthContext } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useCallback } from 'react';

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
  
  return {
    ...auth,
    getAuthUser
  };
}
