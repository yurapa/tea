import Image from "next/image";
import Link from "next/link";

import { APP_NAME } from "@/lib/constants";
import Menu from "@/components/shared/header/menu";
import CategoriesDrawer from "./categories-drawer";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <CategoriesDrawer />
          <Link href="/" className="flex-start ml-4">
            <Image
              src="/images/logo.svg"
              height={48}
              width={48}
              priority={true}
              alt={`${APP_NAME} logo`}
            />
            <span className="hidden lg:block text-2xl ml-3">{APP_NAME}</span>
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
