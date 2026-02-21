import { getAllStops } from '@/lib/stops';
import StopCard from '@/components/StopCard';

export default function StopsPage() {
  const stops = getAllStops();
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-navy px-6 pt-8 pb-8">
        <h1 className="text-white text-3xl font-bold font-serif text-center mb-2">All Stops</h1>
        <p className="text-blue-300 text-center text-sm">
          {stops.length} historic faith communities to explore
        </p>
      </div>

      {/* Stops grid */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stops.map((stop, index) => (
            <StopCard key={stop.id} stop={stop} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
