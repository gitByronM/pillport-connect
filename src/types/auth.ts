
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
