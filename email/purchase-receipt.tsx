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
  Text,
} from '@react-email/components';

import { SERVER_URL } from '@/lib/constants';
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
      <Head />
      <Preview>View your TeaVibe order receipt</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>
              <span style={logoTea}>TEA</span>
              <span style={logoVibe}>VIBE</span>
            </Text>
          </Section>

          {/* Body */}
          <Section style={bodySection}>
            <Heading style={h1}>Purchase Receipt</Heading>

            {/* Order meta */}
            <Section style={metaBox}>
              <Row>
                <Column style={metaCol}>
                  <Text style={metaLabel}>Order ID</Text>
                  <Text style={metaValue}>{order.id.toString().slice(0, 8)}...</Text>
                </Column>
                <Column style={metaCol}>
                  <Text style={metaLabel}>Purchased On</Text>
                  <Text style={metaValue}>{dateFormatter.format(order.createdAt)}</Text>
                </Column>
                <Column style={metaCol}>
                  <Text style={metaLabel}>Price Paid</Text>
                  <Text style={metaValueHighlight}>{formatCurrency(order.totalPrice)}</Text>
                </Column>
              </Row>
            </Section>

            {/* Order items */}
            <Section style={itemsBox}>
              {order.orderItems.map((item) => (
                <Row key={item.productId} style={itemRow}>
                  <Column style={{ width: '88px' }}>
                    <Img
                      width="72"
                      alt={item.name}
                      style={itemImage}
                      src={item.image.startsWith('/') ? `${SERVER_URL}${item.image}` : item.image}
                    />
                  </Column>
                  <Column style={{ verticalAlign: 'middle' as const }}>
                    <Text style={itemName}>
                      {item.name} &times; {item.qty}
                    </Text>
                  </Column>
                  <Column align="right" style={{ verticalAlign: 'middle' as const }}>
                    <Text style={itemPrice}>{formatCurrency(item.price)}</Text>
                  </Column>
                </Row>
              ))}

              {/* Divider */}
              <Row>
                <Column>
                  <Section style={divider} />
                </Column>
              </Row>

              {/* Totals */}
              {[
                { name: 'Items', price: order.itemsPrice },
                { name: 'Tax', price: order.taxPrice },
                { name: 'Shipping', price: order.shippingPrice },
              ].map(({ name, price }) => (
                <Row key={name} style={summaryRow}>
                  <Column align="right" style={summaryLabelCol}>
                    <Text style={summaryLabel}>{name}</Text>
                  </Column>
                  <Column align="right" style={summaryValueCol}>
                    <Text style={summaryValue}>{formatCurrency(price)}</Text>
                  </Column>
                </Row>
              ))}

              <Row style={totalRow}>
                <Column align="right" style={summaryLabelCol}>
                  <Text style={totalLabel}>Total</Text>
                </Column>
                <Column align="right" style={summaryValueCol}>
                  <Text style={totalValue}>{formatCurrency(order.totalPrice)}</Text>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Row>
              <Column style={{ width: '50%' }}>
                <Text style={footerLogoText}>
                  <span style={footerLogoTea}>TEA</span>
                  <span style={footerLogoVibe}>VIBE</span>
                </Text>
              </Column>
              <Column align="right" style={{ width: '50%', verticalAlign: 'middle' as const }}>
                <Text style={footerLinks}>
                  <a href={`${SERVER_URL}/about`} style={footerLink}>About Us</a>
                  {'  |  '}
                  <a href={`${SERVER_URL}/contact`} style={footerLink}>Contact</a>
                  {'  |  '}
                  <a href={`${SERVER_URL}/help`} style={footerLink}>Help Center</a>
                </Text>
              </Column>
            </Row>
            <Text style={footerText}>
              &copy; 2025 TeaVibe, a Premium Tea Company. &nbsp;Larnaca, Cyprus &nbsp;&#183;&nbsp; All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Brand colors
const DARK_GREEN = '#1e3a2f';
const GOLD = '#c2a24e';
const BEIGE = '#f3ede4';
const BORDER = '#ddd5c8';
const TEXT_MUTED = '#6b7280';
const FONT_STACK = "Arial, Helvetica, sans-serif";

