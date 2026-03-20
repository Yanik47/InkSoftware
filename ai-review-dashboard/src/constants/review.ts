import type { ReviewStatus } from "../types/conversation";

export type ReviewFilter = ReviewStatus | "all";

type ReviewStatusConfig = {
  label: string;
  dot: string;
  badgeClassName: string;
};

export const REVIEW_STATUS_CONFIG: Record<ReviewStatus, ReviewStatusConfig> = {
  pending: {
    label: "Pending",
    dot: "●",
    badgeClassName:
      "border-status-pending/30 bg-status-pending/10 text-status-pending",
  },
  approved: {
    label: "Approved",
    dot: "●",
    badgeClassName:
      "border-status-approved/30 bg-status-approved/10 text-status-approved",
  },
  needs_fix: {
    label: "Needs fix",
    dot: "●",
    badgeClassName:
      "border-status-needsfix/30 bg-status-needsfix/10 text-status-needsfix",
  },
};

export const REVIEW_STATUS_ORDER: ReviewStatus[] = [
  "pending",
  "approved",
  "needs_fix",
];

export const REVIEW_FILTER_OPTIONS: Array<{
  value: ReviewFilter;
  label: string;
}> = [
  { value: "all", label: "All" },
  ...REVIEW_STATUS_ORDER.map((status) => ({
    value: status,
    label: REVIEW_STATUS_CONFIG[status].label,
  })),
];