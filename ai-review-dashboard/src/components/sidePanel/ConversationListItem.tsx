import type { Conversation } from "../../types/conversation";
import { formatListDate } from "../../lib/format";
import ReviewStatusBadge from "../review/ReviewStatusBadge";
import {memo} from "react";



type ConversationListItemProps = {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
};

function ConversationListItem({
  conversation,
  isSelected,
  onClick,
}: ConversationListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`card-ui w-full p-4 text-left transition hover:border-border-strong hover:bg-bg-muted ${
        isSelected ? "ring-1 ring-border-accent" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-text-primary">
              {conversation.title}
            </h3>
          </div>
          <p className="mt-1 text-xs text-text-muted">
            {conversation.category} · {conversation.customerCity}
          </p>
        </div>

        <ReviewStatusBadge status={conversation.status} compact />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-text-secondary">
        <span>{conversation.messages.length} messages</span>
        <span>{formatListDate(conversation.updatedAt)}</span>
      </div>
    </button>
  );
}

export default memo(ConversationListItem);
