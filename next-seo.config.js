// next-seo.config.js
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Cinesuit',
  description: 'Transforming your Sigma ART lenses into compact cinema lenses.',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.cinesuit.com/',
    site_name: 'Cinesuit',
    images: [
      {
        url: 'https://www.cinesuit.com/opengraph-image-1.jpg',
        width: 800,
        height: 600,
        alt: 'Cinesuit Open Graph Image',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@cinesuit',
    site: '@cinesuit.com',
    cardType: 'summary_large_image',
  },
};
