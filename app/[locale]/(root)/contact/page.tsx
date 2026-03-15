import { getTranslations } from 'next-intl/server';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export async function generateMetadata() {
  const t = await getTranslations('Pages');
  return { title: t('contact.title') };
}

export default async function ContactPage() {
  const t = await getTranslations('Pages');

  const infoCards = [
    { icon: Mail, label: t('contact.email'), value: 'hello@teavibe.store' },
    { icon: Phone, label: t('contact.phone'), value: '+357 25 123 456' },
    { icon: MapPin, label: t('contact.address'), value: 'Larnaca, Cyprus' },
    { icon: Clock, label: t('contact.hours'), value: 'Mon–Fri, 9:00 – 18:00' },
  ];

  return (
    <div className="container mx-auto px-6 max-w-3xl py-16">
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
        {t('contact.title')}
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-10">
        {t('contact.intro')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {infoCards.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex gap-4 p-5 rounded-lg bg-card border border-border/50">
            <Icon className="h-6 w-6 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
              <p className="text-sm font-medium text-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">{t('contact.formTitle')}</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">{t('contact.nameLabel')}</Label>
              <Input id="name" name="name" type="text" placeholder="Jane Doe" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">{t('contact.emailLabel')}</Label>
              <Input id="email" name="email" type="email" placeholder="jane@example.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="subject">{t('contact.subjectLabel')}</Label>
            <Input id="subject" name="subject" type="text" placeholder="Order inquiry" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">{t('contact.messageLabel')}</Label>
            <Textarea id="message" name="message" rows={5} placeholder="How can we help you?" />
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            {t('contact.sendButton')}
          </Button>
        </form>
      </div>
    </div>
  );
}
