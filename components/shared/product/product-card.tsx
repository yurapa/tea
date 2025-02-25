import Link from 'next/link';
import Image from 'next/image';

import Rating from '@/components/shared/product/rating';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductPrice from '@/components/shared/product/product-price';
import { Product } from '@/types';
import AddToCart from '@/components/shared/product/add-to-cart';
import { getMyCart } from '@/lib/actions/cart.actions';

const ProductCard = async ({ product }: { product: Product }) => {
  const cart = await getMyCart();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center p-0">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images![0]}
            className="aspect-square rounded object-cover"
            priority={true}
            height={300}
            width={300}
            alt={product.name}
          />
        </Link>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-base font-semibold">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">Out of Stock</p>
          )}
        </div>
        {product.stock > 0 && (
          <div className="flex-center mt-4">
            <AddToCart
              cart={cart}
              item={{
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                qty: 1,
                image: product.images![0],
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
