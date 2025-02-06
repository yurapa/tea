import { APP_NAME, LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { getLatestProducts } from "@/lib/actions/product.actions";
import ProductList from "@/components/shared/product/product-list";
import IconBoxes from "@/components/icon-boxes";
import DealCountdown from "@/components/deal-countdown";
import Link from "next/link";
import Image from "next/image";

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const HomePage = async () => {
  // await delay(2000);
  const latestProducts = await getLatestProducts();

  return (
    <div className="space-y-8">
      <Link href="/search">
        <Image
          priority={true}
          src="/images/banner-1.png"
          width={600}
          height={200}
          className={`w-full`}
          alt={`${APP_NAME} banner`}
        />
      </Link>
      <ProductList
        title="Newest Arrivals"
        data={latestProducts}
        limit={LATEST_PRODUCTS_LIMIT}
      />
      <DealCountdown />
      <IconBoxes />
    </div>
  );
};

export default HomePage;
