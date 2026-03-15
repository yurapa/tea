import React from 'react';
import { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { GoogleTagManager } from '@next/third-parties/google'

import { Locale } from '@/i18n/routing';
import { isValidLocale } from '@/i18n/locale-config';
import { Toaster } from '@/components/ui/toaster';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'greek'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
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
  const isGTM = !!process.env.NEXT_PUBLIC_GTM_ID;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
    {isGTM && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />}
    <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
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
