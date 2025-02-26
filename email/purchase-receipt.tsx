import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { Order } from '@/types';
import { formatCurrency } from '@/lib/utils';
import sampleDataProducts from '@/db/sample-data-products';
require('dotenv').config();

type OrderInformationProps = {
  order: Order;
};

PurchaseReceiptEmail.PreviewProps = {
  order: {
    id: crypto.randomUUID(),
    userId: '123',
    user: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    paymentMethod: 'Stripe',
    shippingAddress: {
      fullName: 'John Doe',
      streetAddress: '12 Main St',
      city: 'Larnaca',
      postalCode: '7020',
      country: 'CY',
    },
    createdAt: new Date(),
    totalPrice: '129',
    taxPrice: '19',
    shippingPrice: '10',
    itemsPrice: '100',
    orderItems: sampleDataProducts.map((x) => ({
      name: x.name,
      orderId: '123',
      productId: '123',
      slug: x.slug,
      qty: x.stock,
      image: x.images[0],
      price: x.price.toString(),
    })),
    isDelivered: true,
    deliveredAt: new Date(),
    isPaid: true,
    paidAt: new Date(),
    paymentResult: {
      id: '123',
      status: 'succeeded',
      pricePaid: '129',
      email_address: 'john@example.com',
    },
  },
} satisfies OrderInformationProps;

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

export default function PurchaseReceiptEmail({ order }: OrderInformationProps) {
  return (
    <Html>
      <Preview>View order receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="bg-white font-sans">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className="mb-0 mr-4 whitespace-nowrap text-nowrap text-gray-500">Order ID</Text>
                  <Text className="mr-4 mt-0">{order.id.toString()}</Text>
                </Column>
                <Column>
                  <Text className="mb-0 mr-4 whitespace-nowrap text-nowrap text-gray-500">Purchased On</Text>
                  <Text className="mr-4 mt-0">{dateFormatter.format(order.createdAt)}</Text>
                </Column>
                <Column>
                  <Text className="mb-0 mr-4 whitespace-nowrap text-nowrap text-gray-500">Price Paid</Text>
                  <Text className="mr-4 mt-0">{formatCurrency(order.totalPrice)}</Text>
                </Column>
              </Row>
            </Section>
            <Section className="my-4 rounded-lg border border-solid border-gray-500 p-4 md:p-6">
              {order.orderItems.map((item) => (
                <Row key={item.productId} className="mt-8">
                  <Column className="w-20">
                    <Img
                      width="80"
                      alt={item.name}
                      className="rounded"
                      src={
                        item.image.startsWith('/') ? `${process.env.NEXT_PUBLIC_SERVER_URL}${item.image}` : item.image
                      }
                    />
                  </Column>
                  <Column className="align-top">
                    <Text className="mx-2 my-0">
                      {item.name} x {item.qty}
                    </Text>
                  </Column>
                  <Column align="right" className="align-top">
                    <Text className="m-0">{formatCurrency(item.price)}</Text>
                  </Column>
                </Row>
              ))}
              {[
                { name: 'Items', price: order.itemsPrice },
                { name: 'Tax', price: order.taxPrice },
                { name: 'Shipping', price: order.shippingPrice },
                { name: 'Total', price: order.totalPrice },
              ].map(({ name, price }) => (
                <Row key={name} className="py-1">
                  <Column align="right">{name}:</Column>
                  <Column align="right" width={70} className="align-top">
                    <Text className="m-0">{formatCurrency(price)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
