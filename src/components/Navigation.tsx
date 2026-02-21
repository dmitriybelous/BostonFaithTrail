'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'Home' },
    { href: '/map', label: 'Trail' },
    { href: '/stops', label: 'Stops' },
    { href: '/attributions', label: 'About' },
  ];
  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="section-shell py-2 sm:h-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <Link href="/" className="font-semibold text-slate-900 text-lg tracking-tight flex items-center gap-2 self-start">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white shadow-sm text-base">🧭</span>
          <span>Faith Trail</span>
        </Link>
        <div className="grid grid-cols-4 sm:flex gap-1 rounded-xl bg-slate-100 p-1 w-full sm:w-auto">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm text-center font-medium transition-colors min-h-10 ${
                pathname === href
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-navy'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
