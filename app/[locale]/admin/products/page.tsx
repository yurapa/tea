import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { auth } from '@/auth';
import { formatCurrency, formatId } from '@/lib/utils';
import { getAllProducts, deleteProduct } from '@/lib/actions/product.actions';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/shared/pagination';
import DeleteDialog from '@/components/shared/delete-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: string; // Extended prisma client converts this to string
  stock: number;
  rating: string; // Extended prisma client converts this to string
};

const AdminProductsPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const session = await auth();
  const t = await getTranslations();

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || '';
  const category = searchParams.category || '';

  const products = await getAllProducts({
    query: searchText,
    page,
    category,
  });

  const isAdmin = session?.user.role === 'admin';

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <h1 className="h2-bold">{t('Products.title')}</h1>
          {searchText && (
            <div>
              {t('Products.filteredBy')} <i>&quot;{searchText}&quot;</i>{' '}
              <Link href="/app/admin/products">
                <Button variant="outline" size="sm">
                  {t('Products.removeFilter')}
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Button asChild variant="default">
          <Link href="/admin/products/create">{t('Products.create')}</Link>
        </Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Products.id')}</TableHead>
              <TableHead>{t('Products.name')}</TableHead>
              <TableHead className="text-right">{t('Products.price')}</TableHead>
              <TableHead>{t('Products.category')}</TableHead>
              <TableHead>{t('Products.stock')}</TableHead>
              <TableHead>{t('Products.rating')}</TableHead>
              <TableHead className="w-[100px]">{t('Products.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.data.map((product: Product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Link href={`/product/${product.slug}`}>{formatId(product.id)}</Link>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/products/${product.id}`}>{t('Common.edit')}</Link>
                  </Button>
                  <DeleteDialog id={product.id} action={deleteProduct} isDisabled={!isAdmin} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {products.totalPages > 1 && <Pagination page={page} totalPages={products.totalPages} />}
      </div>
    </div>
  );
};

export default AdminProductsPage;
