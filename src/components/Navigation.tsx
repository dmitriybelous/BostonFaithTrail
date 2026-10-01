'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, RouteIcon, ListIcon, InfoIcon, CrossMark } from '@/components/Icons';

const links = [
  { href: '/', label: 'Home', Icon: HomeIcon },
  { href: '/map', label: 'Trail', Icon: RouteIcon },
  { href: '/stops', label: 'Stops', Icon: ListIcon },
  { href: '/attributions', label: 'About', Icon: InfoIcon },
];

function isActive(pathname: string, href: string) {
  const path = pathname.replace(/\/$/, '') || '/';
  return href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`);
}

export default function Navigation() {
  const pathname = usePathname() ?? '/';

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-xl border-b border-black/[0.05] pt-[env(safe-area-inset-top)]">
        <div className="section-shell h-14 sm:h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy text-gold">
              <CrossMark className="w-4 h-4" />
            </span>
            <span className="font-serif text-[19px] font-semibold text-navy tracking-tight">
              Boston Faith Trail
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1" aria-label="Main">
            {links.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    active ? 'bg-navy text-white' : 'text-slate-600 hover:text-navy hover:bg-black/[0.04]'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Bottom tab bar (mobile) */}
      <nav
        aria-label="Main"
        className="sm:hidden fixed inset-x-0 bottom-0 z-[1100] bg-white/85 backdrop-blur-xl border-t border-black/[0.06] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-4 h-16">
          {links.map(({ href, label, Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium ${
                  active ? 'text-navy' : 'text-slate-400'
                }`}
              >
                <span className={`flex items-center justify-center h-7 w-12 rounded-full transition-colors ${active ? 'bg-gold-light' : ''}`}>
                  <Icon className="w-[22px] h-[22px]" />
                </span>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
