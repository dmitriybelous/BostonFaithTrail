import { getAllStops } from '@/lib/stops';
import StopCard from '@/components/StopCard';

export default function StopsPage() {
  const stops = getAllStops();
  return (
    <div className="min-h-screen bg-cream">
      <div className="section-shell pt-8 pb-5">
        <div className="surface-card p-6 sm:p-7 bg-gradient-to-r from-white to-slate-50">
          <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">All Stops</h1>
          <p className="text-slate-500 text-center text-sm">
            {stops.length} historic faith communities to explore
          </p>
        </div>
      </div>

      <div className="section-shell py-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stops.map((stop, index) => (
            <StopCard key={stop.id} stop={stop} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
