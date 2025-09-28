'use client';

import { GoogleTagManager } from '@next/third-parties/google';

const gtmCode = process.env.NEXT_PUBLIC_GTM_ID as string;

export function GTM() {
  if (gtmCode === undefined) {
    return;
  }

  return <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />;
}
