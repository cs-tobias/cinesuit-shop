
// Define the Product interface
export interface Product {
  handle: string;
  availableForSale: boolean;
  productType: string;
  id: string;
  title: string;
  description: string;
  images: Array<{
    id: string;
    src: string;
  }>;
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
