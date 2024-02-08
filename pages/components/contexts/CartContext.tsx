import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { client } from "@/utils/shopifyClient";

// Define a type for your product and cart item
interface Product {
  id: string;
  title: string;
  variants: Array<{ id: string; price: { amount: string } }>;
  images: Array<{ id: string; src: string }>;
  description: string;
}

interface Variant {
  id: string;
  quantity: number;
  // Add other necessary fields for a variant, like price, name, etc.
}

interface CartItem {
  product: Product; // Assuming Product type is defined elsewhere and includes a list of variants
  variants: Variant[]; // Array of selected variants with quantities
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variantId: string, quantity: number) => void; // Updated signature
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  redirectToCheckout: () => Promise<void>;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  redirectToCheckout: async () => {
    /* This function now correctly matches the expected return type */
  },
  getCartItemCount: () => 0,
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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

  const addToCart = (product: Product, variantId: string, quantity: number) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
      // Product exists, check if the variant exists
      const existingVariantIndex = cart[existingItemIndex].variants.findIndex(
        (v) => v.id === variantId
      );
      if (existingVariantIndex >= 0) {
        // Variant exists, update its quantity
        let newCart = [...cart];
        newCart[existingItemIndex].variants[existingVariantIndex].quantity +=
          quantity;
        setCart(newCart);
      } else {
        // Variant doesn't exist, add new variant to the item
        let newCart = [...cart];
        newCart[existingItemIndex].variants.push({ id: variantId, quantity });
        setCart(newCart);
      }
    } else {
      // Product doesn't exist, add new item with this variant
      setCart([...cart, { product, variants: [{ id: variantId, quantity }] }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(
      cart.map((item) =>
        item.product.id === productId
          ? { ...item, variants: [{ ...item.variants[0], quantity }] }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.variants[0].quantity, 0);
  };

  const redirectToCheckout = async () => {
    if (cart.length === 0) {
      console.log("Cart is empty");
      return;
    }

    const lineItems = cart.map((item) => ({
      variantId: item.product.variants[0].id,
      quantity: item.variants[0].quantity,
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
    } catch (error: any) {
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
