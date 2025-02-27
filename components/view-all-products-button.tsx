'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

const ViewAllProductsButton = ({ label }: { label: string }) => {
  return (
    <Button asChild className="px-8 py-4 text-lg font-semibold">
      <Link href="/search">{label}</Link>
    </Button>
  );
};

export default ViewAllProductsButton;
