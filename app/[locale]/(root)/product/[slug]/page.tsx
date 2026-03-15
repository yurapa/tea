import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

import { auth } from '@/auth';
import { getMyCart } from '@/lib/actions/cart.actions';
import { getProductBySlug } from '@/lib/actions/product.actions';
import { Badge } from '@/components/ui/badge';
import Rating from '@/components/shared/product/rating';
import AddToCart from '@/components/shared/product/add-to-cart';
import ProductPrice from '@/components/shared/product/product-price';
import ProductImages from '@/components/shared/product/product-images';
import ReviewList from './review-list';

const ProductDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const session = await auth();
  const userId = session?.user?.id;
  const cart = await getMyCart();

  return (
    <>
      <section>
        {/* Breadcrumb */}
        <Link
          href="/search"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to catalog
        </Link>

        {/* 3-column layout: images | details | action card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-8 lg:gap-12">
          {/* Images Column */}
          <div>
            <ProductImages images={product.images!} />
          </div>

          {/* Details Column */}
          <div className="flex flex-col gap-4">
            <h1 className="font-playfair text-2xl lg:text-3xl font-bold text-foreground">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <Rating value={Number(product.rating)} />
              <span className="text-sm text-muted-foreground">
                {product.numReviews} reviews
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Weight:</h3>
              <div className="flex flex-wrap gap-2">
                {['50g', '100g', '250g'].map((w) => (
                  <button
                    key={w}
                    disabled={w !== '100g'}
                    className={`px-4 py-2 rounded-md border text-sm transition-colors ${
                      w === '100g'
                        ? 'border-accent text-accent bg-accent/10 font-medium'
                        : 'border-border text-muted-foreground bg-background cursor-not-allowed opacity-50'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div className="inline-flex items-baseline rounded-full bg-secondary px-4 py-2 mb-2 self-start">
              <ProductPrice value={Number(product.price)} />
            </div>

            <div>
              <h2 className="font-playfair text-lg font-semibold text-foreground mb-2">
                Description
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Action Card Column */}
          <div className="lg:sticky lg:top-24 h-fit rounded-lg border border-border bg-card p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Price</span>
              <ProductPrice value={Number(product.price)} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Weight</span>
              <span className="text-sm font-medium text-foreground">100g</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status</span>
              {product.stock > 0 ? (
                <Badge variant="outline">In stock</Badge>
              ) : (
                <Badge variant="destructive">Unavailable</Badge>
              )}
            </div>
            {product.stock > 0 && (
              <div className="pt-2">
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
        </div>
      </section>

      <section className="mt-10">
        <h2 className="h2-bold mb-5">Customer Reviews</h2>
        <ReviewList productId={product.id} productSlug={product.slug} userId={userId || ''} />
      </section>
    </>
  );
};

export default ProductDetailsPage;
