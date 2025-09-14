import NextAuth from 'next-auth';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

const LOCALE_PREFIXES = {
  en: '/',
  el: '/el',
  uk: '/uk',
  ru: '/ru',
};

const getLocale = (pathname: string): string => {
  return Object.entries(LOCALE_PREFIXES).find(([_, prefix]) => pathname.startsWith(prefix))?.[0] || 'en';
};

const PUBLIC_PATHS = [
  '/',
  '/en',
  '/el',
  '/uk',
  '/ru',
  '/sign-in',
  '/en/sign-in',
  '/ru/sign-in',
  '/el/sign-in',
  '/uk/sign-in',
  '/sign-up',
  '/en/sign-up',
  '/ru/sign-up',
  '/el/sign-up',
  '/uk/sign-up',
  '/cart',
  '/en/cart',
  '/ru/cart',
  '/el/cart',
  '/uk/cart',
  '/search',
  '/en/search',
  '/ru/search',
  '/el/search',
  '/uk/search',
];

export default auth((req) => {
  const isPublicPage = PUBLIC_PATHS.includes(req.nextUrl.pathname);
  const isLogoutPage = req.nextUrl.pathname.includes('signout');

  if (isPublicPage || isLogoutPage) {
    return intlMiddleware(req);
  }

  if (!req.auth) {
    const locale = getLocale(req.nextUrl.pathname);
    const signInUrl = new URL(`/${locale}/sign-in`, req.nextUrl);
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.href);
    return Response.redirect(signInUrl);
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
