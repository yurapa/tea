import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

const getLocale = (pathname: string): string => {
  const match = pathname.match(/^\/(el|uk|ru)(\/|$)/);
  return match ? match[1] : 'en';
};

const PRIVATE_PAGE_TYPES = [
  'admin',
  'user',
  'order',
  'shipping-address',
  'payment-method',
  'place-order',
];

const isPrivatePath = (pathname: string): boolean => {
  const pathWithoutLocale = pathname.replace(/^\/(en|el|uk|ru)/, '');

  return PRIVATE_PAGE_TYPES.some(type =>
    pathWithoutLocale === `/${type}` ||
    pathWithoutLocale.startsWith(`/${type}/`)
  );
};

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  if (isPrivatePath(pathname) && !req.auth) {
    const locale = getLocale(pathname);
    const signInUrl = new URL(`/${locale}/sign-in`, req.nextUrl);
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  const response = intlMiddleware(req);

  if (!req.cookies.get('sessionCartId')) {
    response.cookies.set('sessionCartId', crypto.randomUUID());
  }

  return response;
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|404|.*\\..*).*)'],
};
