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
  handle: any;
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
  quantity: number;
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
    // Find if the product already exists in the cart
    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
      // Product exists in the cart, update it
      const existingProduct = cart[existingItemIndex];
      const existingVariantIndex = existingProduct.variants.findIndex(
        (v) => v.id === variantId
      );

      if (existingVariantIndex >= 0) {
        // Variant exists, update quantity
        let updatedVariants = [...existingProduct.variants];
        updatedVariants[existingVariantIndex] = {
          ...updatedVariants[existingVariantIndex],
          quantity: updatedVariants[existingVariantIndex].quantity + quantity,
        };
        let updatedCart = [...cart];
        updatedCart[existingItemIndex] = {
          ...existingProduct,
          variants: updatedVariants,
        };
        setCart(updatedCart);
      } else {
        // Variant does not exist, add new variant
        let updatedVariants = [
          ...existingProduct.variants,
          { id: variantId, quantity },
        ];
        let updatedCart = [...cart];
        updatedCart[existingItemIndex] = {
          ...existingProduct,
          variants: updatedVariants,
        };
        setCart(updatedCart);
      }
    } else {
      // Product does not exist in the cart, add new product with the variant
      setCart([
        ...cart,
        {
          product,
          quantity: 1, // Assuming you want a default quantity for the product itself
          variants: [{ id: variantId, quantity }],
        },
      ]);
    }
  };

  const updateQuantity = (productId: string, newQuantity: any) => {
    setCart((currentCart) => {
      // Map over the current cart to find the item to update
      const updatedCart = currentCart.map((item) => {
        if (item.product.id === productId) {
          // Found the item, update its quantity
          return {
            ...item,
            quantity: newQuantity, // Assuming a flat structure where quantity is directly on the item
            variants: item.variants.map((variant) => ({
              ...variant,
              quantity: newQuantity, // If the quantity should be updated per variant
            })),
          };
        }
        return item; // For items not being updated, return them as they are
      });

      // After updating the cart, persist the new state to localStorage or your chosen storage solution
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart; // Return the updated cart to update the state
    });
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.variants[0].quantity, 0);
  };

  const redirectToCheckout = async () => {
    console.log("[redirectToCheckout] Cart content:", cart);

    if (cart.length === 0) {
      console.warn("[redirectToCheckout] Cart is empty. Aborting checkout.");
      return;
    }

    try {
      const lineItems = cart.map((item) => ({
        variantId: item.product.variants[0].id,
        quantity: item.variants[0].quantity,
      }));

      console.log("[redirectToCheckout] Line items for checkout:", lineItems);

      const checkout = await client.checkout.create({ lineItems });
      console.log("[redirectToCheckout] Checkout created:", checkout);

      if (checkout && checkout.webUrl) {
        console.log("[redirectToCheckout] Redirecting to:", checkout.webUrl);
        window.location.href = checkout.webUrl;
      } else {
        console.error(
          "[redirectToCheckout] Checkout creation failed or missing webUrl."
        );
      }
    } catch (error) {
      console.error("[redirectToCheckout] Error during checkout:", error);
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
