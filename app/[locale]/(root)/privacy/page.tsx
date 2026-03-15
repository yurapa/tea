import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('Pages');
  return { title: t('privacy.title') };
}

export default async function PrivacyPage() {
  const t = await getTranslations('Pages');

  const sections = [
    { titleKey: 'privacy.s1Title', textKey: 'privacy.s1Text' },
    { titleKey: 'privacy.s2Title', textKey: 'privacy.s2Text' },
    { titleKey: 'privacy.s3Title', textKey: 'privacy.s3Text' },
    { titleKey: 'privacy.s4Title', textKey: 'privacy.s4Text' },
  ] as const;

  return (
    <div className="container mx-auto px-6 max-w-3xl py-16">
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-10">
        {t('privacy.title')}
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
