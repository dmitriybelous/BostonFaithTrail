import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Boston Faith Trail',
  description: "Explore Boston's historic faith communities on an interactive trail.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/BostonFaithTrail/manifest.json" />
        <meta name="theme-color" content="#1e3a5f" />
        <link rel="apple-touch-icon" href="/BostonFaithTrail/icons/icon-192.png" />
      </head>
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/BostonFaithTrail/sw.js');
            });
          }
        ` }} />
      </body>
    </html>
  );
}
