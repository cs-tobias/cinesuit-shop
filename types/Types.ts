// Define the Product interface
export interface Product {
  productType: string;
  id: string;
  title: string;
  description: string;
  images: ProductImage[];
  variants: Array<{
    id: string;
    priceV2: { amount: string };
  }>;
}

// Define props interface for the component
export interface ProductProps {
  mainProduct: Product;
  associatedProducts: Product[];
}

  export interface ProductImage {
    id: string;
    src: string;
  }
