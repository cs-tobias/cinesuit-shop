import {client} from './shopifyClient'

export const fetchProduct = async (handle: string) => {
  const product = await client.product.fetchByHandle(handle);
  return product;
};
