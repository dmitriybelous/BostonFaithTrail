'use client';
import { useState } from 'react';
import { getWikimediaImageUrl } from '@/lib/imageUrl';
import { CrossMark } from '@/components/Icons';

interface HeroImageProps {
  heroImage: string;
  title: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}

export default function HeroImage({ heroImage, title, className = 'h-40', imgClassName = '', eager = false }: HeroImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-br from-navy to-navy-light ${className}`}>
      {failed || !heroImage ? (
        <div className="absolute inset-0 flex items-center justify-center text-gold/60">
          <CrossMark className="w-8 h-8" />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={getWikimediaImageUrl(heroImage)}
          alt={title}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full h-full object-cover ${imgClassName}`}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
