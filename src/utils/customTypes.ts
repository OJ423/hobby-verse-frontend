// FORM INPUT TYPES

export interface RegistrationInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInputs {
  email: string;
  password: string;
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

// API CALL RESPONSES

export interface Event {
  id: 4;
  name: string;
  description: string | null;
  date: string;
  location: string | null;
  capacity: number;
  event_category_id: number | null;
  category_name: string | null
  created_at: string;
  updated_at: string;
  img: string | null;
  status: string;
}

export interface Category {
  id: number,
  name: string,
  description: string
}


