import type messages from '@/i18n/translations/en.json';
import type { LocaleCode } from '@/i18n/locale-config';

declare module 'next-intl' {
  interface AppConfig {
    Locale: LocaleCode;
    Messages: typeof messages;
  }
}
