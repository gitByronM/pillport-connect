
export interface RegisterFormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  idType: string;
  documentNumber: string;
  phoneCountryCode: string;
  phonePrefix: string;
  phoneNumber: string;
  gender: 'male' | 'female';
  acceptTerms: boolean;
}

export interface LoginFormData {
  identifier: string;
  password?: string;
}

export interface PasswordRecoveryFormData {
  recoveryMethod: 'sms' | 'email' | 'whatsapp';
}

export type AuthDialogType = 'login' | 'register' | 'recovery';

export interface DocumentType {
  id: string;
  name: string;
}

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: 'male' | 'female';
  document_number: string;
  document_type_id: string;
  created_at: string;
  updated_at: string;
}
