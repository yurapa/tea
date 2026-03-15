'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ViewAllProductsButton = ({ label }: { label: string }) => {
  return (
    <Link
      href="/search"
      className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 rounded-none px-8 py-4 text-sm tracking-widest uppercase font-medium transition-colors"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
};

export default ViewAllProductsButton;
