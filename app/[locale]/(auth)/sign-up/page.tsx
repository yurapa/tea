import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { auth } from '@/auth';
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
      <Card className="rounded-xl shadow-lg border border-border">
        <CardHeader className="space-y-4">
          <div className="text-center mb-2">
            <Link href="/" className="inline-block">
              <span className="font-playfair text-2xl font-bold tracking-wide text-primary">
                TEA<span className="text-accent">VIBE</span>
              </span>
            </Link>
          </div>
          <CardTitle className="text-center">{t('signUpTitle')}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1 text-center">
            {t('signUpDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
