/**
 * Format an ISO calendar date (`YYYY-MM-DD`) for display without timezone shift.
 * Parsing as UTC midnight would roll back a day in western timezones.
 */
export function formatDate(dateString: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
