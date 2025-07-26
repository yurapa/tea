import { notFound } from 'next/navigation';

import { auth } from '@/auth';
import { getMyCart } from '@/lib/actions/cart.actions';
import { getProductBySlug } from '@/lib/actions/product.actions';
import { Badge } from '@/components/ui/badge';
import Rating from '@/components/shared/product/rating';
import { Card, CardContent } from '@/components/ui/card';
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
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">
            <ProductImages images={product.images!} />
          </div>

          {/* Details Column */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <h1 className="h3-bold">{product.name}</h1>
              <Rating value={Number(product.rating)} />
              <p>{product.numReviews} reviews</p>{' '}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ProductPrice
                  value={Number(product.price)}
                  className="w-24 rounded-full bg-green-100 px-5 py-2 text-green-700"
                />
              </div>
            </div>
            <div className="mt-10">
              <p>Description:</p>
              <p>{product.description}</p>
            </div>
          </div>
          {/* Action Column */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between">
                  <div>Price</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div>Status</div>
                  {product.stock > 0 ? (
                    <Badge variant="outline">In stock</Badge>
                  ) : (
                    <Badge variant="destructive">Unavailable</Badge>
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
