// FORM INPUT TYPES

export interface RegistrationInputs {
  name: string,
  email: string,
  password:string,
  confirmPassword: string
}

export interface LoginInputs {
  email: string,
  password: string
}

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
  updated_at: string;
}