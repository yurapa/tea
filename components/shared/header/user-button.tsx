import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { auth } from '@/auth';
import { signOutUser } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserButton = async () => {
  const session = await auth();
  const t = await getTranslations();

  if (!session) {
    return (
      <Link href="/sign-in">
        <Button variant="outline" size="sm" className="h-9">
          {t('Auth.signIn')}
        </Button>
      </Link>
    );
  }

  const name = session.user?.name ?? '';
  const initials = name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 w-9 rounded-full bg-muted text-foreground font-semibold text-sm p-0 hover:bg-muted/80"
        >
          {initials}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/user/profile" className="w-full cursor-pointer">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/user/orders" className="w-full cursor-pointer">
            Orders
          </Link>
        </DropdownMenuItem>
        {(session?.user?.role === 'admin' || session?.user?.role === 'editor') && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/overview" className="w-full cursor-pointer">
                Admin
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <form action={signOutUser} className="w-full">
            <Button className="h-8 w-full justify-start px-2" variant="ghost">
              {t('Auth.signOut')}
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
