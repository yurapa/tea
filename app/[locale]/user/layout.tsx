import Link from 'next/link';

import Menu from '@/components/shared/header/menu';
import MainNav from './main-nav';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center">
            <span className="font-playfair text-xl font-bold tracking-wide text-primary">
              TEA<span className="text-accent">VIBE</span>
            </span>
          </Link>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Menu />
          </div>
        </div>
      </div>
      <div className="container mx-auto flex-1 space-y-4 p-8 pt-6">{children}</div>
    </div>
  );
}
