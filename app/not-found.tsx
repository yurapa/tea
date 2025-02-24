'use client';

import Link from 'next/link';
import Image from 'next/image';

import { APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Link href="/" className="flex-center">
        <Image priority={true} src="/images/logo.jpeg" width={200} height={200} alt={`${APP_NAME} logo`} />
      </Link>
      <div className="w-1/3 rounded-lg p-6 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-bold">Not Found</h1>
        <p className="text-destructive">Could not find requested page</p>
        <Button variant="outline" className="ml-2 mt-4" onClick={() => (window.location.href = '/')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
