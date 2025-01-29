import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const HomePage = () => {
  // await delay(2000);

  return (
    <div className="space-y-8">
      <ProductList
        title="Newest Arrivals"
        data={sampleData.products}
        limit={4}
      />
    </div>
  );
};

export default HomePage;
