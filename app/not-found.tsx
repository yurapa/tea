import { getLocale } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';

export default async function NotFoundPage() {
  const locale = await getLocale();

  return redirect({ href: '/404', locale });
}
