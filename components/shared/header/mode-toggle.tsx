'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

import { cn } from '@/lib/utils';

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety with next-themes
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-[60px] rounded-full bg-muted border border-border/60 shrink-0" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative flex items-center justify-between h-8 w-[60px] rounded-full bg-muted border border-border/60 px-1.5 cursor-pointer transition-colors shrink-0"
      aria-label="Toggle theme"
    >
      <span
        className={cn(
          'absolute top-0.5 left-0.5 h-7 w-7 rounded-full bg-foreground shadow-md transition-transform duration-300 ease-in-out',
          theme === 'dark' ? 'translate-x-[28px]' : 'translate-x-0',
        )}
      />
      <Sun
        className={cn(
          'relative z-10 h-4 w-4 transition-colors',
          theme === 'dark' ? 'text-muted-foreground' : 'text-background',
        )}
      />
      <Moon
        className={cn(
          'relative z-10 h-4 w-4 transition-colors',
          theme === 'dark' ? 'text-background' : 'text-muted-foreground',
        )}
      />
    </button>
  );
};

export default ModeToggle;
