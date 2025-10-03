import { NextRequest, NextResponse } from 'next/server';

// GTM verification patterns - minimal check
const isGTMVerification = (req: NextRequest): boolean => {
  const ua = req.headers.get('user-agent')?.toLowerCase() || '';
  const ref = req.headers.get('referer')?.toLowerCase() || '';
  
  return (
    ua.includes('google-tag') ||
    ua.includes('tagassistant') ||
    ref.includes('tagmanager.google.com') ||
    ref.includes('tagassistant.google.com')
  );
};

export function gtmMiddleware(req: NextRequest) {
  // If it's GTM verification, bypass all other middleware
  if (isGTMVerification(req)) {
    return NextResponse.next();
  }
  
  return null; // Continue to next middleware
}
