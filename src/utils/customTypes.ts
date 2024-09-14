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
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface EditUser {
  name: string;
  email: string;
}

export interface OrderInput {
  total_amount: number;
  payment_status: string;
  order_items: OrderItemsInput[];
}

export interface OrderItemsInput {
  event_ticket_id: number;
  ticket_price: number;
  quantity: number;
}

export interface NewAdminUser {
  email: string;
  role: string;
}

export interface TicketInput {
  name:string;
  description:string;
  limitations:string;
  qty_tickets:number;
  price:number | null;
  is_free:boolean;
  updated_at:string;
}

export interface NewTicketInput {
  name:string;
  description:string;
  limitations:string;
  qty_tickets:number;
  price:number | null;
  is_free:boolean;
}

export interface EventEditInput {
  name: string;
  description: string | null;
  date: string;
  location: string | null;
  capacity: number;
  event_category_id: number | undefined;
  category_name: string;
  updated_at: string;
  img: string | null;
  status: string;
}

export interface EventAddInput {
  name: string;
  description: string | null;
  date: string;
  location: string | null;
  capacity: number;
  event_category_id: number;
  img: string | null;
  status: string;
}

export interface EventTicketInput {
  ticket_id: number;
  event_id: number;
  quantity: number;
}

// API CALL RESPONSES

export interface Event {
  id: 4;
  name: string;
  description: string | null;
  date: string;
  location: string | null;
  capacity: number;
  event_category_id: number;
  category_name: string;
  created_at: string;
  updated_at: string;
  img: string | null;
  status: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface EventTickets {
  id: number;
  event_id: number;
  ticket_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  ticket_head_count: number;
  price: number;
  is_free: boolean;
}

export interface Ticket {
  id:number;
  name:string;
  description:string;
  limitations:string;
  qty_tickets:number;
  price:number;
  is_free:boolean;
  created_at:string;
  updated_at:string;
}

export interface OrderAPIReturn {
  id: number;
  user_id: 3;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

export interface OrderConfirmation {
  order: OrderAPIReturn;
  orderItems: OrderItem[];
}

// Basket Types

export interface Order {
  total_amount: number;
  payment_status: string;
}

export interface OrderItem {
  event_name: string;
  event_date: string;
  ticket_quantity: number;
  event_ticket_id: number;
  ticket_name: string;
  ticket_description: string;
  ticket_price: number;
  heads_per_ticket: number;
}
export interface Basket {
  order: Order;
  order_items: OrderItem[];
}

// IMAGE TYPE

export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
}