const main = {
  backgroundColor: BEIGE,
  margin: '0 auto',
  fontFamily: FONT_STACK,
};

const container = {
  margin: '0 auto',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  border: `1px solid ${BORDER}`,
};

const header = {
  backgroundColor: DARK_GREEN,
  padding: '28px 32px',
  textAlign: 'center' as const,
};

const logoText = {
  margin: '0',
  fontSize: '28px',
  fontWeight: '700' as const,
  letterSpacing: '3px',
  textAlign: 'center' as const,
};

const logoTea = {
  color: '#ffffff',
};

const logoVibe = {
  color: GOLD,
};

const bodySection = {
  padding: '36px 40px 24px',
};

const h1 = {
  color: DARK_GREEN,
  fontSize: '24px',
  fontWeight: '700' as const,
  margin: '0 0 24px',
  padding: '0',
  lineHeight: '32px',
};

const metaBox = {
  backgroundColor: BEIGE,
  border: `1px solid ${BORDER}`,
  borderRadius: '6px',
  padding: '16px 20px',
  marginBottom: '24px',
};

const metaCol = {
  paddingRight: '16px',
  verticalAlign: 'top' as const,
};

const metaLabel = {
  fontSize: '11px',
  color: TEXT_MUTED,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 4px',
};

const metaValue = {
  fontSize: '13px',
  color: DARK_GREEN,
  margin: '0',
  fontWeight: '600' as const,
};

const metaValueHighlight = {
  fontSize: '14px',
  color: GOLD,
  margin: '0',
  fontWeight: '700' as const,
};

const itemsBox = {
  border: `1px solid ${BORDER}`,
  borderRadius: '6px',
  padding: '16px 20px',
  marginBottom: '8px',
};

const itemRow = {
  marginBottom: '16px',
  paddingBottom: '16px',
  borderBottom: `1px solid ${BORDER}`,
};

const itemImage = {
  borderRadius: '4px',
  border: `1px solid ${BORDER}`,
  display: 'block' as const,
};

const itemName = {
  fontSize: '14px',
  color: DARK_GREEN,
  margin: '0 0 0 12px',
  fontWeight: '500' as const,
};

const itemPrice = {
  fontSize: '14px',
  color: DARK_GREEN,
  margin: '0',
  fontWeight: '600' as const,
};

const divider = {
  borderTop: `1px solid ${BORDER}`,
  margin: '4px 0 12px',
};

const summaryRow = {
  paddingTop: '6px',
};

const summaryLabelCol = {
  width: '80%',
  paddingRight: '12px',
};

const summaryValueCol = {
  width: '20%',
  minWidth: '70px',
};

const summaryLabel = {
  fontSize: '13px',
  color: TEXT_MUTED,
  margin: '0',
};

const summaryValue = {
  fontSize: '13px',
  color: DARK_GREEN,
  margin: '0',
};

const totalRow = {
  paddingTop: '10px',
  borderTop: `2px solid ${BORDER}`,
  marginTop: '8px',
};

const totalLabel = {
  fontSize: '15px',
  color: DARK_GREEN,
  fontWeight: '700' as const,
  margin: '0',
};

const totalValue = {
  fontSize: '15px',
  color: GOLD,
  fontWeight: '700' as const,
  margin: '0',
};

const footer = {
  backgroundColor: DARK_GREEN,
  padding: '24px 32px 16px',
};

const footerLogoText = {
  margin: '0 0 4px',
  fontSize: '18px',
  fontWeight: '700' as const,
  letterSpacing: '2px',
};

const footerLogoTea = {
  color: '#ffffff',
};

const footerLogoVibe = {
  color: GOLD,
};

const footerLinks = {
  margin: '0',
  fontSize: '12px',
  textAlign: 'right' as const,
};

const footerLink = {
  color: GOLD,
  textDecoration: 'none',
};

const footerText = {
  fontSize: '11px',
  color: '#a8b8af',
  lineHeight: '18px',
  textAlign: 'left' as const,
  margin: '12px 0 0',
  borderTop: `1px solid rgba(255,255,255,0.15)`,
  paddingTop: '12px',
};
