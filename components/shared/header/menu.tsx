import Link from 'next/link';
import { EllipsisVertical, ShoppingCart } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import ModeToggle from '@/components/shared/header/mode-toggle';
import UserButton from '@/components/shared/header/user-button';
import LocaleSwitch from '@/components/shared/header/locale-switch';
import Search from './search';

const Menu = async () => {
  const t = await getTranslations();
  
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden w-full max-w-xs gap-1 md:flex">
        <ModeToggle />
        <LocaleSwitch />
        <Button asChild variant="ghost">
          <Link href="/cart">
            <ShoppingCart />
            {t('Navigation.cart')}
          </Link>
        </Button>
        <UserButton />
      </nav>

      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <div className="mt-10">
              <Search />
            </div>
            <SheetTitle>{t('Common.menu')}</SheetTitle>
            <ModeToggle />
            <LocaleSwitch />
            <Button asChild variant="ghost">
              <Link href="/cart">
                <ShoppingCart />
                {t('Navigation.cart')}
              </Link>
            </Button>
            <UserButton />
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
