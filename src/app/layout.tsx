import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const BASE_PATH = process.env.NODE_ENV === 'production' ? '/BostonFaithTrail' : '';

const serif = Fraunces({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: 'Boston Faith Trail',
  description: "Explore Boston's historic faith communities on an interactive trail.",
  appleWebApp: {
    capable: true,
    title: 'Faith Trail',
    statusBarStyle: 'default',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f7f3ec',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <link rel="manifest" href={`${BASE_PATH}/manifest.json`} />
        <link rel="icon" href={`${BASE_PATH}/favicon.ico`} />
        <link rel="mask-icon" href={`${BASE_PATH}/icons/mask-icon.svg`} color="#152744" />
        <link rel="apple-touch-icon" href={`${BASE_PATH}/icons/apple-touch-icon.png`} />
      </head>
      <body>
        <Navigation />
        <main className="min-h-screen pb-tabbar">{children}</main>
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
