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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">{stop.title}</h1>
      {stop.address && (
        <p className="text-gray-500 mb-4">
          📍 {stop.address}
        </p>
      )}
      <div className="mb-6">
        <OpenInMapsButton lat={stop.lat} lng={stop.lng} label="Open in Maps" />
      </div>
      <div
        className="prose prose-blue max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-medium mb-1">Image Attribution</p>
        <p>{stop.imageAttribution}</p>
        {stop.sources.length > 0 && (
          <>
            <p className="font-medium mt-3 mb-1">Sources</p>
            <ul className="list-disc ml-4">
              {stop.sources.map((src, i) => (
                <li key={i}><a href={src} className="text-blue-600 underline break-all" target="_blank" rel="noopener noreferrer">{src}</a></li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
