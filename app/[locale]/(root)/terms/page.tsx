import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('Pages');
  return { title: t('terms.title') };
}

export default async function TermsPage() {
  const t = await getTranslations('Pages');

  const sections = [
    { titleKey: 'terms.s1Title', textKey: 'terms.s1Text' },
    { titleKey: 'terms.s2Title', textKey: 'terms.s2Text' },
    { titleKey: 'terms.s3Title', textKey: 'terms.s3Text' },
    { titleKey: 'terms.s4Title', textKey: 'terms.s4Text' },
  ] as const;

  return (
    <div className="container mx-auto px-6 max-w-3xl py-16">
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-10">
        {t('terms.title')}
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
