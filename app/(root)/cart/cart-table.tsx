'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader, Minus, Plus } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableCell, TableRow } from '@/components/ui/table';
import { Cart } from '@/types';

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <h1 className="h2-bold py-4">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mb-10 text-2xl">:(</div>
          <p className="mb-10">Currently, you don&#39;t have any products in the cart</p>
          <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link href={`/product/${item.slug}`} className="flex items-center">
                        <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="flex-center gap-2">
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await removeItemFromCart(item.productId);
                            if (!res.success) {
                              toast({
                                variant: 'destructive',
                                description: res.message,
                              });
                            }
                          })
                        }
                      >
                        {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Minus className="h-4 w-4" />}
                      </Button>
                      <span>{item.qty}</span>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await addItemToCart(item);
                            if (!res.success) {
                              toast({
                                variant: 'destructive',
                                description: res.message,
                              });
                            }
                          })
                        }
                      >
                        {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">&euro;{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <CardContent className="gap-4 p-4">
              <h3 className="mb-6 text-xl font-medium md:text-2xl">Order Summary</h3>
              <div className="my-8 text-xl">
                Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):
                {formatCurrency(cart.itemsPrice)}
              </div>
              <Button
                className="w-full"
                disabled={isPending}
                onClick={() => startTransition(() => router.push('/shipping-address'))}
              >
                {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CartTable;
