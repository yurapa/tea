'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';
import { addItemToCart, removeItemFromCart, removeLineFromCart } from '@/lib/actions/cart.actions';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableHead, TableHeader, TableCell, TableRow } from '@/components/ui/table';
import { Cart } from '@/types';

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  if (!cart || cart.items.length === 0) {
    return (
      <div>
        <h1 className="font-playfair text-3xl font-bold text-foreground mb-12 pt-4">Shopping Cart</h1>
        <div className="flex flex-col items-center justify-center pb-48">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
            <ShoppingBag className="h-9 w-9 text-muted-foreground" />
          </div>
          <h2 className="font-playfair text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-sm text-center">
            Looks like you haven&apos;t added anything yet. Discover our collection and find something you love.
          </p>
          <Button asChild>
            <Link href="/search">
              Browse Catalog <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-playfair text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-accent font-medium">Item</TableHead>
                <TableHead className="text-accent font-medium text-center">Quantity</TableHead>
                <TableHead className="text-accent font-medium text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.items.map((item) => (
                <TableRow key={item.slug}>
                  <TableCell>
                    <Link href={`/product/${item.slug}`} className="flex items-center gap-3 hover:text-accent transition-colors">
                      <Image src={item.image} alt={item.name} width={56} height={56} className="rounded-lg" />
                      <span>{item.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        disabled={isPending}
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-md"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await removeItemFromCart(item.productId);
                            if (!res.success) {
                              toast({ variant: 'destructive', description: res.message });
                            }
                          })
                        }
                      >
                        {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Minus className="h-4 w-4" />}
                      </Button>
                      <span className="w-8 text-center font-medium">{item.qty}</span>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-md"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await addItemToCart(item);
                            if (!res.success) {
                              toast({ variant: 'destructive', description: res.message });
                            }
                          })
                        }
                      >
                        {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                      </Button>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-md text-destructive hover:text-destructive"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await removeLineFromCart(item.productId);
                            if (!res.success) {
                              toast({ variant: 'destructive', description: res.message });
                            }
                          })
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">&euro;{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 h-fit">
          <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>
          <div className="text-lg mb-6">
            Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)} items): {formatCurrency(cart.itemsPrice)}
          </div>
          <Button
            className="w-full bg-primary text-primary-foreground"
            disabled={isPending}
            onClick={() => startTransition(() => router.push('/shipping-address'))}
          >
            {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartTable;
