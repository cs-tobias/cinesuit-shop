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
  vendor: string;
  availableForSale: boolean;
  productType: string;
  handle: any;
  id: string;
  title: string;
  variants: Array<{
    compareAtPrice: any;
    id: string;
    price: { amount: string };
  }>;
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
    setCart((prevCart) => {
      let updatedCart = prevCart.map((item) => {
        if (item.product.id === product.id) {
          // Check if the specific variant exists
          const variantIndex = item.variants.findIndex(
            (v) => v.id === variantId
          );
          if (variantIndex > -1) {
            // Update quantity for existing variant
            const updatedVariants = [...item.variants];
            updatedVariants[variantIndex] = {
              ...updatedVariants[variantIndex],
              quantity: updatedVariants[variantIndex].quantity + quantity,
            };
            return { ...item, variants: updatedVariants };
          } else {
            // Add new variant to product
            return {
              ...item,
              variants: [...item.variants, { id: variantId, quantity }],
            };
          }
        }
        return item;
      });

      // Check if the product is already in the cart
      const existingProductIndex = updatedCart.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingProductIndex === -1) {
        // Product not found, add new product to cart
        updatedCart.push({
          product: { ...product }, // Ensure this includes all necessary Product properties
          variants: [{ id: variantId, quantity }],
          quantity: 0,
        });
      }

      // Optionally, update localStorage or other persistence mechanisms here
      console.log("Updated cart:", updatedCart);
      return updatedCart;
    });
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
    return cart.reduce((count, item) => {
      // Ensure `item.variants` is an array before calling reduce
      const itemTotalQuantity = (item.variants || []).reduce(
        (total, variant) => total + variant.quantity,
        0
      );
      return count + itemTotalQuantity;
    }, 0);
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
