import fs from 'fs';
import path from 'path';
import { Stop } from '@/types/stop';

export function getAllStops(): Stop[] {
  const filePath = path.join(process.cwd(), 'data', 'stops.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as Stop[];
}

export function getStopBySlug(slug: string): Stop | undefined {
  return getAllStops().find((s) => s.slug === slug);
}

export function getStopContent(slug: string): string {
  const filePath = path.join(process.cwd(), 'content', 'stops', `${slug}.md`);
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return '# Content coming soon\n\nDetails for this stop are being added.';
  }
}
