import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { getLatestProducts } from "@/lib/actions/product.actions";
import ProductList from "@/components/shared/product/product-list";

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const HomePage = async () => {
  // await delay(2000);
  const latestProducts = await getLatestProducts();

  return (
    <div className="space-y-8">
      <ProductList
        title="Newest Arrivals"
        data={latestProducts}
        limit={LATEST_PRODUCTS_LIMIT}
      />
    </div>
  );
};

export default HomePage;
