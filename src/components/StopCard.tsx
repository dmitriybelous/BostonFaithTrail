import Link from 'next/link';
import { Stop } from '@/types/stop';
import HeroImage from '@/components/HeroImage';
import { ChevronRightIcon } from '@/components/Icons';

interface StopCardProps {
  stop: Stop;
  index?: number;
  variant?: 'feature' | 'row';
}

export default function StopCard({ stop, index, variant = 'row' }: StopCardProps) {
  if (variant === 'feature') {
    return (
      <Link
        href={`/stops/${stop.slug}`}
        className="group relative block overflow-hidden rounded-3xl shadow-soft active:scale-[0.985] transition"
      >
        <HeroImage
          heroImage={stop.heroImage}
          title={stop.title}
          className="aspect-[4/5]"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/20 to-transparent" />
        {index !== undefined && (
          <span className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur text-navy text-sm font-semibold shadow-soft">
            {index + 1}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          {stop.type && <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold mb-1">{stop.type}</p>}
          <h3 className="font-serif text-xl font-semibold leading-tight">{stop.title}</h3>
          {stop.year && <p className="text-xs text-white/70 mt-1">Est. {stop.year}</p>}
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/stops/${stop.slug}`} className="group block surface-card surface-card-hover overflow-hidden">
      <div className="flex items-stretch">
        <div className="relative w-28 sm:w-36 flex-shrink-0">
          <HeroImage heroImage={stop.heroImage} title={stop.title} className="h-full min-h-[7.5rem]" />
          {index !== undefined && (
            <span className="absolute top-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur text-navy text-xs font-semibold shadow-soft">
              {index + 1}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0 p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
            {stop.type && <span>{stop.type}</span>}
            {stop.type && stop.year && <span className="text-slate-300">·</span>}
            {stop.year && <span className="text-slate-400">{stop.year}</span>}
          </div>
          <h3 className="font-serif text-[17px] font-semibold leading-snug text-navy">{stop.title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-500 line-clamp-2">{stop.shortSummary}</p>
        </div>
        <div className="flex items-center pr-3 text-slate-300 group-hover:text-navy">
          <ChevronRightIcon className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}
