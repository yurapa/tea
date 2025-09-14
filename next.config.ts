import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },

  // Add redirects to fix 404 errors from old/incorrect URLs
  async redirects() {
    return [
      // Redirect old product slugs to actual existing products
      {
        source: '/product/earl-grey-classic',
        destination: '/product/sir-charles-grey-tea',
        permanent: true,
      },
      {
        source: '/product/english-breakfast',
        destination: '/product/english-aristocratic-tea',
        permanent: true,
      },
      {
        source: '/product/jasmine-green-tea',
        destination: '/product/king-of-jasmine',
        permanent: true,
      },
      {
        source: '/product/chamomile-herbal',
        destination: '/product/alpine-meadow',
        permanent: true,
      },
      {
        source: '/product/dragon-well-green',
        destination: '/product/exclusive-gun-powder',
        permanent: true,
      },
      {
        source: '/product/pu-erh-aged',
        destination: '/product/da_hong_pao_red_robe',
        permanent: true,
      },
      {
        source: '/product/white-silver-needle',
        destination: '/product/white_tea_sun_chueng',
        permanent: true,
      },
      {
        source: '/product/oolong-iron-goddess',
        destination: '/product/da_hong_pao_red_robe',
        permanent: true,
      },
      {
        source: '/product/rooibos-vanilla',
        destination: '/product/carpathian-tea',
        permanent: true,
      },
      {
        source: '/product/tea-infuser-set',
        destination: '/search?category=tea-accessories',
        permanent: true,
      },
      // Add locale-specific redirects
      {
        source: '/:locale/product/earl-grey-classic',
        destination: '/:locale/product/sir-charles-grey-tea',
        permanent: true,
      },
      {
        source: '/:locale/product/english-breakfast',
        destination: '/:locale/product/english-aristocratic-tea',
        permanent: true,
      },
      {
        source: '/:locale/product/jasmine-green-tea',
        destination: '/:locale/product/king-of-jasmine',
        permanent: true,
      },
      {
        source: '/:locale/product/chamomile-herbal',
        destination: '/:locale/product/alpine-meadow',
        permanent: true,
      },
      {
        source: '/:locale/product/dragon-well-green',
        destination: '/:locale/product/exclusive-gun-powder',
        permanent: true,
      },
      {
        source: '/:locale/product/pu-erh-aged',
        destination: '/:locale/product/da_hong_pao_red_robe',
        permanent: true,
      },
      {
        source: '/:locale/product/white-silver-needle',
        destination: '/:locale/product/white_tea_sun_chueng',
        permanent: true,
      },
      {
        source: '/:locale/product/oolong-iron-goddess',
        destination: '/:locale/product/da_hong_pao_red_robe',
        permanent: true,
      },
      {
        source: '/:locale/product/rooibos-vanilla',
        destination: '/:locale/product/carpathian-tea',
        permanent: true,
      },
      {
        source: '/:locale/product/tea-infuser-set',
        destination: '/:locale/search?category=tea-accessories',
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
