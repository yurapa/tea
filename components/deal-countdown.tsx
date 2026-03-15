'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEAL_END = new Date();
DEAL_END.setDate(DEAL_END.getDate() + 3);
DEAL_END.setHours(23, 59, 59, 0);

const getTimeLeft = (end: Date) => {
  const diff = Math.max(0, end.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: diff === 0,
  };
};

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground tabular-nums leading-none">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-primary-foreground/60 mt-1.5">
      {label}
    </span>
  </div>
);

const DealCountdown = () => {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft>>();

  useEffect(() => {
    setTime(getTimeLeft(DEAL_END));
    const id = setInterval(() => setTime(getTimeLeft(DEAL_END)), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    return (
      <section className="relative py-24 lg:py-32 overflow-hidden bg-primary">
        <div className="relative z-10 container mx-auto px-6 text-center">
          <p className="text-3xl font-bold text-primary-foreground">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <Image src="/images/promo-bg.jpg" fill className="object-cover" alt="Tea plantation" />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="text-sm text-accent uppercase tracking-[0.2em] font-medium mb-4">
          ⏰ Special Deal
        </p>
        <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 max-w-2xl mx-auto leading-tight">
          Exclusive Tea Experience Awaits
        </h2>
        <p className="text-primary-foreground/70 text-lg mb-10 max-w-lg mx-auto font-light">
          Discover our hand-picked selection of rare teas from the highlands of Asia, delivered fresh to your door.
        </p>

        {!time.expired && (
          <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-10">
            <TimeBlock value={time.days} label="Days" />
            <span className="text-2xl sm:text-3xl font-light text-primary-foreground/40 -mt-4">:</span>
            <TimeBlock value={time.hours} label="Hours" />
            <span className="text-2xl sm:text-3xl font-light text-primary-foreground/40 -mt-4">:</span>
            <TimeBlock value={time.minutes} label="Min" />
            <span className="text-2xl sm:text-3xl font-light text-primary-foreground/40 -mt-4">:</span>
            <TimeBlock value={time.seconds} label="Sec" />
          </div>
        )}

        <Link href="/search">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/80 rounded-none px-8 py-6 text-sm tracking-widest uppercase font-medium">
            Explore Collection
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default DealCountdown;
