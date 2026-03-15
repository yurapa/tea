import { getTranslations } from 'next-intl/server';
import { Leaf, Heart, Globe } from 'lucide-react';

export async function generateMetadata() {
  const t = await getTranslations('Pages');
  return { title: t('about.title') };
}

export default async function AboutPage() {
  const t = await getTranslations('Pages');

  const cards = [
    { icon: Leaf, titleKey: 'about.quality', descKey: 'about.qualityDesc' },
    { icon: Heart, titleKey: 'about.passion', descKey: 'about.passionDesc' },
    { icon: Globe, titleKey: 'about.sustainable', descKey: 'about.sustainableDesc' },
  ] as const;

  return (
    <div className="container mx-auto px-6 max-w-3xl py-16">
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
        {t('about.title')}
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-10">
        {t('about.intro')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {cards.map(({ icon: Icon, titleKey, descKey }) => (
          <div key={titleKey} className="text-center p-6 rounded-lg bg-card border border-border/50">
            <Icon className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-foreground text-base mb-2">{t(titleKey)}</h3>
            <p className="text-sm text-muted-foreground">{t(descKey)}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-playfair text-2xl font-bold text-foreground mb-4">
          {t('about.storyTitle')}
        </h2>
        {t('about.storyText')
          .split('\n\n')
          .map((para, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4">
              {para}
            </p>
          ))}
      </div>
    </div>
  );
}
