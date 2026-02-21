import { getAllStops } from '@/lib/stops';
import { Stop } from '@/types/stop';
import Link from 'next/link';
import { typeIcon } from '@/lib/typeIcon';

function buildGoogleMapsRouteUrl(stops: Stop[]): string {
  if (stops.length === 0) return 'https://www.google.com/maps';
  const origin = `${stops[0].lat},${stops[0].lng}`;
  const destination = `${stops[stops.length - 1].lat},${stops[stops.length - 1].lng}`;
  const waypoints = stops
    .slice(1, -1)
    .map((s) => `${s.lat},${s.lng}`)
    .join('|');
  const base = 'https://www.google.com/maps/dir/?api=1';
  return `${base}&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}&travelmode=walking`;
}

export default function MapPage() {
  const stops: Stop[] = getAllStops();
  const googleMapsUrl = buildGoogleMapsRouteUrl(stops);

  return (
    <div className="min-h-screen bg-cream">
      <div className="section-shell pt-8 pb-6">
        <section className="bg-gradient-to-br from-navy to-navy-light rounded-3xl px-5 sm:px-10 pt-9 sm:pt-10 pb-8 sm:pb-9 relative overflow-hidden shadow-lg">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />

          <div className="flex justify-center mb-5 relative">
            <div className="bg-white/15 rounded-3xl w-20 h-20 flex items-center justify-center shadow-lg border border-white/20">
              <span className="text-4xl">🧭</span>
            </div>
          </div>

          <h1 className="text-white text-3xl sm:text-4xl font-bold text-center mb-3 relative">
            Trail Guide
          </h1>
          <p className="text-slate-200 text-center text-sm mb-8 max-w-xs mx-auto leading-relaxed relative">
            Follow the numbered trail through Boston&apos;s historic faith communities
          </p>

          <div className="flex justify-center relative">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-navy font-semibold px-6 sm:px-8 py-3 rounded-xl shadow-md transition-colors text-base w-full sm:w-auto"
            >
              <span className="text-lg">🗺️</span>
              View on Google Maps
            </a>
          </div>
        </section>
      </div>

      <div className="section-shell pt-2 pb-10 max-w-3xl">
        <div className="flex items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Walking Trail</h2>
          </div>
          <span className="text-slate-400 text-xs sm:text-sm font-medium whitespace-nowrap">{stops.length} stops</span>
        </div>

        <div className="flex flex-col gap-0">
          {stops.map((stop, index) => (
            <div key={stop.id} className="flex items-start gap-3">
              <div className="flex flex-col items-center flex-shrink-0 pt-1">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {index + 1}
                </div>
                {index < stops.length - 1 && (
                  <div className="w-px flex-1 min-h-[1.5rem] bg-navy opacity-25 my-1" />
                )}
              </div>

              <div className="flex-1 surface-card surface-card-hover mb-4 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg text-slate-900 leading-snug">{stop.title}</h3>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-navy hover:text-white transition-colors"
                      aria-label={`Navigate to ${stop.title}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {stop.type && (
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                        <span>{typeIcon(stop.type)}</span>
                        {stop.type}
                      </span>
                    )}
                    {stop.year && (
                      <span className="text-slate-400 text-sm">{stop.year}</span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{stop.shortSummary}</p>

                  {stop.address && (
                    <Link
                      href={`/stops/${stop.slug}`}
                      className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2.5 group hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="text-base">📍</span>
                        <span className="truncate">{stop.address}</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 flex-shrink-0 group-hover:text-navy transition-colors">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
