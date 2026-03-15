import { getAllCategories, getAllProducts } from '@/lib/actions/product.actions';
import { getMyCart } from '@/lib/actions/cart.actions';
import ProductCard from '@/components/shared/product/product-card';
import { Product } from '@/types';
import CatalogFilterSidebar from './catalog-filter-sidebar';
import SearchContent from './search-content';

export async function generateMetadata(props: {
  searchParams: Promise<{ q: string; category: string; price: string; rating: string }>;
}) {
  const { q = 'all', category = 'all', price = 'all', rating = 'all' } = await props.searchParams;

  const isQuerySet = q && q !== 'all' && q.trim() !== '';
  const isCategorySet = category && category !== 'all' && category.trim() !== '';
  const isPriceSet = price && price !== 'all' && price.trim() !== '';
  const isRatingSet = rating && rating !== 'all' && rating.trim() !== '';

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${isQuerySet ? q : ''}${isCategorySet ? `: Category ${category}` : ''}${isPriceSet ? `: Price ${price}` : ''}${isRatingSet ? `: Rating ${rating}` : ''}`,
    };
  }
  return { title: 'Search Products' };
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string; category?: string; price?: string; rating?: string; sort?: string; page?: string;
  }>;
}) => {
  const {
    q = 'all', category = 'all', price = 'all',
    rating = 'all', sort = 'newest', page = '1',
  } = await props.searchParams;

  const [products, categories, cart] = await Promise.all([
    getAllProducts({ category, query: q, price, rating, page: Number(page), sort }),
    getAllCategories(),
    getMyCart().catch(() => undefined),
  ]);

  return (
    <div className="flex gap-10 py-10">
      <CatalogFilterSidebar
        category={category}
        price={price}
        rating={rating}
        sort={sort}
        q={q}
        page={page}
        categories={categories}
      />

      <SearchContent
        q={q}
        category={category}
        price={price}
        rating={rating}
        sort={sort}
        page={page}
        totalCount={products!.data.length}
        totalPages={products!.totalPages ?? 1}
      >
        {products!.data.map((product: Product) => (
          <ProductCard key={product.id} product={product} cart={cart} />
        ))}
      </SearchContent>
    </div>
  );
};

export default SearchPage;
