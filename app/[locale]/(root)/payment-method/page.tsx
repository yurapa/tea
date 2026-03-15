import { Metadata } from 'next';
import { CreditCard } from 'lucide-react';

import { auth } from '@/auth';
import { getUserById } from '@/lib/actions/user.actions';
import CheckoutSteps from '@/components/shared/checkout-steps';
import PaymentMethodForm from './payment-method-form';

export const metadata: Metadata = {
  title: 'Select Payment Method',
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User ID not found');
  }

  const user = await getUserById(userId);

  return (
    <div className="max-w-5xl mx-auto">
      <CheckoutSteps current={2} />
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <CreditCard className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Payment Method</h2>
          <p className="text-sm text-muted-foreground">How would you like to pay?</p>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 max-w-md">
        <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
      </div>
    </div>
  );
};

export default PaymentMethodPage;
