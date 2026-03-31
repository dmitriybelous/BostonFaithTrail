import { getAllStops, getStopBySlug, getStopContent } from '@/lib/stops';
import OpenInMapsButton from '@/components/OpenInMapsButton';
import HeroImage from '@/components/HeroImage';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

export async function generateStaticParams() {
  const stops = getAllStops();
  return stops.map((stop) => ({ slug: stop.slug }));
}

interface PageProps {
  params: { slug: string };
}

export default function StopDetailPage({ params }: PageProps) {
  const stop = getStopBySlug(params.slug);
  if (!stop) notFound();

  const rawContent = getStopContent(params.slug);
  const htmlContent = marked.parse(rawContent, { async: false }) as string;

  return (
    <div className="section-shell py-8">
      <div className="surface-card overflow-hidden">
        {/* Hero image */}
        {stop.heroImage && (
          <HeroImage
            heroImage={stop.heroImage}
            title={stop.title}
            type={stop.type}
            className="h-56 sm:h-80 mb-0"
          />
        )}

        {/* Header section */}
        <div className="p-6 sm:p-8 pb-0 sm:pb-0">
          <h1 className="text-2xl sm:text-4xl font-bold text-navy mb-2 font-serif">{stop.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
            {stop.address && (
              <span className="flex items-center gap-1">📍 {stop.address}</span>
            )}
            {stop.year && (
              <span className="flex items-center gap-1 bg-cream px-2 py-0.5 rounded-full text-xs font-medium text-slate-600">
                Est. {stop.year}
              </span>
            )}
            {stop.type && (
              <span className="flex items-center gap-1 bg-navy/5 px-2 py-0.5 rounded-full text-xs font-medium text-navy">
                {stop.type}
              </span>
            )}
          </div>
          <div className="mb-6 flex">
            <OpenInMapsButton lat={stop.lat} lng={stop.lng} label="Open in Maps" className="w-full sm:w-auto justify-center" />
          </div>
          <hr className="border-slate-200" />
        </div>

        {/* Markdown content with enhanced prose styling */}
        <div
          className="prose prose-slate prose-faith max-w-none p-6 sm:p-8 pt-2 sm:pt-4 prose-headings:font-semibold prose-a:text-navy prose-blockquote:border-gold prose-blockquote:bg-cream/60 prose-strong:text-slate-900 prose-h2:border-b prose-h2:border-gold/30 prose-h2:pb-2"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>

      {/* Attribution card */}
      <div className="surface-card p-4 sm:p-5 text-sm text-slate-600 mt-4">
        <p className="font-semibold mb-1 text-slate-800">Image Attribution</p>
        <p>{stop.imageAttribution}</p>
        {stop.sources.length > 0 && (
          <>
            <p className="font-semibold mt-3 mb-1 text-slate-800">Sources</p>
            <ul className="list-disc ml-4">
              {stop.sources.map((src, i) => (
                <li key={i}><a href={src} className="text-navy underline break-all" target="_blank" rel="noopener noreferrer">{src}</a></li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
