'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreditCard, MapPin, Package } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { approvePayPalOrder, createPayPalOrder } from '@/lib/actions/order.actions';
import { PRICE_TAX_RATE } from '@/lib/constants';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types';
import StripePayment from './stripe-payment';
import { MarkAsPaidButton, MarkAsDeliveredButton } from './order-action-buttons';

const OrderDetailsTable = ({
  order,
  paypalClientId,
  stripeClientSecret,
  isSuperUser,
}: {
  order: Omit<Order, 'paymentResult'>;
  paypalClientId: string;
  stripeClientSecret: string | null;
  isSuperUser: boolean;
}) => {
  const {
    id, shippingAddress, orderItems, itemsPrice, taxPrice,
    shippingPrice, totalPrice, paymentMethod, isPaid, paidAt, isDelivered, deliveredAt,
  } = order;

  const { toast } = useToast();

  function PrintLoadingState() {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    if (isPending) return 'Loading PayPal...';
    if (isRejected) return 'Error in loading PayPal.';
    return null;
  }

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(order.id);
    if (!res.success) {
      toast({ description: res.message, variant: 'destructive' });
      return;
    }
    return res.data;
  };

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePayPalOrder(order.id, data);
    toast({ description: res.message, variant: res.success ? 'default' : 'destructive' });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-foreground mb-6">Order {formatId(id)}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground text-sm">Payment Method</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{paymentMethod}</p>
            {isPaid && paidAt ? (
              <Badge className="bg-primary/10 text-primary border-0">Paid {formatDateTime(paidAt).dateTime}</Badge>
            ) : (
              <Badge variant="destructive">Not paid</Badge>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground text-sm">Shipping Address</h2>
            </div>
            <p className="text-sm text-muted-foreground">{shippingAddress.fullName}</p>
            <p className="text-sm text-muted-foreground mb-2">
              {shippingAddress.streetAddress}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
            {isDelivered && deliveredAt ? (
              <Badge className="bg-accent/10 text-accent border-0">Delivered {formatDateTime(deliveredAt).dateTime}</Badge>
            ) : (
              <Badge variant="destructive">Not delivered</Badge>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground text-sm">Order Items</h2>
            </div>
            <div className="space-y-3">
              {orderItems.map((item) => (
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
          <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(itemsPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">VAT ({PRICE_TAX_RATE * 100}%)</span>
              <span>{formatCurrency(taxPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{formatCurrency(shippingPrice)}</span>
            </div>
            <div className="flex justify-between border-t pt-3 font-bold text-base">
              <span>Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {!isPaid && paymentMethod === 'PayPal' && (
              <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'EUR' }}>
                <PrintLoadingState />
                <PayPalButtons createOrder={handleCreatePayPalOrder} onApprove={handleApprovePayPalOrder} />
              </PayPalScriptProvider>
            )}
            {!isPaid && paymentMethod === 'Stripe' && stripeClientSecret && (
              <StripePayment priceInCents={Number(order.totalPrice) * 100} orderId={order.id} clientSecret={stripeClientSecret} />
            )}
            {isSuperUser && !isPaid && paymentMethod === 'CashOnDelivery' && <MarkAsPaidButton orderId={order.id} />}
            {isSuperUser && isPaid && !isDelivered && <MarkAsDeliveredButton orderId={order.id} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
