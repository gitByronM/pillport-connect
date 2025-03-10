
export const PaymentMethod = {
  CASH: 'cash',
  POS: 'pos',
  MOBILE: 'mobile',
} as const;

export type PaymentMethodType = typeof PaymentMethod[keyof typeof PaymentMethod];

export interface MobilePaymentDetails {
  bank: string;
  accountNumber: string;
  phone: string;
  referenceId: string;
  proofImage?: File;
}

export interface ShippingAddress {
  name: string;
  street: string;
  apt: string;
  city: string;
  municipality: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  additionalInstructions?: string;
  locationName?: string;
}
