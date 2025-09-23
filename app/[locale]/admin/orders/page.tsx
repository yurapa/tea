import Link from 'next/link';
import { Metadata } from 'next';

import { auth } from '@/auth';
import { formatId, formatCurrency, formatDateTime } from '@/lib/utils';
import { deleteOrder, getAllOrders } from '@/lib/actions/order.actions';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/shared/pagination';
import DeleteDialog from '@/components/shared/delete-dialog';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '@/components/ui/table';
import { Order } from '@/types';

// Type for admin orders with limited user info
type AdminOrder = Omit<Order, 'user' | 'orderItems' | 'paymentResult'> & {
  user: { name: string };
};

export const metadata: Metadata = {
  title: 'Admin Orders',
};

const AdminOrdersPage = async (props: { searchParams: Promise<{ page: string; query: string }> }) => {
  const { page = '1', query: searchText } = await props.searchParams;

  const session = await auth();

  const isAdmin = session?.user.role === 'admin';
  const isSuperUser = session?.user.role === 'admin' || session?.user.role === 'editor';

  if (!isSuperUser) {
    throw new Error('admin or editor permission required');
  }

  const orders = await getAllOrders({
    page: Number(page),
    query: searchText,
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="h2-bold">Orders</h1>
        {searchText && (
          <div>
            Filtered by <i>&quot;{searchText}&quot;</i>{' '}
            <Link href={`/admin/orders`}>
              <Button variant="outline" size="sm">
                Remove Filter
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>BUYER</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order: AdminOrder) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt ? formatDateTime(order.paidAt).dateTime : 'Not Paid'}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : 'Not Delivered'}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/order/${order.id}`}>Details</Link>
                  </Button>
                  <DeleteDialog id={order.id} action={deleteOrder} isDisabled={!isAdmin} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && <Pagination page={Number(page) || 1} totalPages={orders?.totalPages} />}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
