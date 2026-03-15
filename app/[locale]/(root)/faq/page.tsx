import { getTranslations } from 'next-intl/server';

import FAQContent from './faq-content';

export async function generateMetadata() {
  const t = await getTranslations('Pages');
  return { title: t('faq.title') };
}

export default async function FAQPage() {
  const t = await getTranslations('Pages');

  return (
    <div className="container mx-auto px-6 max-w-3xl py-16">
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
        {t('faq.title')}
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-10">
        {t('faq.subtitle')}
      </p>
      <FAQContent />
    </div>
  );
}
