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
    <div className="relative w-full mb-12">
      <Link href="/search">
        <Image
          priority={true}
          src="https://utfs.io/f/K4RUBh9xn6WpApBngtXfRiGnFr9PBU8Q0lZ6XCIYasxO4pW1"
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
