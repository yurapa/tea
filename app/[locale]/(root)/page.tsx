import { Metadata } from 'next';

import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants';
import { getLatestProducts } from '@/lib/actions/product.actions';
import IconBoxes from '@/components/icon-boxes';
import DealCountdown from '@/components/deal-countdown';
import ProductList from '@/components/shared/product/product-list';

import ProductCarousel from '@/components/shared/product/product-carousel';

export const metadata: Metadata = {
  title: 'Home page',
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'ru': '/ru',
      'uk': '/uk',
      'el': '/el',
    },
  },
};

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <>
      {/* Hero carousel — full viewport bleed */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen -mt-24 md:-mt-20">
        <ProductCarousel />
      </div>

      {/* Product list section — full bleed with flat background */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-background">
        <div className="container mx-auto px-6">
          <ProductList title="Newest Arrivals" data={latestProducts} limit={LATEST_PRODUCTS_LIMIT} />
        </div>
      </div>

      {/* Full-bleed sections */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen -mb-16">
        <DealCountdown />
        <IconBoxes />
      </div>
    </>
  );
};

export default HomePage;
