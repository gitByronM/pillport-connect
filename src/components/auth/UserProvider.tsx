
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { UserProfile, Address, Purchase, FavoriteItem } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Listen for auth state changes and sync with user context
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && session?.user) {
          try {
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
              toast({
                title: "Sesión iniciada",
                description: `Bienvenido ${userProfile.name}`,
              });
            }
          } catch (error) {
            console.error('Error syncing user data:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          // If a user signs out through Supabase, also log them out from the user context
          userState.logout();
          toast({
            title: "Sesión cerrada",
            description: "Has cerrado sesión exitosamente",
          });
        }
        
        // Mark initialization as complete after auth state is handled
        if (!isInitialized) {
          setIsInitialized(true);
        }
      }
    );

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [userState, toast, isInitialized]);

  // On initial load, check for existing session
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user && !userState.userProfile) {
        const userData = data.session.user.user_metadata;
        if (userData) {
          const userProfile: UserProfile = {
            id: data.session.user.id,
            name: userData.first_name || '',
            surname: userData.last_name || '',
            email: data.session.user.email || '',
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
      }
      setIsInitialized(true);
    };
    
    checkSession();
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
