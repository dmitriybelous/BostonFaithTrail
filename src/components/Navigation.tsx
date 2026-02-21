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
    <nav className="bg-navy text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg font-serif tracking-wide flex items-center gap-2">
          <span className="text-xl">🧭</span>
          <span>Faith Trail</span>
        </Link>
        <div className="flex gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? 'bg-gold text-white'
                  : 'text-blue-200 hover:bg-navy-light hover:text-white'
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
