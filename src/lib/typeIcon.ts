export function typeIcon(type?: string): string {
  switch (type?.toLowerCase()) {
    case 'church': return '⛪';
    case 'cathedral': return '⛪';
    case 'synagogue': return '✡️';
    case 'mosque': return '🕌';
    default: return '⛪';
  }
}
