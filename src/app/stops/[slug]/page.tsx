import { getAllStops, getStopBySlug, getStopContent } from '@/lib/stops';
import OpenInMapsButton from '@/components/OpenInMapsButton';
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
      <div className="surface-card p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{stop.title}</h1>
        {stop.address && (
          <p className="text-slate-500 mb-4">
          📍 {stop.address}
          </p>
        )}
        <div className="mb-6 flex">
          <OpenInMapsButton lat={stop.lat} lng={stop.lng} label="Open in Maps" className="w-full sm:w-auto justify-center" />
        </div>
        <div
          className="prose prose-slate max-w-none mb-8 prose-headings:font-semibold prose-a:text-navy"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>

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
