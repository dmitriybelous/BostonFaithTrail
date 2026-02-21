import Link from 'next/link';
import { Stop } from '@/types/stop';
import { typeIcon } from '@/lib/typeIcon';

interface StopCardProps {
  stop: Stop;
  index?: number;
}

export default function StopCard({ stop, index }: StopCardProps) {
  return (
    <Link href={`/stops/${stop.slug}`} className="block group">
      <div className="surface-card surface-card-hover overflow-hidden h-full">
        <div className="p-4">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2 mb-2">
            {index !== undefined && (
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-crimson text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
            )}
            <h2 className="font-semibold text-base text-slate-900 leading-snug flex-1">{stop.title}</h2>
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-navy group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Type + year */}
          <div className="flex items-center gap-2 mb-2">
            {stop.type && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
                <span>{typeIcon(stop.type)}</span>
                {stop.type}
              </span>
            )}
            {stop.year && <span className="text-slate-400 text-sm">{stop.year}</span>}
          </div>

          {/* Summary */}
          <p className="text-sm text-slate-600 leading-relaxed mb-2">{stop.shortSummary}</p>

          {/* Address */}
          {stop.address && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
              <span>📍</span>
              <span className="truncate">{stop.address}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
