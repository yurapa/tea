import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://teavibe.store';
  const locales = ['en', 'el', 'uk', 'ru'];
  const sitemap: MetadataRoute.Sitemap = [];

  const addUrlWithLocales = (
    path: string, 
    lastModified: Date, 
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never', 
    priority: number
  ) => {
    locales.forEach(locale => {
      const url = locale === 'en' ? 
        `${baseUrl}${path}` : 
        `${baseUrl}/${locale}${path}`;
      
      sitemap.push({
        url,
        lastModified,
        changeFrequency,
        priority
      });
    });
  };

  addUrlWithLocales('', new Date(), 'daily', 1.0);
  addUrlWithLocales('/sign-in', new Date(), 'monthly', 0.3);
  addUrlWithLocales('/sign-up', new Date(), 'monthly', 0.3);
  addUrlWithLocales('/search', new Date(), 'daily', 0.8);
  addUrlWithLocales('/cart', new Date(), 'always', 0.5);

  const products = [
    'earl-grey-classic',
    'english-breakfast',
    'jasmine-green-tea',
    'chamomile-herbal',
    'dragon-well-green',
    'pu-erh-aged',
    'white-silver-needle',
    'oolong-iron-goddess',
    'rooibos-vanilla',
    'tea-infuser-set'
  ];

  products.forEach(slug => {
    addUrlWithLocales(`/product/${slug}`, new Date(), 'weekly', 0.7);
  });

  const categories = [
    'black-tea',
    'green-tea',
    'white-tea',
    'oolong-tea',
    'herbal-tea',
    'tea-accessories',
    'gift-sets'
  ];

  categories.forEach(category => {
    addUrlWithLocales(`/search?category=${category}`, new Date(), 'weekly', 0.6);
  });

  const priceRanges = ['1-10', '11-20', '21-30', '31-50', '51-100'];
  priceRanges.forEach(price => {
    addUrlWithLocales(`/search?price=${price}`, new Date(), 'monthly', 0.4);
  });

  const ratings = ['4', '3', '2', '1'];
  ratings.forEach(rating => {
    addUrlWithLocales(`/search?rating=${rating}`, new Date(), 'monthly', 0.4);
  });

  return sitemap.sort((a, b) => (b.priority || 0) - (a.priority || 0));
}