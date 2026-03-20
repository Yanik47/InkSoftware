import type { ReviewStatus } from "../../types/conversation";

type ReviewStatusBadgeProps = {
  status: ReviewStatus;
  compact?: boolean;
};

const statusMap: Record<
  ReviewStatus,
  { label: string; dot: string; className: string }
> = {
  pending: {
    label: "Pending",
    dot: "●",
    className:
      "border-status-pending/30 bg-status-pending/10 text-status-pending",
  },
  approved: {
    label: "Approved",
    dot: "●",
    className:
      "border-status-approved/30 bg-status-approved/10 text-status-approved",
  },
  needs_fix: {
    label: "Needs fix",
    dot: "●",
    className:
      "border-status-needsfix/30 bg-status-needsfix/10 text-status-needsfix",
  },
};

export default function ReviewStatusBadge({
  status,
  compact = false,
}: ReviewStatusBadgeProps) {
  const config = statusMap[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-medium ${config.className} ${
        compact ? "text-[11px]" : "text-xs"
      }`}
    >
      <span className="text-[10px]">{config.dot}</span>
      {config.label}
    </span>
  );
}
