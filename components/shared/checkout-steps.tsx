import React from 'react';
import { Check, CreditCard, Package, Truck } from 'lucide-react';

import { cn } from '@/lib/utils';

const STEPS = [
  { label: 'Shipping', icon: Truck },
  { label: 'Payment', icon: CreditCard },
  { label: 'Place Order', icon: Package },
];

const CheckoutSteps = ({ current = 0 }: { current?: number }) => {
  const stepIndex = current - 1;

  return (
    <div className="flex items-center justify-center mb-12">
      {STEPS.map((step, index) => {
        const isDone = index < stepIndex;
        const isActive = index === stepIndex;
        const Icon = isDone ? Check : step.icon;

        return (
          <React.Fragment key={step.label}>
            <div
              className={cn(
                'flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium transition-colors',
                isActive && 'bg-primary text-primary-foreground shadow-lg shadow-primary/20',
                isDone && 'bg-primary/10 text-primary',
                !isActive && !isDone && 'bg-muted text-muted-foreground',
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  'w-12 sm:w-20 h-0.5 mx-2 rounded-full',
                  index < stepIndex ? 'bg-primary' : 'bg-border',
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;
