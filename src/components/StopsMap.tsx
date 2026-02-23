'use client';
import dynamic from 'next/dynamic';
import { Stop } from '@/types/stop';

const TrailMap = dynamic(() => import('./TrailMap'), { ssr: false });

interface StopsMapProps {
  stops: Stop[];
}

export default function StopsMap({ stops }: StopsMapProps) {
  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-md">
      <TrailMap stops={stops} />
    </div>
  );
}
