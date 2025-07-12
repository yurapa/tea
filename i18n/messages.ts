import deepmerge from 'deepmerge';

import { CONFIG } from '@/lib/constants';
import type { Messages } from '@/types/locale';

export const importLocale = async (locale: string): Promise<Messages> => {
  return (await import(`@/i18n/translations/${locale}.json`)).default as Messages;
};

export const getMessagesForLocale = async (locale: string): Promise<Messages> => {
  const localeMessages = await importLocale(locale);
  if (locale === CONFIG.i18n.defaultLocale) {
    return localeMessages;
  }
  const defaultLocaleMessages = await importLocale(CONFIG.i18n.defaultLocale);

  return deepmerge(defaultLocaleMessages, localeMessages);
};
