'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Stop } from '@/types/stop';
import HeroImage from '@/components/HeroImage';
import { googleMapsPlaceUrl } from '@/lib/geo';
import { CheckIcon, NavigateIcon } from '@/components/Icons';

const STORAGE_KEY = 'visitedStops';

interface TrailListProps {
  stops: Stop[];
}

export default function TrailList({ stops }: TrailListProps) {
  const [visited, setVisited] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setVisited(new Set(JSON.parse(stored) as string[]));
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleVisited = (id: string) => {
    setVisited((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const done = stops.filter((s) => visited.has(s.id)).length;
  const pct = stops.length ? Math.round((done / stops.length) * 100) : 0;
  const nextIndex = stops.findIndex((s) => !visited.has(s.id));

  return (
    <div>
      {/* Progress */}
      <div className="surface-card p-4 mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-sm font-semibold text-navy">Your progress</p>
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-navy">{done}</span> of {stops.length} visited
          </p>
        </div>
        <div className="h-2 rounded-full bg-cream overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>
        {done === stops.length && stops.length > 0 && (
          <p className="mt-3 text-sm text-gold-dark font-medium">You&apos;ve completed the trail. Well walked!</p>
        )}
      </div>

      <ol>
        {stops.map((stop, index) => {
          const isVisited = visited.has(stop.id);
          const isNext = index === nextIndex;
          const isLast = index === stops.length - 1;
          return (
            <li key={stop.id} className="relative flex gap-3">
              {/* Timeline rail */}
              <div className="flex flex-col items-center flex-shrink-0 w-9">
                <div
                  className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    isVisited
                      ? 'bg-gold text-white'
                      : isNext
                        ? 'bg-navy text-white ring-4 ring-gold/30'
                        : 'bg-white text-navy ring-1 ring-navy/15'
                  }`}
                >
                  {isVisited ? <CheckIcon /> : index + 1}
                </div>
                {!isLast && (
                  <div className={`w-0.5 flex-1 my-1 rounded-full ${isVisited ? 'bg-gold/60' : 'bg-navy/10'}`} />
                )}
              </div>

              {/* Card */}
              <div className={`flex-1 min-w-0 surface-card overflow-hidden mb-4 transition-opacity ${isVisited ? 'opacity-75' : ''}`}>
                <Link href={`/stops/${stop.slug}`} className="block active:bg-cream/60">
                  <HeroImage heroImage={stop.heroImage} title={stop.title} className="h-36 sm:h-44" />
                  <div className="p-4 pb-3">
                    {isNext && <p className="eyebrow mb-1">Up next</p>}
                    <h3 className="font-serif text-lg font-semibold leading-snug text-navy">{stop.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-500 line-clamp-2">{stop.shortSummary}</p>
                  </div>
                </Link>
                <div className="flex gap-2 px-4 pb-4">
                  <a
                    href={googleMapsPlaceUrl(stop.lat, stop.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-cream text-navy text-sm font-semibold py-2.5 hover:bg-gold-light"
                  >
                    <NavigateIcon className="w-4 h-4" />
                    Directions
                  </a>
                  <button
                    type="button"
                    onClick={() => toggleVisited(stop.id)}
                    aria-pressed={isVisited}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-full text-sm font-semibold py-2.5 ${
                      isVisited ? 'bg-gold text-white hover:bg-gold-dark' : 'bg-navy text-white hover:bg-navy-light'
                    }`}
                  >
                    <CheckIcon />
                    {isVisited ? 'Visited' : 'Mark visited'}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
