export const localeConfig = {
  locales: {
    en: {
      label: 'English',
    },
    el: {
      label: 'Ελληνικά',
    },
    uk: {
      label: 'Українська',
    },
    ru: {
      label: 'Русский',
    },
  },
  defaultLocale: 'en' as const,
  localeCookieName: 'NEXT_LOCALE',
} as const;

export type LocaleCode = keyof typeof localeConfig.locales;
export type LocaleConfig = typeof localeConfig;
export type LocaleInfo = typeof localeConfig.locales[LocaleCode];

export const getLocaleLabel = (locale: LocaleCode): string => {
  return localeConfig.locales[locale]?.label || locale;
};

export const getAllLocales = (): LocaleCode[] => {
  return Object.keys(localeConfig.locales) as LocaleCode[];
};

export const isValidLocale = (locale: string): locale is LocaleCode => {
  return locale in localeConfig.locales;
};
