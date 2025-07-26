import React from 'react';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { getMessages } from 'next-intl/server';
import { Locale } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';

import { localeConfig, getAllLocales, isValidLocale } from '@/i18n/locale-config';
import { Toaster } from '@/components/ui/toaster';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { SERVER_URL } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
});

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
      <head>
        {getAllLocales().map((localeCode) => (
          <link
            key={localeCode}
            rel="alternate"
            hrefLang={localeCode}
            href={`${SERVER_URL}/${localeCode === localeConfig.defaultLocale ? '' : localeCode}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${SERVER_URL}/`} />
      </head>
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
