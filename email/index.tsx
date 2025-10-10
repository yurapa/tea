import { Resend } from 'resend';

import { SENDER_EMAIL, APP_NAME } from '@/lib/constants';
import LoginEmail from '@/email/login';
import PurchaseReceiptEmail from '@/email/purchase-receipt';
import { Order } from '@/types';
// require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order.user.email,
    subject: `Order Confirmation ${order.id}`,
    react: <PurchaseReceiptEmail order={order} />,
  });
};

export const sendLoginWelcome = async ({ email }: { email: string }) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: email,
    subject: 'Welcome',
    react: <LoginEmail />,
  });
};
