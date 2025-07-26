import { defineRouting } from 'next-intl/routing';

import { localeConfig, getAllLocales, type LocaleCode } from '@/i18n/locale-config';

export const routing = defineRouting({
  locales: getAllLocales(),
  defaultLocale: localeConfig.defaultLocale,
  localeCookie: {
    name: localeConfig.localeCookieName,
  },
  localePrefix: 'as-needed',
  localeDetection: true,
});

export type Locale = LocaleCode;
