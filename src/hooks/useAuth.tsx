
import { useAuthContext } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

export function useAuth() {
  const auth = useAuthContext();
  
  // Add a function to get the current authenticated user from Supabase
  const getAuthUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    return { user: data.user, error };
  };
  
  return {
    ...auth,
    getAuthUser
  };
}
