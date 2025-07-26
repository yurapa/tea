'use client';

import { LanguagesIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CONFIG } from '@/lib/constants';

const LocaleSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [value, setValue] = useState<string>(currentLocale);

  const handleLocaleChange = (newLocale: string) => {
    setValue(newLocale);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
          aria-label="Switch language"
        >
          <LanguagesIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={value} onValueChange={handleLocaleChange}>
          {Object.entries(CONFIG.i18n.locales).map(([code, { label }]) => (
            <DropdownMenuRadioItem key={code} value={code}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitch;
