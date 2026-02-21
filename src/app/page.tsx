import Link from 'next/link';
import { getAllStops } from '@/lib/stops';
import StopCard from '@/components/StopCard';

export default function HomePage() {
  const stops = getAllStops();
  return (
    <div className="min-h-screen bg-cream">
      <div className="section-shell pt-8 pb-12">
        <section className="bg-gradient-to-br from-navy to-navy-light rounded-3xl px-5 sm:px-10 pt-10 sm:pt-12 pb-8 sm:pb-10 relative overflow-hidden shadow-lg">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-24 -left-12 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />

          <div className="flex justify-center mb-6 relative">
            <div className="bg-white/15 backdrop-blur rounded-3xl w-20 h-20 flex items-center justify-center shadow-lg border border-white/20">
              <span className="text-4xl">🧭</span>
            </div>
          </div>

          <h1 className="text-white text-3xl sm:text-4xl font-bold text-center mb-3 relative">
            Boston Faith Trail
          </h1>
          <p className="text-slate-200 text-center text-sm mb-8 max-w-md mx-auto leading-relaxed relative">
            Explore {stops.length} historic faith communities across Boston on a self-guided interactive walking route.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
            <Link
              href="/map"
              className="inline-flex items-center justify-center gap-2 bg-white text-navy font-semibold px-7 py-3 rounded-xl shadow-md hover:bg-slate-100 transition-colors w-full sm:w-auto"
            >
              <span>🗺️</span> Trail Guide
            </Link>
            <Link
              href="/stops"
              className="inline-flex items-center justify-center gap-2 border border-white/50 text-white hover:bg-white/10 font-semibold px-7 py-3 rounded-xl transition-colors w-full sm:w-auto"
            >
              Browse All Stops
            </Link>
          </div>
        </section>
      </div>

      <div className="section-shell pb-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-slate-900">Featured Stops</h2>
          <Link href="/stops" className="text-sm text-navy hover:text-navy-light font-medium">See all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stops.slice(0, 6).map((stop, index) => (
            <StopCard key={stop.id} stop={stop} index={index} />
          ))}
        </div>
        {stops.length > 6 && (
          <div className="text-center mt-6">
            <Link
              href="/stops"
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-6 py-3 rounded-xl shadow transition-colors"
            >
              View all {stops.length} stops →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
