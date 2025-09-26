import { Metadata } from 'next';

import { getMyCart } from '@/lib/actions/cart.actions';
import CartTable from './cart-table';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  alternates: {
    canonical: '/',
    languages: {
      'en': '/cart',
      'ru': '/ru/cart',
      'uk': '/uk/cart',
      'el': '/el/cart',
    },
  },
};

const CartPage = async () => {
  const cart = await getMyCart();

  return <CartTable cart={cart} />;
};

export default CartPage;
