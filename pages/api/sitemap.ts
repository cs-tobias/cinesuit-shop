// pages/api/sitemap.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { client } from "@/utils/shopifyClient";
import { Product } from '@/types/Types';

const createSitemap = (urls: { url: string; lastModified: Date }[]): string => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ url, lastModified }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified.toISOString()}</lastmod>
  </url>`
  )
  .join('')}
</urlset>`;

export default async function sitemap(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = 'https://cinesuit.com/';

  // Define static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}shop`, lastModified: new Date() },
    { url: `${baseUrl}cart`, lastModified: new Date() },
    { url: `${baseUrl}about`, lastModified: new Date() },
    { url: `${baseUrl}instructions`, lastModified: new Date() },
  ];

  // Fetch all products
  const fetchedProducts = await client.product.fetchAll();
  const dynamicPages = fetchedProducts.map(product => ({
    url: `${baseUrl}shop/${product.handle}`,
    lastModified: new Date(), // Assuming current date as placeholder
  }));

  // Optionally filter products if you have specific logic for unreleased products
  // This example includes all products but you can adjust this logic based on your requirements
  const unreleasedPages = fetchedProducts.filter(product => product.productType === 'unreleased')
    .map(product => ({
      url: `${baseUrl}shop/unreleased/${product.handle}`,
      lastModified: new Date(), // Assuming current date as placeholder
    }));

  // Combine all pages
  const allPages = [...staticPages, ...dynamicPages, ...unreleasedPages];

  // Generate sitemap XML content
  const sitemapContent = createSitemap(allPages);

  // Set response header
  res.setHeader('Content-Type', 'application/xml');
  // Write the sitemap content to the response
  res.write(sitemapContent);
  res.end();
}
