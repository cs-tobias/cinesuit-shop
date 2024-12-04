import { client } from './shopifyClient';
import { Product } from '@/types/Types'; // Ensure this path is correct

export const fetchProduct = async (handle: string): Promise<Product> => {
  const product = await client.product.fetchByHandle(handle);
  return product as Product; // Ensure this cast is appropriate based on your data structure
};
