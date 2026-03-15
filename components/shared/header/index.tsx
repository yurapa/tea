import Link from 'next/link';

import Menu from '@/components/shared/header/menu';
import CategoriesDrawer from './categories-drawer';
import Search from './search';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/50">
      <div className="container mx-auto flex items-center gap-2 md:gap-4 px-4 lg:px-6 py-3">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <CategoriesDrawer />
          <Link href="/" className="flex items-center">
            <span className="font-playfair text-xl lg:text-2xl font-bold tracking-wide text-primary">
              TEA<span className="text-accent">VIBE</span>
            </span>
          </Link>
        </div>
        {/* Center: Search (desktop only) */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <Search />
        </div>
        {/* Right: Actions */}
        <Menu />
      </div>
      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <Search />
      </div>
    </header>
  );
};

export default Header;
