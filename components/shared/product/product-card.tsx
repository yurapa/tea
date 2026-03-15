import Link from 'next/link';
import Image from 'next/image';

import Rating from '@/components/shared/product/rating';
import ProductPrice from '@/components/shared/product/product-price';
import { Product, Cart } from '@/types';
import AddToCart from '@/components/shared/product/add-to-cart';

const ProductCard = ({ product, cart }: { product: Product; cart?: Cart }) => {

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-muted">
        <Image
          src={product.images![0]}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={true}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          alt={product.name}
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
      </Link>

      <Link href={`/product/${product.slug}`} className="block p-4">
        <h3 className="font-playfair text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <Rating value={Number(product.rating)} />
          <ProductPrice value={Number(product.price)} />
        </div>
      </Link>

      {product.stock > 0 && (
        <div className="px-4 pb-4">
          <AddToCart
            cart={cart}
            item={{
              productId: product.id,
              name: product.name,
              slug: product.slug,
              price: String(product.price),
              qty: 1,
              image: product.images![0],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
