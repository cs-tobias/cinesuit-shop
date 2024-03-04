import Client from 'shopify-buy';

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'cinesuit.myshopify.com',
  storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN as string,
  apiVersion: '2023-07'
});

export { client }