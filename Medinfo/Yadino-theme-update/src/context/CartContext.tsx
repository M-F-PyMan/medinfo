import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNotification } from './NotificationContext';

interface Course {
  id: string;
  title: string;
  price: number;
  image: string;
  instructor: string;
}

interface CartItem extends Course {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  updateQuantity: (courseId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { showNotification } = useNotification();

  const addToCart = (course: Course) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === course.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === course.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...course, quantity: 1 }];
    });
    showNotification(`${course.title} به سبد خرید اضافه شد`, 'success');
  };

  const removeFromCart = (courseId: string) => {
    const courseToRemove = cartItems.find(item => item.id === courseId);
    setCartItems(prev => prev.filter(item => item.id !== courseId));
    if (courseToRemove) {
      showNotification(`${courseToRemove.title} از سبد خرید حذف شد`, 'success');
    }
  };

  const updateQuantity = (courseId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(courseId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === courseId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}