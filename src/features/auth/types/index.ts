export type AuthView = 
  | 'LOGIN'
  | 'REGISTER'
  | 'OTP_VERIFICATION'
  | 'FORGOT_PASSWORD'
  | 'RESET_PASSWORD'
  | 'VERIFICATION_SUCCESS'
  | 'PASSWORD_UPDATED_SUCCESS';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role: 'USER' | 'ADMIN';
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  phone: string;
  password: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  user: AuthUser;
  session: any;
}



export type UserRole = "ADMIN" | "USER";

export interface AuthError {
  code: string;
  message: string;
}

export interface ResendVerificationProps {
  email: string;
}

export interface LoginFormProps {
  role: UserRole;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface VerificationFormData {
  otp: string;
}

export interface PasswordResetResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface VerificationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

