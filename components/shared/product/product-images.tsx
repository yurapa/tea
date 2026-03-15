'use client';

import { useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4">
        <Image
          src={images![current]}
          alt="product image"
          width={1000}
          height={1000}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex gap-3">
        {images.map((image, index) => (
          <div
            key={image}
            className={cn(
              'w-20 h-20 rounded-md overflow-hidden border-2 transition-colors cursor-pointer',
              current === index
                ? 'border-accent'
                : 'border-transparent hover:border-muted-foreground',
            )}
            onClick={() => setCurrent(index)}
          >
            <Image
              src={image}
              width={100}
              height={100}
              alt="product thumbnail"
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
