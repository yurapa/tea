import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { auth } from '@/auth';
import { getMyCart } from '@/lib/actions/cart.actions';
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/shared/header/mode-toggle';
import UserButton from '@/components/shared/header/user-button';
import LocaleSwitch from '@/components/shared/header/locale-switch';

const Menu = async () => {
  const t = await getTranslations();
  const session = await auth();
  const cart = await getMyCart().catch(() => undefined);
  const cartCount = cart?.items?.reduce((sum: number, item: { qty: number }) => sum + item.qty, 0) ?? 0;

  return (
    <div className="flex items-center gap-0.5 md:gap-1 lg:gap-2 shrink-0 ml-auto">
      <ModeToggle />
      <LocaleSwitch />
      <Button asChild variant="ghost" size="icon" className="h-9 w-9 text-foreground/70 hover:text-foreground hover:bg-muted relative">
        <Link href="/cart" aria-label={t('Navigation.cart')}>
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-0.5 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </Button>
      <UserButton />
    </div>
  );
};

export default Menu;
