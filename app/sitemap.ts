import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://teavibe.store',
      lastModified: new Date(),
    }
  ];
}
