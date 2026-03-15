import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('Pages');
  return { title: t('shipping.title') };
}

export default async function ShippingPage() {
  const t = await getTranslations('Pages');

  const sections = [
    { titleKey: 'shipping.s1Title', textKey: 'shipping.s1Text' },
    { titleKey: 'shipping.s2Title', textKey: 'shipping.s2Text' },
    { titleKey: 'shipping.s3Title', textKey: 'shipping.s3Text' },
  ] as const;

  return (
    <div className="container mx-auto px-6 max-w-3xl py-16">
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-10">
        {t('shipping.title')}
      </h1>
      <div className="space-y-8">
        {sections.map(({ titleKey, textKey }) => (
          <section key={titleKey}>
            <h2 className="text-lg font-semibold text-foreground mb-3">{t(titleKey)}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{t(textKey)}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
