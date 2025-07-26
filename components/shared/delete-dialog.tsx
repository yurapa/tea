'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function DeleteDialog({
  id,
  action,
  isDisabled = false,
}: {
  id: string;
  action: (id: string) => Promise<{ success: boolean; message: string }>;
  isDisabled?: boolean;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDeleteClick = () => {
    startTransition(async () => {
      const res = await action(id);

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
      } else {
        setOpen(false);
        toast({
          description: res.message,
        });
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive" disabled={isDisabled}>
          {t('Common.delete')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('DeleteDialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('DeleteDialog.description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('Common.cancel')}</AlertDialogCancel>
          <Button variant="destructive" size="sm" disabled={isPending} onClick={handleDeleteClick}>
            {isPending ? t('DeleteDialog.deleting') : t('DeleteDialog.confirmDelete')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
