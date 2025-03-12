
export interface UserProfile {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneCountryCode: string;
  phonePrefix: string;
  phoneNumber: string;
  idType: string;
  documentNumber: string;
  gender: 'male' | 'female';
  avatarUrl?: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface PurchaseItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Purchase {
  id: string;
  date: string;
  total: number;
  status: 'completed' | 'shipped' | 'delivered' | 'cancelled';
  items: PurchaseItem[];
  orderNumber: string;
}

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
}
