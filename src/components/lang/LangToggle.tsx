'use client';

import * as React from 'react';
import { Languages } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setUserLocale } from '@/services/locale';
import { type Locale } from '@/i18n/config';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const SUPPORTED_LOCALES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
] as const;

export function LangToggle() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const t = useTranslations('Language');

  const handleLanguageChange = async (newLocale: string) => {
    setIsLoading(true);
    
    try {
      await setUserLocale(newLocale as Locale);
      router.refresh();
    } catch (error) {
      console.error(t('FailedToChangeLanguage'), error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" disabled={isLoading}>
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('ToggleLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LOCALES.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            disabled={isLoading}
          >
            <span className="mr-2 text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 