'use client';
import Script from 'next/script';

/* eslint-disable @typescript-eslint/no-explicit-any */

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string;

export function GoogleAnalytics() {
  if (googleAnalyticsId === undefined) {
    return;
  }

  return (
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
      onLoad={() => {
        if (typeof window === 'undefined') {
          return;
        }

        (window as any).dataLayer = (window as any).dataLayer || [];

        function gtag(...rest: any[]) {
          (window as any).dataLayer.push(...rest);
        }
        gtag('js', new Date());
        gtag('config', googleAnalyticsId);
      }}
    />
  );
}

export function useAnalytics() {
  const trackEvent = (event: string, data?: Record<string, unknown>) => {
    if (typeof window === 'undefined' || !(window as any).gta) {
      return;
    }

    (window as any).gta('event', event, data);
  };

  return {
    trackEvent,
  };
}
