import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { auth } from '@/auth';
import { APP_NAME } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SignUpForm from './sign-up-form';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth');
  return {
    title: t('signUpTitle'),
  };
}

const SignUpPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const t = await getTranslations('Auth');
  const searchParams = await props.searchParams;
  const { callbackUrl } = searchParams;
  const session = await auth();

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
          <CardTitle className="text-center">{t('signUpTitle')}</CardTitle>
          <CardDescription className="text-center">{t('signUpDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
