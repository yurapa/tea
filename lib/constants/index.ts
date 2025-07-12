import type { Config } from '@/types';

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Tea Shop';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Ecommerce store for tea lovers';
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const PRICE_TAX_RATE = 0.19;
export const PRICE_SHIPPING = 10;
export const PRICE_FREE_SHIPPING_LIMIT = 50;

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(', ')
  : ['PayPal', 'Stripe', 'CashOnDelivery'];
export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const USER_ROLES = process.env.USER_ROLES ? process.env.USER_ROLES.split(', ') : ['admin', 'editor', 'user'];

export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'info@tea.dev';

export const CONFIG = {
  i18n: {
    locales: {
      en: {
        label: 'English',
      },
      el: {
        label: 'Ελληνικά',
      },
      uk: {
        label: 'Українська',
      },
      ru: {
        label: 'Русский',
      },
    },
    defaultLocale: 'en',
    localeCookieName: 'NEXT_LOCALE',
  },
} as const satisfies Config;
