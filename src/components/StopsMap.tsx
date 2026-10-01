'use client';
import dynamic from 'next/dynamic';
import { Stop } from '@/types/stop';

const TrailMap = dynamic(() => import('./TrailMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full animate-pulse bg-[#ebe6dc]" />,
});

interface StopsMapProps {
  stops: Stop[];
  className?: string;
}

export default function StopsMap({ stops, className = 'h-[340px] sm:h-[440px] rounded-3xl' }: StopsMapProps) {
  return (
    <div className={`relative z-0 w-full overflow-hidden shadow-soft ring-1 ring-black/[0.04] ${className}`}>
      <TrailMap stops={stops} />
    </div>
  );
}
