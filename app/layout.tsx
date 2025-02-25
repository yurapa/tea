import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
// import { GoogleTagManager } from '@next/third-parties/google';

import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from '@/lib/constants';
import { Toaster } from '@/components/ui/toaster';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';

import '@/assets/styles/globals.css';

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const isGTM = !!process.env.NEXT_PUBLIC_GTM_ID;

  // console.log('RootLayout -> isGTM', isGTM);
  // console.log('RootLayout -> process.env.NEXT_PUBLIC_GTM_ID;', process.env.NEXT_PUBLIC_GTM_ID);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
        <GoogleAnalytics />
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
      </body>
    </html>
  );
}
