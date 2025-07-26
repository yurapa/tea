import { getRequestConfig } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { getUserLocale } from '@/i18n/locale-cookie';
import { getMessagesForLocale } from '@/i18n/messages';
import { type LocaleCode, isValidLocale } from '@/i18n/locale-config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale) {
    locale = await getUserLocale();
  }

  if (!locale || !isValidLocale(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale: locale as LocaleCode,
    messages: await getMessagesForLocale(locale),
  };
});
