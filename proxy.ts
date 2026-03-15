import NextAuth from 'next-auth';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

const getLocale = (pathname: string): string => {
  const match = pathname.match(/^\/(el|uk|ru)(\/|$)/);
  return match ? match[1] : 'en';
};

const PUBLIC_PAGE_TYPES = [
  '',
  'sign-in',
  'sign-up',
  'cart',
  'search',
  'product',
  'about',
  'contact',
  'faq',
  'privacy',
  'returns',
  'shipping',
  'terms',
];

const isPublicPath = (pathname: string): boolean => {
  const pathWithoutLocale = pathname.replace(/^\/(en|el|uk|ru)/, '');

  if (pathname === '/' || /^\/(en|el|uk|ru)$/.test(pathname)) {
    return true;
  }

  return PUBLIC_PAGE_TYPES.some(type => {
    if (type === '') return false;
    return pathWithoutLocale === `/${type}` ||
           pathWithoutLocale.startsWith(`/${type}/`);
  });
};

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isPublicPage = isPublicPath(pathname);
  const isLogoutPage = pathname.includes('signout');

  if (isPublicPage || isLogoutPage) {
    return intlMiddleware(req);
  }

  if (!req.auth) {
    const locale = getLocale(pathname);
    const signInUrl = new URL(`/${locale}/sign-in`, req.nextUrl);
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.href);
    return Response.redirect(signInUrl);
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
