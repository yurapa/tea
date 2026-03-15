import { MetadataRoute } from 'next';

import { SERVER_URL } from '@/lib/constants';

/**
 * Generates robots.txt dynamically
 * Blocks admin pages, user accounts, checkout, and API routes from crawlers
 * Following Next.js App Router best practices for SEO
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/user/',
          '/order/',
          '/cart',
          '/shipping-address',
          '/payment-method',
          '/place-order',
          '/sign-in',
          '/sign-up',
          '/api/',
          '/*/admin/',
          '/*/user/',
          '/*/order/',
          '/*/cart',
          '/*/shipping-address',
          '/*/payment-method',
          '/*/place-order',
          '/*/sign-in',
          '/*/sign-up',
        ],
      },
    ],
    sitemap: `${SERVER_URL}/sitemap.xml`,
  };
}
