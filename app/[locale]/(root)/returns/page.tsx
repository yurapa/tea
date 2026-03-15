import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('Pages');
  return { title: t('returns.title') };
}

export default async function ReturnsPage() {
  const t = await getTranslations('Pages');

  const sections = [
    { titleKey: 'returns.s1Title', textKey: 'returns.s1Text' },
    { titleKey: 'returns.s2Title', textKey: 'returns.s2Text' },
    { titleKey: 'returns.s3Title', textKey: 'returns.s3Text' },
  ] as const;

  return (
    <div className="container mx-auto px-6 max-w-3xl py-16">
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-10">
        {t('returns.title')}
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
