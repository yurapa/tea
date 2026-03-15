import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { MapPin } from 'lucide-react';

import { auth } from '@/auth';
import { getMyCart } from '@/lib/actions/cart.actions';
import { getUserById } from '@/lib/actions/user.actions';
import CheckoutSteps from '@/components/shared/checkout-steps';
import { ShippingAddress, CartItem } from '@/types';
import ShippingAddressForm from './shipping-address-form';

export const metadata: Metadata = {
  title: 'Shipping Address',
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect('/cart');

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User ID not found');
  }

  const user = await getUserById(userId);

  return (
    <div className="max-w-5xl mx-auto">
      <CheckoutSteps current={1} />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Shipping Address</h2>
              <p className="text-sm text-muted-foreground">Where should we deliver?</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <ShippingAddressForm address={user.address as ShippingAddress} />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 h-fit lg:sticky lg:top-24">
          <h3 className="text-lg font-bold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            {(cart.items as CartItem[]).map((item) => (
              <div key={item.slug} className="flex justify-between">
                <span className="text-muted-foreground">{item.name} x{item.qty}</span>
                <span>&euro;{item.price}</span>
              </div>
            ))}
            <div className="border-t pt-3 font-bold flex justify-between">
              <span>Subtotal</span>
              <span>&euro;{Number(cart.itemsPrice).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressPage;
