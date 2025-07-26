'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const links = [
  {
    titleKey: 'overview' as const,
    href: '/admin/overview',
  },
  {
    titleKey: 'products' as const,
    href: '/admin/products',
  },
  {
    titleKey: 'orders' as const,
    href: '/admin/orders',
  },
  {
    titleKey: 'users' as const,
    href: '/admin/users',
  },
] as const;

export default function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const t = useTranslations('AdminNav');
  const locale = pathname.split('/')[1];

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === `/${locale}${item.href}` ? '' : 'text-muted-foreground',
          )}
        >
          {t(item.titleKey)}
        </Link>
      ))}
    </nav>
  );
}
