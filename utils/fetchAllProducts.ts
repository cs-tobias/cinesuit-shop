import { client } from './shopifyClient';
import { Product } from '@/types/Types';

export const fetchAllProducts = async (): Promise<Product[]> => {
  const products = await client.product.fetchAll();
  return products as Product[];
};