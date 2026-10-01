import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getAllStops, getStopBySlug, getStopContent } from '@/lib/stops';
import { googleMapsPlaceUrl } from '@/lib/geo';
import HeroImage from '@/components/HeroImage';
import { ChevronLeftIcon, ChevronRightIcon, NavigateIcon, PinIcon, ExternalIcon } from '@/components/Icons';

export async function generateStaticParams() {
  const stops = getAllStops();
  return stops.map((stop) => ({ slug: stop.slug }));
}

interface PageProps {
  params: { slug: string };
}

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export default function StopDetailPage({ params }: PageProps) {
  const stops = getAllStops();
  const index = stops.findIndex((s) => s.slug === params.slug);
  const stop = getStopBySlug(params.slug);
  if (!stop || index === -1) notFound();

  const prev = index > 0 ? stops[index - 1] : null;
  const next = index < stops.length - 1 ? stops[index + 1] : null;

  const rawContent = getStopContent(params.slug);
  const htmlContent = marked.parse(rawContent, { async: false }) as string;

  return (
    <article>
      {/* Hero */}
      <header className="sm:section-shell sm:pt-6">
        <div className="relative overflow-hidden sm:rounded-[2rem] rounded-b-[2rem] bg-navy-dark">
          <HeroImage heroImage={stop.heroImage} title={stop.title} eager className="h-[58vh] min-h-[340px] max-h-[560px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/30 to-transparent" />
          <Link
            href="/map"
            className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur pl-2 pr-3.5 py-2 text-sm font-medium text-navy shadow-soft"
          >
            <ChevronLeftIcon /> Trail
          </Link>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white">
            <p className="eyebrow text-gold mb-2">
              Stop {index + 1} of {stops.length}
              {stop.type ? ` · ${stop.type}` : ''}
            </p>
            <h1 className="font-serif text-[34px] sm:text-5xl font-semibold leading-[1.08]">{stop.title}</h1>
            {stop.year && <p className="mt-2 text-sm text-white/70">Established {stop.year}</p>}
          </div>
        </div>
      </header>

      <div className="section-shell max-w-2xl">
        {/* Quick facts + action */}
        <div className="surface-card mt-5 p-4">
          {stop.address && (
            <p className="flex items-start gap-2 text-sm text-slate-600">
              <PinIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-dark" />
              {stop.address}
            </p>
          )}
          <a
            href={googleMapsPlaceUrl(stop.lat, stop.lng)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full mt-3"
          >
            <NavigateIcon />
            Get directions
          </a>
        </div>

        {/* Lead */}
        <p className="mt-8 font-serif text-[21px] leading-relaxed text-navy">{stop.shortSummary}</p>
        <div className="my-8 h-px bg-gradient-to-r from-gold/60 via-gold/20 to-transparent" />

        {/* Story */}
        <div className="prose-faith" dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {/* Prev / next */}
        <nav className="mt-12 grid grid-cols-2 gap-3" aria-label="Trail navigation">
          {prev ? (
            <Link href={`/stops/${prev.slug}`} className="surface-card surface-card-hover p-4">
              <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                <ChevronLeftIcon className="w-3.5 h-3.5" /> Previous
              </span>
              <span className="mt-1 block font-serif text-[15px] font-semibold leading-snug text-navy">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/stops/${next.slug}`} className="surface-card surface-card-hover p-4 text-right bg-navy ring-0">
              <span className="flex items-center justify-end gap-1 text-xs font-medium text-gold">
                Next stop <ChevronRightIcon className="w-3.5 h-3.5" />
              </span>
              <span className="mt-1 block font-serif text-[15px] font-semibold leading-snug text-white">{next.title}</span>
            </Link>
          ) : (
            <Link href="/map" className="surface-card surface-card-hover p-4 text-right bg-navy ring-0">
              <span className="text-xs font-medium text-gold">End of the trail</span>
              <span className="mt-1 block font-serif text-[15px] font-semibold leading-snug text-white">Back to the trail</span>
            </Link>
          )}
        </nav>

        {/* Sources */}
        <details className="group mt-6 surface-card p-4 text-sm text-slate-600">
          <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-navy">
            Sources &amp; image credit
            <ChevronRightIcon className="w-4 h-4 transition-transform group-open:rotate-90" />
          </summary>
          <p className="mt-3 text-slate-500">{stop.imageAttribution}</p>
          {stop.sources.length > 0 && (
            <ul className="mt-3 space-y-2">
              {stop.sources.map((src, i) => (
                <li key={i}>
                  <a href={src} className="inline-flex items-center gap-1.5 text-navy underline decoration-gold/50 underline-offset-2" target="_blank" rel="noopener noreferrer">
                    {hostname(src)}
                    <ExternalIcon />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </details>
      </div>
    </article>
  );
}
