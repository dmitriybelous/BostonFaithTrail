'use client';
import { useState } from 'react';
import { typeIcon } from '@/lib/typeIcon';
import { getWikimediaImageUrl } from '@/lib/imageUrl';

interface HeroImageProps {
  heroImage: string;
  title: string;
  type?: string;
  className?: string;
}

export default function HeroImage({ heroImage, title, type, className = 'h-40' }: HeroImageProps) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className={`relative w-full overflow-hidden bg-slate-100 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getWikimediaImageUrl(heroImage)}
        alt={title}
        className="w-full h-full object-cover"
        onError={() => setHidden(true)}
      />
      {type && (
        <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-white/90 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
          <span>{typeIcon(type)}</span>
          {type}
        </span>
      )}
    </div>
  );
}
