export function formatCreatedAt(timestamp?: string | null) {
  if (!timestamp) return null;
  const tz = process.env.DEFAULT_TIMEZONE || 'Asia/Jakarta';
  try {
    const d = new Date(timestamp);
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(d);
  } catch {
    return new Date(timestamp).toString();
  }
}