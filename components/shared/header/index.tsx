import Image from 'next/image';
import Link from 'next/link';

import { APP_NAME } from '@/lib/constants';
import Menu from '@/components/shared/header/menu';
import CategoriesDrawer from './categories-drawer';
import Search from './search';

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <CategoriesDrawer />
          <Link href="/" className="flex-start ml-4">
            <Image src="/images/logo.svg" height={48} width={48} priority={true} alt={`${APP_NAME} logo`} />
            <span className="ml-3 hidden text-2xl lg:block">{APP_NAME}</span>
          </Link>
        </div>
        <div className="hidden md:block">
          <Search />
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
