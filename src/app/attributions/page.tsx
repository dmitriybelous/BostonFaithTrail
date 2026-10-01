import { getAllStops } from '@/lib/stops';
import Link from 'next/link';
import { ExternalIcon } from '@/components/Icons';

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export default function AttributionsPage() {
  const stops = getAllStops();
  return (
    <div className="section-shell max-w-2xl pt-6">
      <p className="eyebrow mb-1">About</p>
      <h1 className="font-serif text-[30px] sm:text-4xl font-semibold text-navy leading-tight">About this trail</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
        Boston Faith Trail is a free, self-guided walking tour of the churches, meeting houses and memorials that tell
        the story of faith in Boston. Add it to your home screen for quick access while you walk.
      </p>

      <section className="surface-card p-5 mt-6">
        <h2 className="font-serif text-xl font-semibold text-navy mb-2">Map data</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Map tiles and geographic data ©{' '}
          <a href="https://www.openstreetmap.org/copyright" className="text-navy underline decoration-gold/50 underline-offset-2" target="_blank" rel="noopener noreferrer">
            OpenStreetMap
          </a>{' '}
          contributors. Interactive maps powered by Leaflet.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-semibold text-navy mb-3">Images &amp; sources</h2>
        <div className="surface-card divide-y divide-black/[0.05]">
          {stops.map((stop, index) => (
            <div key={stop.id} className="p-4">
              <Link href={`/stops/${stop.slug}`} className="font-semibold text-navy hover:underline">
                <span className="text-gold-dark mr-1.5">{index + 1}.</span>
                {stop.title}
              </Link>
              <p className="mt-1 text-xs text-slate-500">{stop.imageAttribution}</p>
              {stop.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {stop.sources.map((src, i) => (
                    <a
                      key={i}
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-xs text-navy hover:bg-gold-light"
                    >
                      {hostname(src)}
                      <ExternalIcon className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
