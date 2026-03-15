import { Euro, Headset, ShoppingBag, WalletCards } from 'lucide-react';
import { PRICE_FREE_SHIPPING_LIMIT } from '@/lib/constants';

const benefits = [
  {
    icon: ShoppingBag,
    title: 'Free Shipping',
    description: `Delivery all over Cyprus! Free shipping over €${PRICE_FREE_SHIPPING_LIMIT}`,
  },
  {
    icon: Euro,
    title: 'Money Back Guarantee',
    description: 'Within 14 days for an exchange',
  },
  {
    icon: WalletCards,
    title: 'Flexible Payment',
    description: 'Pay with credit card, PayPal or COD',
  },
  {
    icon: Headset,
    title: '24/7 Support',
    description: 'Get support at any time',
  },
];

const IconBoxes = () => {
  return (
    <section className="py-16 bg-card border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-4 group">
              <div className="shrink-0 h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IconBoxes;
