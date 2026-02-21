import Link from 'next/link';
import { getAllStops } from '@/lib/stops';
import StopCard from '@/components/StopCard';

export default function HomePage() {
  const stops = getAllStops();
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-navy px-6 pt-14 pb-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-navy-light opacity-25 pointer-events-none" />
        <div className="absolute -bottom-24 -left-12 w-64 h-64 rounded-full bg-navy-light opacity-15 pointer-events-none" />

        <div className="flex justify-center mb-6 relative">
          <div className="bg-navy-dark rounded-3xl w-20 h-20 flex items-center justify-center shadow-lg">
            <span className="text-4xl">🧭</span>
          </div>
        </div>

        <h1 className="text-white text-4xl font-bold font-serif text-center mb-3 relative">
          Boston Faith Trail
        </h1>
        <p className="text-blue-300 text-center text-sm mb-8 max-w-xs mx-auto leading-relaxed relative">
          Explore {stops.length} historic faith communities across Boston on an interactive walking trail
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
          <Link
            href="/map"
            className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-7 py-3.5 rounded-full shadow-md transition-colors"
          >
            <span>🗺️</span> Trail Guide
          </Link>
          <Link
            href="/stops"
            className="inline-flex items-center justify-center gap-2 border border-blue-400 text-blue-200 hover:bg-navy-light font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            Browse All Stops
          </Link>
        </div>
      </div>

      {/* Featured stops */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-1 h-7 bg-gold rounded-full" />
          <h2 className="text-xl font-bold text-gray-900">Featured Stops</h2>
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
              className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson/90 text-white font-semibold px-6 py-3 rounded-full shadow transition-colors"
            >
              View all {stops.length} stops →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
