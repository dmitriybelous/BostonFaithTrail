'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'Home' },
    { href: '/map', label: 'Map' },
    { href: '/stops', label: 'Stops' },
    { href: '/attributions', label: 'Attributions' },
  ];
  return (
    <nav className="bg-blue-900 text-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">⛪ Faith Trail</Link>
        <div className="flex gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                pathname === href ? 'bg-blue-700' : 'hover:bg-blue-800'
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
