import { getAllStops } from '@/lib/stops';
import StopCard from '@/components/StopCard';

export default function StopsPage() {
  const stops = getAllStops();
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Trail Stops</h1>
      <p className="text-gray-600 mb-6">{stops.length} historic faith communities to explore.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stops.map((stop) => (
          <StopCard key={stop.id} stop={stop} />
        ))}
      </div>
    </div>
  );
}
