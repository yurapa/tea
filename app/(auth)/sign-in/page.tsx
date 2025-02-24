import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { auth } from '@/auth';
import { APP_NAME } from '@/lib/constants';
import CredentialsSignInForm from './credentials-signin-form';

export const metadata: Metadata = {
  title: 'Sign In',
};

const SignInPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  console.log('SignInPage -> callbackUrl', callbackUrl);
  if (session) {
    return redirect(callbackUrl || '/');
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader className="space-y-8">
          <Link href="/" className="flex-center">
            <Image priority={true} src="/images/logo.jpeg" width={200} height={200} alt={`${APP_NAME} logo`} />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">Select a method to sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
