
import { useState, useEffect } from 'react';
import { UserProfile, Address, Purchase, FavoriteItem } from '@/types/user';

// Mock data
const mockUserProfile: UserProfile = {
  id: '1',
  name: 'Byron',
  surname: 'Miranda',
  email: 'byronmiranda0401@gmail.com',
  phoneCountryCode: '+58',
  phonePrefix: '0412',
  phoneNumber: '5002930',
  idType: 'CÉDULA DE IDENTIDAD',
  documentNumber: '29685540',
  gender: 'male',
  avatarUrl: '/lovable-uploads/4265f32c-8521-4ac5-b03c-473b75811c78.png'
};

const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'Casa',
    street: 'Av. Principal, Res. Las Mercedes',
    city: 'Caracas',
    state: 'Distrito Capital',
    zipCode: '1080',
    isDefault: true
  },
  {
    id: '2',
    name: 'Trabajo',
    street: 'Calle El Recreo, Edificio Delta',
    city: 'Caracas',
    state: 'Distrito Capital',
    zipCode: '1050',
    isDefault: false
  }
];

const mockPurchases: Purchase[] = [
  {
    id: '1',
    date: '2023-11-15',
    total: 45.99,
    status: 'delivered',
    orderNumber: 'FT-2023110001',
    items: [
      {
        id: '1-1',
        name: 'Acetaminofén 500mg',
        price: 15.99,
        quantity: 2,
        imageUrl: '/placeholder.svg'
      },
      {
        id: '1-2',
        name: 'Vitamina C 1000mg',
        price: 14.01,
        quantity: 1,
        imageUrl: '/placeholder.svg'
      }
    ]
  },
  {
    id: '2',
    date: '2023-10-20',
    total: 32.50,
    status: 'completed',
    orderNumber: 'FT-2023100022',
    items: [
      {
        id: '2-1',
        name: 'Crema Hidratante',
        price: 22.50,
        quantity: 1,
        imageUrl: '/placeholder.svg'
      },
      {
        id: '2-2',
        name: 'Protector Solar SPF 50',
        price: 10.00,
        quantity: 1,
        imageUrl: '/placeholder.svg'
      }
    ]
  }
];

const mockFavorites: FavoriteItem[] = [
  {
    id: '1',
    name: 'Crema Hidratante Eucerin',
    price: 25.99,
    imageUrl: '/placeholder.svg',
    inStock: true
  },
  {
    id: '2',
    name: 'Vitamina D3 2000UI',
    price: 12.50,
    imageUrl: '/placeholder.svg',
    inStock: true
  },
  {
    id: '3',
    name: 'Protector Solar Neutrogena',
    price: 18.75,
    imageUrl: '/placeholder.svg',
    inStock: false
  }
];

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

  // Initialize state from localStorage
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
      } else {
        setUserProfile(mockUserProfile);
        localStorage.setItem(STORAGE_KEYS.userProfile, JSON.stringify(mockUserProfile));
      }

      // Set addresses
      if (storedAddresses) {
        setAddresses(JSON.parse(storedAddresses));
      } else {
        setAddresses(mockAddresses);
        localStorage.setItem(STORAGE_KEYS.addresses, JSON.stringify(mockAddresses));
      }

      // Set purchases
      if (storedPurchases) {
        setPurchases(JSON.parse(storedPurchases));
      } else {
        setPurchases(mockPurchases);
        localStorage.setItem(STORAGE_KEYS.purchases, JSON.stringify(mockPurchases));
      }

      // Set favorites
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites(mockFavorites);
        localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(mockFavorites));
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
    setUserProfile(mockUserProfile);
    setAddresses(mockAddresses);
    setPurchases(mockPurchases);
    setFavorites(mockFavorites);
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setAddresses([]);
    setPurchases([]);
    setFavorites([]);
  };

  // Update user profile
  const updateUserProfile = (updatedProfile: Partial<UserProfile>) => {
    if (userProfile) {
      const newProfile = { ...userProfile, ...updatedProfile };
      setUserProfile(newProfile);
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
