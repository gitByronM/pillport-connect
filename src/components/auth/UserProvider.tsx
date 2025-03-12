
import { createContext, useContext, ReactNode } from 'react';
import { useUser } from '@/hooks/useUser';
import { UserProfile, Address, Purchase, FavoriteItem } from '@/types/user';

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
