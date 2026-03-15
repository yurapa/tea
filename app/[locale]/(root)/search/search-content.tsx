import Link from 'next/link';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Pagination from '@/components/shared/pagination';

const sortOrders = ['newest', 'lowest', 'highest', 'rating'];

type SearchContentProps = {
  q: string;
  category: string;
  price: string;
  rating: string;
  sort: string;
  page: string;
  totalPages: number;
  totalCount: number;
  children: React.ReactNode;
};

const SearchContent = ({
  q,
  category,
  price,
  rating,
  sort,
  page,
  totalPages,
  totalCount,
  children,
}: SearchContentProps) => {
  const getFilterUrl = ({
    c, p, s, r, pg,
  }: { c?: string; p?: string; s?: string; r?: string; pg?: string }) => {
    const params: Record<string, string> = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const hasActiveFilters =
    (category !== 'all' && category !== '') ||
    price !== 'all' ||
    rating !== 'all' ||
    (q !== 'all' && q !== '');

  return (
    <div className="flex-1 min-w-0">
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {q !== 'all' && q !== '' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20">
              {q}
              <Link href={getFilterUrl({ c: category, p: price, r: rating, s: sort })}>
                <X className="h-3 w-3" />
              </Link>
            </span>
          )}
          {category !== 'all' && category !== '' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20">
              {category}
              <Link href={getFilterUrl({ c: 'all' })}>
                <X className="h-3 w-3" />
              </Link>
            </span>
          )}
          {price !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20">
              {price}
              <Link href={getFilterUrl({ p: 'all' })}>
                <X className="h-3 w-3" />
              </Link>
            </span>
          )}
          {rating !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20">
              {rating}&#9733; &amp; up
              <Link href={getFilterUrl({ r: 'all' })}>
                <X className="h-3 w-3" />
              </Link>
            </span>
          )}
          <Button variant="link" asChild className="text-xs h-auto p-0">
            <Link href="/search">Clear all</Link>
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {totalCount} product{totalCount !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground mr-1">Sort:</span>
          {sortOrders.map((s) => (
            <Link
              key={s}
              href={getFilterUrl({ s })}
              className={`px-2 py-1 rounded transition-colors capitalize ${
                sort === s ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {totalCount === 0 && (
          <div className="col-span-full text-muted-foreground">No products found</div>
        )}
        {children}
      </div>

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </div>
  );
};

export default SearchContent;
