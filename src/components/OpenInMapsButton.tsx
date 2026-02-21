interface OpenInMapsButtonProps {
  lat: number;
  lng: number;
  label?: string;
  className?: string;
}

export default function OpenInMapsButton({ lat, lng, label = 'Open in Maps', className = '' }: OpenInMapsButtonProps) {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 bg-navy text-white px-3 py-2 rounded-xl font-medium hover:bg-navy-light transition-colors shadow-sm ${className}`}
    >
      🗺️ {label}
    </a>
  );
}
