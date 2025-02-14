import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import IconBoxes from "@/components/icon-boxes";
import DealCountdown from "@/components/deal-countdown";
import ProductList from "@/components/shared/product/product-list";
import ProductCarousel from "@/components/shared/product/product-carousel";

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const HomePage = async () => {
  // await delay(2000);
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="relative w-full mb-12">
      <div>
        {featuredProducts.length > 0 && (
          <ProductCarousel data={featuredProducts} />
        )}
        <ProductList
          title="Newest Arrivals"
          data={latestProducts}
          limit={LATEST_PRODUCTS_LIMIT}
        />
      </div>

      <DealCountdown />
      <IconBoxes />
    </div>
  );
};

export default HomePage;
