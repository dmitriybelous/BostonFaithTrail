import Link from 'next/link';
import { Stop } from '@/types/stop';
import { typeIcon } from '@/lib/typeIcon';
import HeroImage from '@/components/HeroImage';

interface StopCardProps {
  stop: Stop;
  index?: number;
}

export default function StopCard({ stop, index }: StopCardProps) {
  return (
    <Link href={`/stops/${stop.slug}`} className="block group">
      <div className="surface-card surface-card-hover overflow-hidden h-full">
        {/* Hero image with type icon badge */}
        {stop.heroImage && (
          <HeroImage
            heroImage={stop.heroImage}
            title={stop.title}
            type={stop.type}
            className="h-40 group-hover:[&_img]:scale-105 [&_img]:transition-transform [&_img]:duration-300"
          />
        )}

        <div className="p-4">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2 mb-2">
            {index !== undefined && (
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-crimson text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
            )}
            <h2 className="font-semibold text-base text-slate-900 leading-snug flex-1">{stop.title}</h2>
          </div>

          {/* Type + year (only if no hero image, since type is shown as badge on image) */}
          {!stop.heroImage && (
            <div className="flex items-center gap-2 mb-2">
              {stop.type && (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  <span>{typeIcon(stop.type)}</span>
                  {stop.type}
                </span>
              )}
              {stop.year && <span className="text-slate-400 text-sm">{stop.year}</span>}
            </div>
          )}
          {stop.heroImage && stop.year && (
            <div className="mb-2">
              <span className="text-slate-400 text-sm">{stop.year}</span>
            </div>
          )}

          {/* Summary */}
          <p className="text-sm text-slate-600 leading-relaxed mb-2">{stop.shortSummary}</p>

          {/* Address */}
          {stop.address && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
              <span>📍</span>
              <span className="truncate">{stop.address}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
