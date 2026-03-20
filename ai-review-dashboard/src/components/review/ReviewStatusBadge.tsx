import type { ReviewStatus } from "../../types/conversation";
import { REVIEW_STATUS_CONFIG } from "../../constants/review";

type ReviewStatusBadgeProps = {
  status: ReviewStatus;
  compact?: boolean;
};

export default function ReviewStatusBadge({
  status,
  compact = false,
}: ReviewStatusBadgeProps) {
  const config = REVIEW_STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-medium ${config.badgeClassName} ${
        compact ? "text-[11px]" : "text-xs"
      }`}
    >
      <span className="text-[10px]">{config.dot}</span>
      {config.label}
    </span>
  );
}
