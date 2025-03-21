
import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { UserProfile, Address, Purchase, FavoriteItem } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';

interface UserContextType {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  addresses: Address[];
  purchases: Purchase[];
  favorites: FavoriteItem[];
  login: () => void;
  logout: () => void;
  updateUserProfile: (updatedProfile: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, updatedAddress: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  addToFavorites: (item: Omit<FavoriteItem, 'id'>) => void;
  removeFromFavorites: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const userState = useUser();
  
  // Listen for auth state changes and sync with user context
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // If a user signs in through Supabase, also log them in to the user context
          const userData = session.user.user_metadata;
          if (userData) {
            // Format user metadata from Supabase to match our UserProfile structure
            const userProfile: UserProfile = {
              id: session.user.id,
              name: userData.first_name || '',
              surname: userData.last_name || '',
              email: session.user.email || '',
              phoneCountryCode: '+58',
              phonePrefix: userData.phone?.split('-')[0] || '0412',
              phoneNumber: userData.phone?.split('-')[1] || '',
              idType: userData.idType || 'CÉDULA DE IDENTIDAD',
              documentNumber: userData.documentNumber || '',
              gender: userData.gender as 'male' | 'female',
              avatarUrl: '/lovable-uploads/4265f32c-8521-4ac5-b03c-473b75811c78.png'
            };
            userState.login();
            userState.updateUserProfile(userProfile);
          }
        } else if (event === 'SIGNED_OUT') {
          // If a user signs out through Supabase, also log them out from the user context
          userState.logout();
        }
      }
    );

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [userState]);

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
