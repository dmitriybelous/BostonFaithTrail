import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';

const BASE_PATH = process.env.NODE_ENV === 'production' ? '/BostonFaithTrail' : '';

export const metadata: Metadata = {
  title: 'Boston Faith Trail',
  description: "Explore Boston's historic faith communities on an interactive trail.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href={`${BASE_PATH}/manifest.json`} />
        <meta name="theme-color" content="#1e3a5f" />
        <link rel="icon" href={`${BASE_PATH}/favicon.ico`} />
        <link rel="mask-icon" href={`${BASE_PATH}/icons/mask-icon.svg`} color="#1e3a5f" />
        <link rel="apple-touch-icon" href={`${BASE_PATH}/icons/apple-touch-icon.png`} />
      </head>
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              var basePath = '${BASE_PATH}';
              navigator.serviceWorker.register(basePath + '/sw.js', {
                scope: (basePath || '/') + (basePath ? '/' : '')
              });
            });
          }
        ` }} />
      </body>
    </html>
  );
}
