'use client';

import { ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useState } from 'react';

import { localeConfig, type LocaleCode } from '@/i18n/locale-config';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const FLAGS: Record<string, string> = {
  en: '🇬🇧',
  el: '🇬🇷',
  uk: '🇺🇦',
  ru: '🇷🇺',
};

const LocaleSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [value, setValue] = useState<string>(currentLocale);

  const handleLocaleChange = (newLocale: string) => {
    setValue(newLocale);
    router.replace(pathname, { locale: newLocale as LocaleCode });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-2 gap-1 text-foreground/70 hover:text-foreground hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
          aria-label="Switch language"
        >
          <span className="text-base leading-none">{FLAGS[value] ?? '🌐'}</span>
          <span className="text-xs font-medium uppercase hidden sm:inline">{value}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[180px] p-2">
        <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Language
        </p>
        {Object.entries(localeConfig.locales).map(([code, { label }]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLocaleChange(code)}
            className={cn(
              'flex items-center gap-3 cursor-pointer rounded-md px-3 py-2.5',
              code === value && 'bg-accent/10 text-accent font-semibold',
            )}
          >
            <span className="text-lg leading-none">{FLAGS[code] ?? '🌐'}</span>
            <span className="flex-1">{label}</span>
            {code === value && (
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitch;
