'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Minus, Loader } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { Cart, CartItem } from '@/types';

const AddToCart = ({ cart, item }: { cart?: Cart; item: Omit<CartItem, 'cartId'> }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const existItem = cart && cart.items.find((x) => x.productId === item.productId);
  const qty = existItem?.qty ?? 0;
  const total = qty * Number(item.price);

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (!res.success) {
        toast({ variant: 'destructive', description: res.message });
        return;
      }
      toast({
        description: res.message,
        action: (
          <ToastAction
            className="bg-primary text-white hover:bg-gray-800"
            onClick={() => router.push('/cart')}
            altText="Go to cart"
          >
            Go to cart
          </ToastAction>
        ),
      });
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      toast({
        variant: res.success ? 'default' : 'destructive',
        description: res.message,
      });
    });
  };

  return (
    <div className="space-y-3">
      {existItem && (
        <>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Qty</span>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9"
                disabled={isPending}
                onClick={handleRemoveFromCart}
              >
                {isPending ? <Loader className="h-3.5 w-3.5 animate-spin" /> : <Minus className="h-3.5 w-3.5" />}
              </Button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9"
                disabled={isPending}
                onClick={handleAddToCart}
              >
                {isPending ? <Loader className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>
          <div className="border-t border-border" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">Total</span>
            <span className="text-foreground">
              <span className="text-xs align-top">€</span>
              <span className="text-xl font-bold">{Math.floor(total)}</span>
              <span className="text-xs">.{(total % 1).toFixed(2).slice(2)}</span>
            </span>
          </div>
        </>
      )}
      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" type="button" onClick={handleAddToCart} disabled={isPending}>
        {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        Add to cart
      </Button>
    </div>
  );
};

export default AddToCart;
