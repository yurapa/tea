import deepmerge from 'deepmerge';
import type { AbstractIntlMessages } from 'next-intl';

import { localeConfig } from '@/i18n/locale-config';

export const importLocale = async (locale: string): Promise<AbstractIntlMessages> => {
  return (await import(`@/i18n/translations/${locale}/index.ts`)).default;
};

export const getMessagesForLocale = async (locale: string): Promise<AbstractIntlMessages> => {
  const localeMessages = await importLocale(locale);
  if (locale === localeConfig.defaultLocale) {
    return localeMessages;
  }
  const defaultLocaleMessages = await importLocale(localeConfig.defaultLocale);

  return deepmerge(defaultLocaleMessages, localeMessages);
};
