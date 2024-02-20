
// Define the Product interface
export interface Product {
  handle: string;
  availableForSale: boolean;
  productType: string;
  id: string;
  title: string;
  description: string;
  images: Array<{
    id: string | undefined; // Allow 'id' to be 'undefined'
    src: string;
  }>;
  variants: Array<{
    id: string;
    price: { amount: number };
  }>;
}


// Define props interface for the component
export interface ProductProps {
  mainProduct: Product;
  associatedProducts: Product[];
  mainImagePaths: string[]; // Updated to reflect actual usage
  associatedProductsImages: { id: string; images: string[] }[]; // Added this line
}

  export interface ProductImage {
    id: string;
    src: string;
  }
