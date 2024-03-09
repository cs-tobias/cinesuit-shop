// next-seo.config.js
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    openGraph: {
      type: 'website',
      locale: 'en_IE',
      description: 'This is the description',
      url: 'https://www.cinesuit.com/',
      site_name: 'Cinesuit',
      images: [
        {
          url: 'https://www.cinesuit.com/opengraph-image.jpg',
          width: 800,
          height: 600,
          alt: 'Cinesuit Open Graph Image',
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      handle: '@cinesuit', // Your Twitter handle if you have one
      site: '@cinesuit.com', // If your site has a Twitter profile
      cardType: 'summary_large_image',
    },
  };
  