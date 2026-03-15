import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import ProductCard from '@/components/shared/product/product-card';
import { getMyCart } from '@/lib/actions/cart.actions';
import { Product } from '@/types';

const ProductList = async ({ data, title, limit }: { data: Product[]; title?: string; limit?: number }) => {
  const cart = await getMyCart().catch(() => undefined);
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="py-20 lg:py-28">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-2">Fresh Picks</p>
          {title && <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{title}</h2>}
        </div>
        <Link
          href="/search"
          className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-foreground hover:bg-accent/20 px-4 py-2 rounded-md transition-colors"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {limitedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {limitedData.map((product: Product) => (
            <ProductCard product={product} cart={cart} key={product.slug} />
          ))}
        </div>
      ) : (
        <div>
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
