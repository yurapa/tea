import Link from 'next/link';

const prices = [
  { name: '€1 to €10', value: '1-10' },
  { name: '€11 to €20', value: '11-20' },
  { name: '€21 to €30', value: '21-30' },
  { name: '€31 to €50', value: '31-50' },
  { name: '€51 to €100', value: '51-100' },
];

const ratings = [4, 3, 2, 1];

const FilterLink = ({ href, isActive, children }: { href: string; isActive: boolean; children: React.ReactNode }) => (
  <Link
    href={href}
    className={`text-sm transition-colors ${
      isActive ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'
    }`}
  >
    {children}
  </Link>
);

const CatalogFilterSidebar = ({
  category, price, rating, sort, q, page, categories,
}: {
  category: string;
  price: string;
  rating: string;
  sort: string;
  q: string;
  page: string;
  categories: { category: string; _count: { _all: number } }[];
}) => {
  const buildUrl = (overrides: Record<string, string>) => {
    const params = { q, category, price, rating, sort, page, ...overrides };
    return `/search?${new URLSearchParams(params).toString()}`;
  };

  return (
    <aside className="hidden lg:block w-[220px] shrink-0">
      <div className="space-y-8">
        <div>
          <h3 className="font-playfair text-lg font-semibold text-foreground mb-3">Category</h3>
          <ul className="space-y-1">
            <li>
              <FilterLink href={buildUrl({ category: 'all' })} isActive={category === 'all' || category === ''}>
                Any
              </FilterLink>
            </li>
            {categories.map((x) => (
              <li key={x.category}>
                <FilterLink href={buildUrl({ category: x.category })} isActive={category === x.category}>
                  {x.category}
                </FilterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-playfair text-lg font-semibold text-foreground mb-3">Price</h3>
          <ul className="space-y-1">
            <li>
              <FilterLink href={buildUrl({ price: 'all' })} isActive={price === 'all'}>Any</FilterLink>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <FilterLink href={buildUrl({ price: p.value })} isActive={p.value === price}>{p.name}</FilterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-playfair text-lg font-semibold text-foreground mb-3">Customer Review</h3>
          <ul className="space-y-1">
            <li>
              <FilterLink href={buildUrl({ rating: 'all' })} isActive={rating === 'all'}>Any</FilterLink>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <FilterLink href={buildUrl({ rating: `${r}` })} isActive={rating === r.toString()}>
                  {`${r} stars & up`}
                </FilterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default CatalogFilterSidebar;
