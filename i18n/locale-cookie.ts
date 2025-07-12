import 'server-only';

import { CONFIG } from '@/lib/constants';
import { cookies } from 'next/headers';
import type { Locale } from '@/i18n/routing';

export async function getUserLocale() {
  const cookie = (await cookies()).get(CONFIG.i18n.localeCookieName);
  return cookie?.value ?? CONFIG.i18n.defaultLocale;
}

export async function setLocaleCookie(locale: Locale) {
  (await cookies()).set(CONFIG.i18n.localeCookieName, locale);
}
