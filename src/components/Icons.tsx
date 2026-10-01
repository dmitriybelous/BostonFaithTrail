type IconProps = { className?: string };

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function HomeIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

export function RouteIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="5" r="2.5" />
      <path d="M8.5 19H17a3.5 3.5 0 0 0 0-7H7a3.5 3.5 0 0 1 0-7h8.5" />
    </svg>
  );
}

export function ListIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="4" width="7" height="7" rx="1.5" />
      <rect x="3" y="13" width="7" height="7" rx="1.5" />
      <path d="M14 6h7M14 9h4M14 15h7M14 18h4" />
    </svg>
  );
}

export function InfoIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5v.01" />
    </svg>
  );
}

export function PinIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function NavigateIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 11 21 3l-8 18-2-8-8-2Z" />
    </svg>
  );
}

export function ChevronRightIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

export function CheckIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.25} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function CrosshairIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

export function CrossMark({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M12 3v18M6.5 8.5h11" />
    </svg>
  );
}

export function MapIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m9 4-6 2.5v13L9 17l6 3 6-2.5v-13L15 7 9 4Z" />
      <path d="M9 4v13M15 7v13" />
    </svg>
  );
}

export function ExternalIcon({ className = 'w-3.5 h-3.5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}
