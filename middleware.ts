import NextAuth from 'next-auth';
import { NextRequest } from 'next/server';
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
} as const;

// Bot patterns - defined once for performance
const BOT_PATTERNS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'google-structured-data-testing-tool',
  'chrome-lighthouse',
  'gtmetrix',
] as const;

// Public pages that don't require authentication
const PUBLIC_PAGE_TYPES = [
  '',
  'sign-in',
  'sign-up',
  'cart',
  'search',
  'product',
] as const;

// Check if request is from a bot/crawler (case-insensitive)
const isBot = (userAgent: string | null): boolean => {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some(pattern => ua.includes(pattern));
};

// Check if path is public
const isPublicPath = (pathname: string): boolean => {
  // Root or locale root
  if (pathname === '/' || /^\/(en|el|uk|ru)$/.test(pathname)) {
    return true;
  }
  
  // Remove locale prefix
  const pathWithoutLocale = pathname.replace(/^\/(en|el|uk|ru)/, '');
  
  // Check if path starts with any public page type
  return PUBLIC_PAGE_TYPES.some(type => {
    if (!type) return false;
    return pathWithoutLocale === `/${type}` || pathWithoutLocale.startsWith(`/${type}/`);
  });
};

// Get locale from pathname
const getLocale = (pathname: string): string => {
  return Object.entries(LOCALE_PREFIXES).find(([_, prefix]) => 
    pathname.startsWith(prefix)
  )?.[0] || 'en';
};

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const userAgent = req.headers.get('user-agent');
  const isBotRequest = isBot(userAgent);
  const isPublicPage = isPublicPath(pathname);
  const isLogoutPage = pathname.includes('signout');

  // Handle bot requests to prevent 404 from missing locale detection
  if (isBotRequest && isPublicPage) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('accept-language', 'en');
    
    return intlMiddleware(
      new NextRequest(req.nextUrl, { headers: requestHeaders })
    );
  }

  // Handle public pages and logout
  if (isPublicPage || isLogoutPage) {
    return intlMiddleware(req);
  }

  // Require authentication for protected pages
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
