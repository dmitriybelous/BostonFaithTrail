import { getAllStops } from '@/lib/stops';
import dynamic from 'next/dynamic';
import { Stop } from '@/types/stop';

const TrailMap = dynamic(() => import('@/components/TrailMap'), { ssr: false });

export default function MapPage() {
  const stops: Stop[] = getAllStops();
  return (
    <div className="h-[calc(100vh-4rem)]">
      <TrailMap stops={stops} />
    </div>
  );
}
