import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from '@/lib/constants';

import '@/assets/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({ children }: PropsWithChildren) {
  return children;
}
