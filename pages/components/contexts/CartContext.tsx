// CartContext.tsx

import React, { createContext, useState, useEffect, useContext } from "react";
import { client } from "@/utils/shopifyClient";

// Define a type for your product and cart item
interface Product {
  id: string;
  title: string;
  variants: Array<{ id: string; price: { amount: string } }>;
  images: Array<{ id: string; src: string }>;
  description: string;
}

interface CartItem {
  product: Product;
  variants: Array<{ id: string; quantity: number }>;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  updateQuantity: () => {},
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (product: Product, quantity: number) => {
    console.log("Current cart state before update:", cart); // Log cart state before update

    const existingCartItemIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    let newCart;
    if (existingCartItemIndex !== -1) {
      newCart = [...cart];
      newCart[existingCartItemIndex] = {
        ...newCart[existingCartItemIndex],
        quantity: newCart[existingCartItemIndex].quantity + quantity,
      };
    } else {
      newCart = [...cart, { product, quantity }];
    }

    setCart(newCart);
    console.log("New cart state after update:", newCart); // Log new cart state
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };
  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const redirectToCheckout = async () => {
    if (cart.length === 0) {
      console.log("Cart is empty");
      return;
    }

    const lineItems = cart.map((item) => ({
      variantId: item.product.variants[0].id,
      quantity: item.quantity,
    }));

    console.log("Line items for checkout:", lineItems);

    try {
      const checkout = await client.checkout.create({ lineItems });
      console.log("Checkout created:", checkout);

      if (checkout && checkout.webUrl) {
        window.location.href = checkout.webUrl;
      } else {
        console.log("Checkout response is invalid", checkout);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      console.log(
        "Error details:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        redirectToCheckout,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
