import Link from 'next/link';
import { Stop } from '@/types/stop';
import OpenInMapsButton from './OpenInMapsButton';

interface StopCardProps {
  stop: Stop;
}

export default function StopCard({ stop }: StopCardProps) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <h2 className="font-bold text-lg text-blue-900 mb-1">{stop.title}</h2>
        {stop.address && <p className="text-sm text-gray-500 mb-2">{stop.address}</p>}
        <p className="text-sm text-gray-700 mb-3">{stop.shortSummary}</p>
        <div className="flex flex-wrap gap-2">
          <Link href={`/stops/${stop.slug}`} className="text-sm bg-blue-900 text-white px-3 py-1.5 rounded-lg hover:bg-blue-800 transition-colors">
            Read more
          </Link>
          <OpenInMapsButton lat={stop.lat} lng={stop.lng} className="text-sm py-1.5" />
        </div>
      </div>
    </div>
  );
}
