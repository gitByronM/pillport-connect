
import { useState, useEffect } from 'react';
import { UserProfile, Address, Purchase, FavoriteItem } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';

// Local storage keys
const STORAGE_KEYS = {
  isLoggedIn: 'ft_is_logged_in',
  userProfile: 'ft_user_profile',
  addresses: 'ft_addresses',
  purchases: 'ft_purchases',
  favorites: 'ft_favorites'
};

export function useUser() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Initialize state from localStorage only if logged in and no active session
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem(STORAGE_KEYS.isLoggedIn) === 'true';
    setIsLoggedIn(storedIsLoggedIn);

    if (storedIsLoggedIn) {
      // Load user data from localStorage if it exists
      const storedUserProfile = localStorage.getItem(STORAGE_KEYS.userProfile);
      const storedAddresses = localStorage.getItem(STORAGE_KEYS.addresses);
      const storedPurchases = localStorage.getItem(STORAGE_KEYS.purchases);
      const storedFavorites = localStorage.getItem(STORAGE_KEYS.favorites);

      // Set user profile
      if (storedUserProfile) {
        setUserProfile(JSON.parse(storedUserProfile));
      }

      // Set addresses
      if (storedAddresses) {
        setAddresses(JSON.parse(storedAddresses));
      } else {
        setAddresses([]);
      }

      // Set purchases
      if (storedPurchases) {
        setPurchases(JSON.parse(storedPurchases));
      } else {
        setPurchases([]);
      }

      // Set favorites
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites([]);
      }
    }
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.isLoggedIn, isLoggedIn.toString());
    
    if (isLoggedIn) {
      if (userProfile) {
        localStorage.setItem(STORAGE_KEYS.userProfile, JSON.stringify(userProfile));
      }
      localStorage.setItem(STORAGE_KEYS.addresses, JSON.stringify(addresses));
      localStorage.setItem(STORAGE_KEYS.purchases, JSON.stringify(purchases));
      localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
    }
  }, [isLoggedIn, userProfile, addresses, purchases, favorites]);

  // Login function
  const login = () => {
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setAddresses([]);
    setPurchases([]);
    setFavorites([]);
    
    // Clear local storage to prevent mock data from being loaded
    localStorage.removeItem(STORAGE_KEYS.isLoggedIn);
    localStorage.removeItem(STORAGE_KEYS.userProfile);
    localStorage.removeItem(STORAGE_KEYS.addresses);
    localStorage.removeItem(STORAGE_KEYS.purchases);
    localStorage.removeItem(STORAGE_KEYS.favorites);
  };

  // Update user profile
  const updateUserProfile = (updatedProfile: Partial<UserProfile>) => {
    if (userProfile) {
      const newProfile = { ...userProfile, ...updatedProfile };
      setUserProfile(newProfile);
    } else {
      setUserProfile(updatedProfile as UserProfile);
    }
  };

  // Add new address
  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress = { ...address, id: `${addresses.length + 1}` };
    
    // If this is the first address or isDefault is true, make it the default
    if (addresses.length === 0 || address.isDefault) {
      // Update all other addresses to not be default
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: false
      }));
      setAddresses([...updatedAddresses, newAddress]);
    } else {
      setAddresses([...addresses, newAddress]);
    }
  };

  // Update existing address
  const updateAddress = (id: string, updatedAddress: Partial<Address>) => {
    const updatedAddresses = addresses.map(address => {
      if (address.id === id) {
        return { ...address, ...updatedAddress };
      }
      // If setting this address as default, remove default from others
      if (updatedAddress.isDefault && updatedAddress.isDefault === true) {
        return { ...address, isDefault: address.id === id };
      }
      return address;
    });
    setAddresses(updatedAddresses);
  };

  // Remove address
  const removeAddress = (id: string) => {
    const filteredAddresses = addresses.filter(address => address.id !== id);
    
    // If we removed the default address and have other addresses, make the first one default
    if (addresses.find(a => a.id === id)?.isDefault && filteredAddresses.length > 0) {
      filteredAddresses[0].isDefault = true;
    }
    
    setAddresses(filteredAddresses);
  };

  // Add to favorites
  const addToFavorites = (item: Omit<FavoriteItem, 'id'>) => {
    const newItem = { ...item, id: `${favorites.length + 1}` };
    setFavorites([...favorites, newItem]);
  };

  // Remove from favorites
  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return {
    isLoggedIn,
    userProfile,
    addresses,
    purchases,
    favorites,
    login,
    logout,
    updateUserProfile,
    addAddress,
    updateAddress,
    removeAddress,
    addToFavorites,
    removeFromFavorites
  };
}
