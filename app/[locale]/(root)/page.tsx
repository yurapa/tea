import { Metadata } from 'next';

import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants';
import { getFeaturedProducts, getLatestProducts } from '@/lib/actions/product.actions';
import IconBoxes from '@/components/icon-boxes';
import DealCountdown from '@/components/deal-countdown';
import ProductList from '@/components/shared/product/product-list';
import ViewAllProductsButton from '@/components/view-all-products-button';
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

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const HomePage = async () => {
  // await delay(2000);
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 && <ProductCarousel data={featuredProducts} />}
      <ProductList title="Newest Arrivals" data={latestProducts} limit={LATEST_PRODUCTS_LIMIT} />
      <div className="my-8 flex items-center justify-center">
        <ViewAllProductsButton label="View All Products" />
      </div>
      <DealCountdown />
      <IconBoxes />
    </>
  );
};

export default HomePage;
