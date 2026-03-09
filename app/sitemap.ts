import { MetadataRoute } from 'next';

import { SERVER_URL } from '@/lib/constants';
import { prisma } from '@/db/prisma';
import { getAllLocales } from '@/i18n/locale-config';

/**
 * Generates sitemap.xml dynamically with proper hreflang support
 * Includes: Homepage, Search, Products, Categories
 * Excludes: User-specific pages (cart, auth, admin, checkout)
 * Following Next.js App Router and Google's multilingual SEO best practices
 *
 * Best practices implemented:
 * - Only public, indexable pages included
 * - Proper hreflang alternates for all languages
 * - x-default for language fallback
 * - Realistic change frequencies
 * - Priority based on page importance
 * - Products fetched from database
 * - Categories fetched dynamically
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = getAllLocales();
  const sitemap: MetadataRoute.Sitemap = [];

  /**
   * Helper to add URL with all locale variants and hreflang alternates
   * This creates proper canonical URLs and alternate language links
   */
  const addUrlWithLocales = (
    path: string,
    lastModified: Date,
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    priority: number,
  ) => {
    // Create alternates object for hreflang tags
    const alternates: { languages: Record<string, string> } = {
      languages: {},
    };

    // Add each locale to alternates
    locales.forEach((locale) => {
      const url = locale === 'en' ? `${SERVER_URL}${path}` : `${SERVER_URL}/${locale}${path}`;
      alternates.languages[locale] = url;
    });

    // Add x-default (fallback to English)
    alternates.languages['x-default'] = `${SERVER_URL}${path}`;

    // Add entry for each locale
    locales.forEach((locale) => {
      const url = locale === 'en' ? `${SERVER_URL}${path}` : `${SERVER_URL}/${locale}${path}`;

      sitemap.push({
        url,
        lastModified,
        changeFrequency,
        priority,
        alternates,
      });
    });
  };

  // Homepage - highest priority, changes daily
  addUrlWithLocales('/', new Date(), 'daily', 1.0);

  // Search page - high priority for discovery
  addUrlWithLocales('/search', new Date(), 'daily', 0.9);

  // Fetch all products from database
  try {
    const products = await prisma.product.findMany({
      select: {
        slug: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Add each product page
    products.forEach((product: { slug: string; createdAt: Date }) => {
      addUrlWithLocales(
        `/product/${product.slug}`,
        product.createdAt,
        'weekly',
        0.8, // High priority for product pages
      );
    });
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  // Fetch unique categories from database
  try {
    const categories = await prisma.product.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    });

    // Add category search pages
    categories.forEach(({ category }: { category: string }) => {
      // Convert category to URL-friendly slug
      const categorySlug = category
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      addUrlWithLocales(
        `/search?category=${categorySlug}`,
        new Date(),
        'daily',
        0.7, // Medium-high priority for categories
      );
    });
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
  }

  // Sort sitemap by priority (highest first), then by URL (for consistency)
  return sitemap.sort((a, b) => {
    const priorityDiff = (b.priority || 0) - (a.priority || 0);
    if (priorityDiff !== 0) return priorityDiff;
    return a.url.localeCompare(b.url);
  });
}
