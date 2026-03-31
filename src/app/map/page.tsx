import { getAllStops } from '@/lib/stops';
import { Stop } from '@/types/stop';
import TrailList from '@/components/TrailList';

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
              <span className="text-4xl">✝️</span>
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

        <TrailList stops={stops} />
      </div>
    </div>
  );
}
