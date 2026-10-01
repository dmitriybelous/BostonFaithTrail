import { getAllStops } from '@/lib/stops';
import { googleMapsRouteUrl, trailDistanceMiles } from '@/lib/geo';
import TrailList from '@/components/TrailList';
import StopsMap from '@/components/StopsMap';
import { NavigateIcon } from '@/components/Icons';

export default function MapPage() {
  const stops = getAllStops();
  const miles = trailDistanceMiles(stops) * 1.3;

  return (
    <div>
      <div className="sm:section-shell sm:pt-6">
        <StopsMap stops={stops} className="h-[42vh] min-h-[280px] sm:h-[460px] sm:rounded-3xl" />
      </div>

      <div className="section-shell max-w-3xl pt-6">
        <p className="eyebrow mb-1">Trail guide</p>
        <h1 className="font-serif text-[30px] sm:text-4xl font-semibold text-navy leading-tight">The walking route</h1>
        <p className="mt-2 text-[15px] text-slate-500">
          {stops.length} stops · about {miles.toFixed(1)} miles. Follow the numbers in order.
        </p>
        <a
          href={googleMapsRouteUrl(stops)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-5 w-full sm:w-auto"
        >
          <NavigateIcon />
          Walk the full route in Google Maps
        </a>

        <div className="mt-8">
          <TrailList stops={stops} />
        </div>
      </div>
    </div>
  );
}
