import { getAllStops } from '@/lib/stops';
import StopCard from '@/components/StopCard';
import StopsMap from '@/components/StopsMap';

export default function StopsPage() {
  const stops = getAllStops();
  return (
    <div className="section-shell pt-6">
      <p className="eyebrow mb-1">Explore</p>
      <h1 className="font-serif text-[30px] sm:text-4xl font-semibold text-navy leading-tight">All stops</h1>
      <p className="mt-2 text-[15px] text-slate-500">
        {stops.length} historic places of faith, listed in trail order.
      </p>

      <div className="mt-6">
        <StopsMap stops={stops} className="h-[260px] sm:h-[400px] rounded-3xl" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
        {stops.map((stop, index) => (
          <StopCard key={stop.id} stop={stop} index={index} />
        ))}
      </div>
    </div>
  );
}
