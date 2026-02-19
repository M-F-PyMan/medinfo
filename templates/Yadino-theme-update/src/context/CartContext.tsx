import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

interface Course {
  id: number;
  title: string;
  slug: string;
  preview_image: string;
  price: number;
  sale_price?: number;
  teacher_name: string;
  lessons_count: number;

  // 🔥 اضافه‌شده‌ها
  average_rating: number;
  comments_count: number;
}


interface CartItem {
  id: number;
  course: Course;
  price_at_time: number;
  added_at: string;
}

interface Cart {
  id: number;
  items: CartItem[];
  created_at: string;
}

interface CartSummary {
  total_before: number;
  discount: number;
  total_after: number;
  coupon_code?: string;
  cart: Cart;
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (courseId: number) => Promise<void>;
  removeFromCart: (courseId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getSummary: (coupon?: string) => Promise<CartSummary | null>;
  checkout: (coupon?: string) => Promise<string | null>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_BASE = "http://127.0.0.1:8000/api";

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { showNotification } = useNotification();

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
  });

  // -----------------------------
  // Fetch Cart
  // -----------------------------
  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/cart/`, {
        headers: authHeaders(),
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  // -----------------------------
  // Add to Cart
  // -----------------------------
  const addToCart = async (courseId: number) => {
    try {
      const res = await fetch(`${API_BASE}/cart/add/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ course_id: courseId }),
      });

      const data = await res.json();
      showNotification(data.message || "به سبد اضافه شد", "success");

      await fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // -----------------------------
  // Remove from Cart
  // -----------------------------
  const removeFromCart = async (courseId: number) => {
    try {
      const res = await fetch(`${API_BASE}/cart/remove/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ course_id: courseId }),
      });

      const data = await res.json();
      showNotification(data.message || "حذف شد", "success");

      await fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // -----------------------------
  // Clear Cart
  // -----------------------------
  const clearCart = async () => {
    try {
      const res = await fetch(`${API_BASE}/cart/clear/`, {
        method: "POST",
        headers: authHeaders(),
      });

      const data = await res.json();
      showNotification(data.message || "سبد خالی شد", "info");

      await fetchCart();
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  // -----------------------------
  // Summary
  // -----------------------------
  const getSummary = async (coupon?: string): Promise<CartSummary | null> => {
    try {
      const res = await fetch(`${API_BASE}/cart/summary/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ coupon_code: coupon || null }),
      });

      if (!res.ok) return null;

      return await res.json();
    } catch (err) {
      console.error("Error getting summary:", err);
      return null;
    }
  };

  // -----------------------------
  // Checkout
  // -----------------------------
  const checkout = async (coupon?: string): Promise<string | null> => {
    try {
      const res = await fetch(`${API_BASE}/payments/start_cart/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ coupon_code: coupon || null }),
      });

      const data = await res.json();

      if (data.url) return data.url;

      showNotification(data.error || "خطا در شروع پرداخت", "error");
      return null;
    } catch (err) {
      console.error("Checkout error:", err);
      return null;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        clearCart,
        getSummary,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
