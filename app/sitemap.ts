import { MetadataRoute } from 'next';

import { SERVER_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'el', 'uk', 'ru'];
  const sitemap: MetadataRoute.Sitemap = [];
  const currentDate = new Date().toISOString();

  const addUrlWithLocales = (
    path: string,
    lastModified: string | Date,
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    priority: number,
  ) => {
    locales.forEach((locale) => {
      const url = locale === 'en' ? `${SERVER_URL}${path}` : `${SERVER_URL}/${locale}${path}`;

      sitemap.push({
        url,
        lastModified: lastModified instanceof Date ? lastModified : new Date(lastModified),
        changeFrequency,
        priority,
      });
    });
  };

  addUrlWithLocales('', currentDate, 'daily', 1.0);
  addUrlWithLocales('/search', currentDate, 'daily', 0.9);
  addUrlWithLocales('/cart', currentDate, 'weekly', 0.7);
  addUrlWithLocales('/sign-in', currentDate, 'monthly', 0.3);
  addUrlWithLocales('/sign-up', currentDate, 'monthly', 0.3);

  // const products = [
  //   'earl-grey-classic',
  //   'english-breakfast',
  //   'jasmine-green-tea',
  //   'chamomile-herbal',
  //   'dragon-well-green',
  //   'pu-erh-aged',
  //   'white-silver-needle',
  //   'oolong-iron-goddess',
  //   'rooibos-vanilla',
  //   'tea-infuser-set'
  // ];
  //
  // products.forEach(slug => {
  //   addUrlWithLocales(`/product/${slug}`, currentDate, 'weekly', 0.7);
  // });


  // /Users/director/work/tea/prisma/schema/product.prisma
  //
  // const categories = [
  //   'black-tea',
  //   'green-tea',
  //   'white-tea',
  //   'oolong-tea',
  //   'herbal-tea',
  //   'tea-accessories',
  //   'gift-sets'
  // ];
  //
  // categories.forEach(category => {
  //   addUrlWithLocales(`/search?category=${category}`, currentDate, 'weekly', 0.6);
  // });

  const priceRanges = ['1-10', '11-20', '21-30', '31-50', '51-100'];
  priceRanges.forEach((price) => {
    addUrlWithLocales(`/search?price=${price}`, currentDate, 'monthly', 0.5);
  });

  const ratings = ['4', '3', '2', '1'];
  ratings.forEach((rating) => {
    addUrlWithLocales(`/search?rating=${rating}`, currentDate, 'monthly', 0.5);
  });

  // Sort sitemap by priority (highest first)
  return sitemap.sort((a, b) => (b.priority || 0) - (a.priority || 0));
}
