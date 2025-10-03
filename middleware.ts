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

// Define public pages that don't require authentication
const PUBLIC_PAGE_TYPES = [
  '',          // home page
  'sign-in',
  'sign-up',
  'cart',
  'search',
  'product',   // all product pages
];

// Check if path is public (works with all locale prefixes)
const isPublicPath = (pathname: string): boolean => {
  // Remove locale prefix if present
  const pathWithoutLocale = pathname.replace(/^\/(en|el|uk|ru)/, '');
  
  // Check if it's the root or a locale root
  if (pathname === '/' || /^\/(en|el|uk|ru)$/.test(pathname)) {
    return true;
  }
  
  // Check if path starts with any public page type
  return PUBLIC_PAGE_TYPES.some(type => {
    if (type === '') return false; // Skip empty string (already handled above)
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
