/**
 * Convert a Wikipedia file page URL to a direct Wikimedia Commons image URL.
 * e.g. https://en.wikipedia.org/wiki/File:Foo.jpg
 *   → https://commons.wikimedia.org/wiki/Special:FilePath/Foo.jpg
 */
export function getWikimediaImageUrl(heroImage: string): string {
  const match = heroImage.match(/\/File:([^?#]+)/);
  if (!match) return heroImage;
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${match[1]}`;
}
