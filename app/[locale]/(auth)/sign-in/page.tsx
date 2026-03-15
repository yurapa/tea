import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { auth } from '@/auth';
import CredentialsSignInForm from './credentials-signin-form';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth');
  return {
    title: t('signInTitle'),
  };
}

const SignInPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();
  const t = await getTranslations('Auth');

  if (session) {
    return redirect(callbackUrl || '/');
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <Card className="rounded-xl shadow-lg border border-border">
        <CardHeader className="space-y-4">
          <div className="text-center mb-2">
            <Link href="/" className="inline-block">
              <span className="font-playfair text-2xl font-bold tracking-wide text-primary">
                TEA<span className="text-accent">VIBE</span>
              </span>
            </Link>
          </div>
          <CardTitle className="text-center">{t('signInTitle')}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1 text-center">
            {t('signInDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
