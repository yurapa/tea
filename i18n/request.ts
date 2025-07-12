import { getRequestConfig } from 'next-intl/server';

import { Locale, routing } from '@/i18n/routing';
import { getUserLocale } from '@/i18n/locale-cookie';
import { getMessagesForLocale } from '@/i18n/messages';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale) {
    locale = await getUserLocale();
  }

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: await getMessagesForLocale(locale),
  };
});
