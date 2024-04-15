import { parseISO, formatDistanceToNow } from "date-fns";

export function getTimePeriod(timestamp: string | undefined) {
  if (!timestamp) {
    return "";
  }
  const date = parseISO(timestamp);
  const timePeriod = formatDistanceToNow(date);
  return `${timePeriod} ago`;
}
