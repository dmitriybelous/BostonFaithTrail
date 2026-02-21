import { getAllStops } from '@/lib/stops';
import Link from 'next/link';

export default function AttributionsPage() {
  const stops = getAllStops();
  return (
    <div className="section-shell py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Attributions</h1>
      <section className="surface-card p-5 sm:p-6 mb-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Map Data</h2>
        <p className="text-slate-700">
          Map tiles and geographic data ©{' '}
          <a href="https://www.openstreetmap.org/copyright" className="text-navy underline" target="_blank" rel="noopener noreferrer">
            OpenStreetMap
          </a>{' '}
          contributors. Tiles served by{' '}
          <a href="https://www.openstreetmap.org" className="text-navy underline" target="_blank" rel="noopener noreferrer">
            OpenStreetMap
          </a>.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Stop Images &amp; Content</h2>
        <div className="space-y-4">
          {stops.map((stop) => (
            <div key={stop.id} className="surface-card p-4 sm:p-5">
              <h3 className="font-semibold text-slate-900 mb-1">
                <Link href={`/stops/${stop.slug}`} className="hover:underline">{stop.title}</Link>
              </h3>
              <p className="text-sm text-slate-600 mb-2">{stop.imageAttribution}</p>
              {stop.sources.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Sources:</p>
                  <ul className="list-disc ml-4">
                    {stop.sources.map((src, i) => (
                      <li key={i} className="text-xs">
                        <a href={src} className="text-navy underline break-all" target="_blank" rel="noopener noreferrer">{src}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
