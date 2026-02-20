export interface Stop {
  id: string;
  slug: string;
  title: string;
  lat: number;
  lng: number;
  shortSummary: string;
  address?: string;
  heroImage: string;
  imageAttribution: string;
  sources: string[];
}
