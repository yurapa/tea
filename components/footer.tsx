import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Twitter, Instagram, Facebook, Send, Music2 } from 'lucide-react';

const Footer = async () => {
  const t = await getTranslations('Navigation');

  return (
    <footer className="bg-primary text-primary-foreground dark:bg-[hsl(160,27%,6%)] dark:text-[hsl(36,33%,80%)] ">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <span className="font-playfair text-2xl font-bold tracking-wide">
              TEA<span className="text-accent">VIBE</span>
            </span>
            <p className="text-sm text-primary-foreground/60 dark:text-neutral-400 leading-relaxed max-w-[280px]">
              Premium loose leaf teas curated for tea lovers in Cyprus and beyond.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Send, href: '#', label: 'Telegram' },
                { icon: Music2, href: '#', label: 'TikTok' },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 rounded-full border border-primary-foreground/20 dark:border-neutral-600 flex items-center justify-center hover:border-accent hover:text-accent transition-all"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary-foreground dark:text-neutral-200">
              {t('shopTitle')}
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: t('greenTea'), href: '/search?category=Green+Tea' },
                { label: t('blackTea'), href: '/search?category=Black+Tea' },
                { label: t('herbalTea'), href: '/search?category=Herbal+Tea' },
                { label: t('allTeas'), href: '/search' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-primary-foreground/60 dark:text-neutral-400 hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary-foreground dark:text-neutral-200">
              {t('companyTitle')}
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: t('about'), href: '/about' },
                { label: t('contact'), href: '/contact' },
                { label: t('faq'), href: '/faq' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-primary-foreground/60 dark:text-neutral-400 hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary-foreground dark:text-neutral-200">
              {t('supportTitle')}
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: t('shipping'), href: '/shipping' },
                { label: t('returns'), href: '/returns' },
                { label: t('privacy'), href: '/privacy' },
                { label: t('terms'), href: '/terms' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-primary-foreground/60 dark:text-neutral-400 hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 dark:border-neutral-700 text-center">
          <p className="text-xs text-primary-foreground/40 dark:text-neutral-500">&copy; 2026 TeaVibe. All rights reserved. Made with ♥ in Cyprus.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
