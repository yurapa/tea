import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import ProfileForm from '@/app/[locale]/user/profile/profile-form';

export const metadata: Metadata = {
  title: 'Customer Profile',
};

const ProfilePage = async () => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="mx-auto max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Profile</h2>
        <ProfileForm />
      </div>
    </SessionProvider>
  );
};

export default ProfilePage;
