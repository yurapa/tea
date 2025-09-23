import Link from 'next/link';
import { Metadata } from 'next';

import { getMyOrders } from '@/lib/actions/order.actions';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/shared/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Order } from '@/types';

export const metadata: Metadata = {
  title: 'My Orders',
};

const OrdersPage = async (props: { searchParams: Promise<{ page: string }> }) => {
  const { page = '1' } = await props.searchParams;
  const orders = await getMyOrders({
    page: Number(page),
  });

  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Orders</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt ? formatDateTime(order.paidAt).dateTime : 'not paid'}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : 'not delivered'}
                </TableCell>
                <TableCell>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/order/${order.id}`}>
                      <span className="px-2">Details</span>
                    </Link>
                  </Button>
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

export default OrdersPage;
