import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/user/', '/profile/', '/order/', '/payment-method/', '/place-order/'],
    },
    sitemap: 'https://teavibe.store/sitemap.xml',
  };
}
