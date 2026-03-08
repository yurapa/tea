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
          '/admin/',           // Admin panel - requires authentication
          '/user/',            // User account pages - requires authentication
          '/profile/',         // User profile - requires authentication
          '/order/',           // Order details - requires authentication & user-specific
          '/cart',             // Shopping cart - user-specific, dynamic content
          '/shipping-address', // Checkout step 1 - requires authentication
          '/payment-method',   // Checkout step 2 - requires authentication
          '/place-order',      // Checkout step 3 - requires authentication
          '/api/',             // API routes - not meant for crawlers
          '/sign-in',          // Login page - low SEO value
          '/sign-up',          // Registration page - low SEO value
        ],
      },
    ],
    sitemap: `${SERVER_URL}/sitemap.xml`,
  };
}
