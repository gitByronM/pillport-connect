
import { useAuthContext } from '@/components/auth/AuthProvider';

export function useAuth() {
  const auth = useAuthContext();
  return auth;
}
