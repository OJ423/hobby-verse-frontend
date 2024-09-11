"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

interface Order {
  total_amount: number;
  payment_status: string;
}

interface OrderItem {
  event_name: string;
  event_date: string;
  ticket_quantity: number;
  event_ticket_id: number;
  ticket_name: string;
  ticket_description: string;
  ticket_price: number;
  heads_per_ticket: number;
}
interface Basket {
  order: Order;
  order_items: OrderItem[]
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  basket: Basket | null
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setBasket: (basket: Basket | null) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedBasket = localStorage.getItem("basket")

    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedBasket) {
      setBasket(JSON.parse(savedBasket))
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, basket, setToken, setUser, setBasket }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
