'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ_COUNT = 6;

export default function FAQContent() {
  const t = useTranslations('Pages');

  const items = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: t(`faq.q${i + 1}` as Parameters<typeof t>[0]),
    a: t(`faq.a${i + 1}` as Parameters<typeof t>[0]),
  }));

  return (
    <>
      <Accordion type="single" collapsible className="mb-12">
        {items.map(({ q, a }, i) => (
          <AccordionItem key={i} value={`item-${i + 1}`}>
            <AccordionTrigger className="text-left text-foreground font-medium">
              {q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="rounded-lg bg-card border border-border/50 text-center p-6">
        <h3 className="font-semibold text-foreground mb-2">{t('faq.ctaTitle')}</h3>
        <p className="text-sm text-muted-foreground mb-4">{t('faq.ctaText')}</p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {t('faq.ctaButton')}
        </Link>
      </div>
    </>
  );
}
