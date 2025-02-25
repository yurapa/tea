import { getFeaturedProducts, getLatestProducts } from '@/lib/actions/product.actions';
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants';
import IconBoxes from '@/components/icon-boxes';
import DealCountdown from '@/components/deal-countdown';
import ProductList from '@/components/shared/product/product-list';
import ViewAllProductsButton from '@/components/view-all-products-button';
import ProductCarousel from '@/components/shared/product/product-carousel';

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const HomePage = async () => {
  // await delay(2000);
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="relative mb-12 w-full">
      <div>
        {featuredProducts.length > 0 && <ProductCarousel data={featuredProducts} />}
        <ProductList title="Newest Arrivals" data={latestProducts} limit={LATEST_PRODUCTS_LIMIT} />
        <div className="my-8 flex items-center justify-center">
          <ViewAllProductsButton />
        </div>
      </div>

      <DealCountdown />
      <IconBoxes />
    </div>
  );
};

export default HomePage;
