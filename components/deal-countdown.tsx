'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'use-intl';

const TARGET_DATE = new Date('2025-03-08T00:00:00');

const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);

  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="w-full p-4 text-center">
    <p className="text-3xl font-bold">{value}</p>
    <p>{label}</p>
  </li>
);

const DealCountdown = () => {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>();

  const t = useTranslations('HomePage');

  useEffect(() => {
    // Calculate initial time remaining on the client
    setTime(calculateTimeRemaining(TARGET_DATE));

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(TARGET_DATE);
      setTime(newTime);

      // Clear when countdown is over
      if (newTime.days === 0 && newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Render a loading state during hydration
  if (!time) {
    return (
      <section className="my-20 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-2">
          <h3 className="text-3xl font-bold">Loading Countdown...</h3>
        </div>
      </section>
    );
  }

  // If the countdown is over, display fallback UI
  if (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
    return (
      <section className="my-20 grid grid-cols-1 md:grid-cols-2">
        <h1>{t('title')}</h1>

        <div className="flex flex-col justify-center gap-2">
          <h3 className="text-3xl font-bold">Deal Has Ended</h3>
          <p>This deal is no longer available. Check out our latest promotions!</p>
          <div className="mb-6 text-center">
            <Button asChild>
              <Link href="/search">View Products</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image src="/images/promo.png" width={310} height={300} alt="promotion" />
        </div>
      </section>
    );
  }

  return (
    <section className="my-20 grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center gap-2">
        <h3 className="text-3xl font-bold">Deal Of The Month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals of the Month! Every purchase comes with
          exclusive perks and offers, making this month a celebration of savvy choices and amazing deals. Don&apos;t
          miss out! 🎁🛒
        </p>
        <ul className="grid grid-cols-4">
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>
        <div className="mb-6 text-center">
          <Button asChild>
            <Link href="/search">View Products</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <Image src="/images/promo.png" width={310} height={300} alt="promotion" />
      </div>
    </section>
  );
};

export default DealCountdown;
