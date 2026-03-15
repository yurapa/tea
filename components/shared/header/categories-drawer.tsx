import Link from 'next/link';
import { MenuIcon } from 'lucide-react';

import { getAllCategories } from '@/lib/actions/product.actions';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';

interface Category {
  category: string;
  _count: number;
}

const CategoriesDrawer = async () => {
  const categories = await getAllCategories();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-background p-6">
        <SheetHeader className="mb-6 p-0">
          <SheetTitle className="font-playfair text-xl font-bold text-foreground">
            Select a category
          </SheetTitle>
        </SheetHeader>
        <nav className="space-y-1">
          {categories.map((x: Category) => (
            <SheetClose asChild key={x.category}>
              <Link
                href={`/search?category=${x.category}`}
                className="flex items-center justify-between py-2.5 px-2 rounded-md text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
              >
                <span>{x.category}</span>
                <span className="text-muted-foreground text-xs">({x._count})</span>
              </Link>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-6 pt-6 border-t border-border">
          <SheetClose asChild>
            <Link
              href="/search"
              className="block text-center py-2.5 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              View All Products
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategoriesDrawer;
