'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Stop } from '@/types/stop';
import { typeIcon } from '@/lib/typeIcon';
import HeroImage from '@/components/HeroImage';

const STORAGE_KEY = 'visitedStops';

interface TrailListProps {
  stops: Stop[];
}

export default function TrailList({ stops }: TrailListProps) {
  const router = useRouter();
  const [visited, setVisited] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setVisited(new Set(JSON.parse(stored) as string[]));
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleVisited = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

  return (
    <div className="flex flex-col gap-0">
      {stops.map((stop, index) => {
        const isVisited = visited.has(stop.id);
        return (
          <div key={stop.id} className="flex items-start gap-3">
            <div className="flex flex-col items-center flex-shrink-0 pt-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm transition-colors ${isVisited ? 'bg-green-600' : 'bg-navy'}`}
              >
                {isVisited ? '✓' : index + 1}
              </div>
              {index < stops.length - 1 && (
                <div className="w-px flex-1 min-h-[1.5rem] bg-navy opacity-25 my-1" />
              )}
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => router.push(`/stops/${stop.slug}`)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); router.push(`/stops/${stop.slug}`); } }}
              className={`flex-1 surface-card surface-card-hover mb-4 overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-navy transition-opacity ${isVisited ? 'opacity-70' : ''}`}
            >
              {/* Hero image with type icon badge */}
              {stop.heroImage && (
                <HeroImage
                  heroImage={stop.heroImage}
                  title={stop.title}
                  type={stop.type}
                  className="h-36"
                />
              )}

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg text-slate-900 leading-snug">{stop.title}</h3>
                  <button
                    onClick={(e) => toggleVisited(stop.id, e)}
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      isVisited
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-slate-100 text-slate-400 hover:bg-green-100 hover:text-green-700'
                    }`}
                    aria-label={isVisited ? `Unmark ${stop.title} as visited` : `Mark ${stop.title} as visited`}
                    title={isVisited ? 'Visited – click to unmark' : 'Mark as visited'}
                  >
                    ✓
                  </button>
                </div>

                {!stop.heroImage && stop.type && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      <span>{typeIcon(stop.type)}</span>
                      {stop.type}
                    </span>
                    {stop.year && (
                      <span className="text-slate-400 text-sm">{stop.year}</span>
                    )}
                  </div>
                )}
                {stop.heroImage && stop.year && (
                  <div className="mb-3">
                    <span className="text-slate-400 text-sm">{stop.year}</span>
                  </div>
                )}

                <p className="text-sm text-slate-600 leading-relaxed mb-3">{stop.shortSummary}</p>

                {stop.address && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 rounded-xl px-3 py-2.5 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="text-base">📍</span>
                      <span className="truncate">{stop.address}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 flex-shrink-0">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
