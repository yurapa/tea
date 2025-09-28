import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import { Locale } from '@/i18n/routing';
import { isValidLocale } from '@/i18n/locale-config';
import { Toaster } from '@/components/ui/toaster';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from '@/lib/constants';
import { GTM } from '@/components/analytics/gtm';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <GTM />
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider locale={locale as Locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
          <Toaster />
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
