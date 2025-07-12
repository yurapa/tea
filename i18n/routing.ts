import { defineRouting } from 'next-intl/routing';
// import { createNavigation } from 'next-intl/navigation';

import { CONFIG } from '@/lib/constants';

export const routing = defineRouting({
  locales: Object.keys(CONFIG.i18n.locales),
  defaultLocale: CONFIG.i18n.defaultLocale,
  localeCookie: {
    name: CONFIG.i18n.localeCookieName,
  },
  localePrefix: 'as-needed',
  localeDetection: true,
});

// export const {
//   Link,
//   redirect: localeRedirect,
//   usePathname: useLocalePathname,
//   useRouter: useLocaleRouter,
// } = createNavigation(routing);

export type Locale = (typeof routing.locales)[number];
