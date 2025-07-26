import deepmerge from 'deepmerge';
import type { AbstractIntlMessages } from 'next-intl';

import { CONFIG } from '@/lib/constants';

export const importLocale = async (locale: string): Promise<AbstractIntlMessages> => {
  return (await import(`@/i18n/translations/${locale}.json`)).default;
};

export const getMessagesForLocale = async (locale: string): Promise<AbstractIntlMessages> => {
  const localeMessages = await importLocale(locale);
  if (locale === CONFIG.i18n.defaultLocale) {
    return localeMessages;
  }
  const defaultLocaleMessages = await importLocale(CONFIG.i18n.defaultLocale);

  return deepmerge(defaultLocaleMessages, localeMessages);
};
