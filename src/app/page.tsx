import Link from 'next/link';
import { getAllStops } from '@/lib/stops';

export default function HomePage() {
  const stops = getAllStops();
  return (
    <div className="flex flex-col items-center px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">Boston Faith Trail</h1>
      <p className="text-lg text-center text-gray-600 mb-8 max-w-2xl">
        Explore {stops.length} historic faith communities across Boston on an interactive walking trail.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link href="/map" className="bg-blue-900 text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-blue-800 transition-colors">
          View Map
        </Link>
        <Link href="/stops" className="border border-blue-900 text-blue-900 px-6 py-3 rounded-lg text-center font-semibold hover:bg-blue-50 transition-colors">
          Browse Stops
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {stops.slice(0, 6).map((stop) => (
          <Link key={stop.id} href={`/stops/${stop.slug}`} className="block border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h2 className="font-semibold text-blue-900 mb-1">{stop.title}</h2>
            <p className="text-sm text-gray-600">{stop.shortSummary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
