'use client';

import { useCallback, useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    id: '1',
    title: 'Discover the Art of Tea',
    subtitle: 'Premium loose leaf teas sourced from the finest gardens across Asia',
    cta: 'Shop Collection',
    image: '/images/hero-1.jpg',
    href: '/search',
  },
  {
    id: '2',
    title: 'Blooming Tea Experience',
    subtitle: 'Hand-crafted flower teas that unfurl into a visual masterpiece',
    cta: 'Explore Now',
    image: '/images/hero-2.jpg',
    href: '/search',
  },
  {
    id: '3',
    title: 'The Ritual of Calm',
    subtitle: 'Herbal infusions to soothe your mind and warm your soul',
    cta: 'Shop Herbal',
    image: '/images/hero-3.jpg',
    href: '/search?category=Herbal+Tea',
  },
];

const ProductCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div className="relative w-full h-[85vh] min-h-[500px]">
      <Carousel
        className="w-full h-full"
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent className="h-[85vh] min-h-[500px] -ml-0">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0 relative h-full">
              <Image
                src={slide.image}
                fill
                className="object-cover"
                alt={slide.title}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-background/80 mb-8 font-light leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <Link
                      href={slide.href}
                      className="inline-flex items-center bg-accent text-accent-foreground hover:bg-accent/90 rounded-none px-8 py-4 text-sm tracking-widest uppercase font-medium transition-colors"
                    >
                      {slide.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? 'w-8 bg-accent' : 'w-2 bg-background/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
