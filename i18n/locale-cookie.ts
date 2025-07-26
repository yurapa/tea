import 'server-only';

import { cookies } from 'next/headers';
import { localeConfig } from '@/i18n/locale-config';
import type { Locale } from '@/i18n/routing';

export async function getUserLocale() {
  const cookie = (await cookies()).get(localeConfig.localeCookieName);
  return cookie?.value ?? localeConfig.defaultLocale;
}

export async function setLocaleCookie(locale: Locale) {
  (await cookies()).set(localeConfig.localeCookieName, locale);
}
