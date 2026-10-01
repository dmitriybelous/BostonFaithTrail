import Link from 'next/link';
import { getAllStops } from '@/lib/stops';
import { trailDistanceMiles } from '@/lib/geo';
import StopCard from '@/components/StopCard';
import HeroImage from '@/components/HeroImage';
import { ChevronRightIcon, RouteIcon, PinIcon, CheckIcon } from '@/components/Icons';

const HERO_SLUG = 'park-street-church';

export default function HomePage() {
  const stops = getAllStops();
  const heroStop = stops.find((s) => s.slug === HERO_SLUG) ?? stops[0];
  const miles = trailDistanceMiles(stops);
  // Allow for street routing on top of the straight-line distance at ~20 min/mile.
  const minutes = Math.round((miles * 1.3 * 20) / 5) * 5;

  return (
    <div>
      {/* Hero */}
      <section className="sm:section-shell sm:pt-6">
        <div className="relative overflow-hidden sm:rounded-[2rem] rounded-b-[2rem] bg-navy-dark">
          {heroStop && (
            <HeroImage
              heroImage={heroStop.heroImage}
              title={heroStop.title}
              eager
              className="absolute inset-0 h-full"
              imgClassName="opacity-70"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/60 to-navy-dark/10" />
          <div className="relative px-6 sm:px-12 pt-40 sm:pt-56 pb-8 sm:pb-12 text-white">
            <p className="eyebrow text-gold mb-3">A self-guided walking tour</p>
            <h1 className="font-serif text-[40px] sm:text-6xl font-semibold leading-[1.05] tracking-tight max-w-xl">
              Four centuries of faith in the heart of Boston
            </h1>
            <p className="mt-4 text-[15px] sm:text-lg text-white/80 leading-relaxed max-w-md">
              Walk from Boston Common to the meeting houses, churches and memorials that shaped the city&apos;s spiritual life.
            </p>

            <dl className="mt-6 flex gap-6 text-sm">
              <div>
                <dt className="text-white/60 text-xs">Stops</dt>
                <dd className="font-serif text-2xl font-semibold">{stops.length}</dd>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <dt className="text-white/60 text-xs">Distance</dt>
                <dd className="font-serif text-2xl font-semibold">~{(miles * 1.3).toFixed(1)} mi</dd>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <dt className="text-white/60 text-xs">Walking</dt>
                <dd className="font-serif text-2xl font-semibold">~{minutes} min</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/map" className="btn-light">
                <RouteIcon className="w-5 h-5" />
                Start the trail
              </Link>
              <Link href="/stops" className="btn-ghost">
                Browse all stops
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured carousel */}
      <section className="pt-10">
        <div className="section-shell flex items-end justify-between mb-4">
          <div>
            <p className="eyebrow mb-1">Along the way</p>
            <h2 className="font-serif text-[26px] font-semibold text-navy">Featured stops</h2>
          </div>
          <Link href="/stops" className="flex items-center gap-0.5 text-sm font-medium text-navy">
            See all <ChevronRightIcon />
          </Link>
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-4 px-4 sm:px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))] pb-2">
          {stops.map((stop, index) => (
            <div key={stop.id} className="snap-start flex-shrink-0 w-[68vw] max-w-[260px]">
              <StopCard stop={stop} index={index} variant="feature" />
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section-shell pt-10">
        <p className="eyebrow mb-1">How it works</p>
        <h2 className="font-serif text-[26px] font-semibold text-navy mb-5">Walk at your own pace</h2>
        <ol className="grid gap-3 sm:grid-cols-3">
          {[
            { Icon: RouteIcon, title: 'Follow the route', text: 'Stops are numbered in walking order, starting on Boston Common.' },
            { Icon: PinIcon, title: 'Get directions', text: 'Open any stop in your maps app with a single tap.' },
            { Icon: CheckIcon, title: 'Track your progress', text: 'Mark stops as visited — your progress is saved on this device.' },
          ].map(({ Icon, title, text }) => (
            <li key={title} className="surface-card p-5 flex gap-4 sm:flex-col">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold-light text-gold-dark">
                <Icon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-semibold text-navy">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Closing CTA */}
      <section className="section-shell pt-10">
        <div className="rounded-3xl bg-navy px-6 py-8 sm:px-10 text-center text-white">
          <h2 className="font-serif text-2xl font-semibold">Ready to begin?</h2>
          <p className="mt-2 text-sm text-white/70">The trail starts at the {stops[0]?.title ?? 'Boston Common'}.</p>
          <Link href="/map" className="btn-light mt-6 w-full sm:w-auto">
            Open the trail guide
          </Link>
        </div>
      </section>
    </div>
  );
}
