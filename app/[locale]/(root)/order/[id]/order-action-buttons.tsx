'use client';

import { useTransition } from 'react';

import { useToast } from '@/hooks/use-toast';
import { deliverOrder, updateOrderToPaidByCOD } from '@/lib/actions/order.actions';
import { Button } from '@/components/ui/button';

export const MarkAsPaidButton = ({ orderId }: { orderId: string }) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <Button
      type="button"
      className="w-full"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await updateOrderToPaidByCOD(orderId);
          toast({
            variant: res.success ? 'default' : 'destructive',
            description: res.message,
          });
        })
      }
    >
      {isPending ? 'Processing...' : 'Mark As Paid'}
    </Button>
  );
};

export const MarkAsDeliveredButton = ({ orderId }: { orderId: string }) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <Button
      type="button"
      className="w-full"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await deliverOrder(orderId);
          toast({
            variant: res.success ? 'default' : 'destructive',
            description: res.message,
          });
        })
      }
    >
      {isPending ? 'Processing...' : 'Mark As Delivered'}
    </Button>
  );
};
