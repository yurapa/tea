import { SearchIcon } from 'lucide-react';

import { getAllCategories } from '@/lib/actions/product.actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Type for category object returned by groupBy
interface Category {
  category: string;
  _count: number;
}

const Search = async () => {
  const categories = await getAllCategories();

  return (
    <form action="/search" method="get" className="flex items-center flex-1 gap-0 w-full">
      <Select name="category">
        <SelectTrigger className="w-[140px] rounded-r-none border-r-0 bg-background h-10 text-sm focus:ring-0 focus:ring-offset-0">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {categories.map((x: Category) => (
            <SelectItem key={x.category} value={x.category}>
              {x.category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        name="q"
        type="text"
        placeholder="Search..."
        className="flex-1 h-10 px-3 rounded-none border border-input bg-background text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button
        type="submit"
        className="h-10 w-10 rounded-l-none rounded-r-md bg-primary text-primary-foreground px-0 shrink-0"
        aria-label="Search"
      >
        <SearchIcon className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default Search;
