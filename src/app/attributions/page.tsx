import { getAllStops } from '@/lib/stops';
import Link from 'next/link';

export default function AttributionsPage() {
  const stops = getAllStops();
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Attributions</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">Map Data</h2>
        <p className="text-gray-700">
          Map tiles and geographic data ©{' '}
          <a href="https://www.openstreetmap.org/copyright" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
            OpenStreetMap
          </a>{' '}
          contributors. Tiles served by{' '}
          <a href="https://www.openstreetmap.org" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
            OpenStreetMap
          </a>.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-blue-800 mb-3">Stop Images &amp; Content</h2>
        <div className="space-y-4">
          {stops.map((stop) => (
            <div key={stop.id} className="border rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-1">
                <Link href={`/stops/${stop.slug}`} className="hover:underline">{stop.title}</Link>
              </h3>
              <p className="text-sm text-gray-600 mb-2">{stop.imageAttribution}</p>
              {stop.sources.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Sources:</p>
                  <ul className="list-disc ml-4">
                    {stop.sources.map((src, i) => (
                      <li key={i} className="text-xs">
                        <a href={src} className="text-blue-600 underline break-all" target="_blank" rel="noopener noreferrer">{src}</a>
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
