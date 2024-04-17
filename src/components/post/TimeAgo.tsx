import { getTimePeriod } from "../../utils/timeUtils";

export default function TimeAgo({ createdAt }: { createdAt: string }) {
  const timeAgo = getTimePeriod(createdAt);
  return (
    <small className="text-muted">
      <i>{timeAgo}</i>
    </small>
  );
}
