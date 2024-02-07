import { client } from './shopifyClient';

export const fetchAllProducts = async () => {
  const products = await client.product.fetchAll();
  return products;
};