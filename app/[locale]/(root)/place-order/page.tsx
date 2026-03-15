import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { CreditCard, MapPin, Package } from 'lucide-react';

import { auth } from '@/auth';
import { formatCurrency } from '@/lib/utils';
import { getMyCart } from '@/lib/actions/cart.actions';
import { getUserById } from '@/lib/actions/user.actions';
import CheckoutSteps from '@/components/shared/checkout-steps';
import { ShippingAddress, CartItem } from '@/types';
import PlaceOrderForm from './place-order-form';
import { PRICE_TAX_RATE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Place Order',
};

const PlaceOrderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('User ID not found');

  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) redirect('/cart');
  if (!user.address) redirect('/shipping-address');
  if (!user.paymentMethod) redirect('/payment-method');

  const userAddress = user.address as ShippingAddress;

  return (
    <div className="max-w-5xl mx-auto">
      <CheckoutSteps current={3} />
      <h1 className="text-2xl font-bold text-foreground mb-8">Review Your Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <h2 className="font-semibold text-foreground text-sm">Shipping Address</h2>
              </div>
              <Link href="/shipping-address" className="text-xs text-accent hover:underline font-medium">Edit</Link>
            </div>
            <p className="text-sm text-muted-foreground">{userAddress.fullName}</p>
            <p className="text-sm text-muted-foreground">
              {userAddress.streetAddress}, {userAddress.city}, {userAddress.postalCode}, {userAddress.country}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <h2 className="font-semibold text-foreground text-sm">Payment Method</h2>
              </div>
              <Link href="/payment-method" className="text-xs text-accent hover:underline font-medium">Edit</Link>
            </div>
            <p className="text-sm text-muted-foreground">{user.paymentMethod}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <h2 className="font-semibold text-foreground text-sm">Order Items</h2>
              </div>
              <Link href="/cart" className="text-xs text-accent hover:underline font-medium">Edit</Link>
            </div>
            <div className="space-y-3">
              {cart.items.map((item: CartItem) => (
                <div key={item.slug} className="flex items-center gap-4">
                  <Link href={`/product/${item.slug}`}>
                    <Image src={item.image} width={56} height={56} alt={item.name} className="rounded-lg" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.slug}`} className="text-sm font-medium hover:text-accent transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                  </div>
                  <span className="text-sm font-medium">&euro;{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 h-fit lg:sticky lg:top-24">
          <h3 className="text-lg font-bold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(cart.itemsPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">VAT ({PRICE_TAX_RATE * 100}%)</span>
              <span>{formatCurrency(cart.taxPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{formatCurrency(cart.shippingPrice)}</span>
            </div>
            <div className="flex justify-between border-t pt-3 font-bold text-base">
              <span>Total</span>
              <span>{formatCurrency(cart.totalPrice)}</span>
            </div>
          </div>
          <div className="mt-6">
            <PlaceOrderForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
