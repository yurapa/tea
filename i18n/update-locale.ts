'use server';

import { revalidatePath } from 'next/cache';

import type { Locale } from '@/i18n/routing';
import { setLocaleCookie } from '@/i18n/locale-cookie';

export async function updateLocale(locale: Locale) {
  await setLocaleCookie(locale);
  revalidatePath('/');
}
