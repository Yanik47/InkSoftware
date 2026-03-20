import type { Conversation, MessageNote } from "../../types/conversation";
import EmptyState from "../states/EmptyState";
import MessageBubble from "./MessageBubble";
import ReviewStatusBadge from "../review/ReviewStatusBadge";
import { memo, useMemo } from "react";
import WeatherCard from "../weather/WeatherCard";

type ConversationDetailsProps = {
  conversation: Conversation;
  selectedMessageId: string | null;
  onSelectMessage: (messageId: string) => void;
  onBackToList: () => void;
  onOpenReview: () => void;
};

function formatHeaderTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function ConversationDetails({
  conversation,
  selectedMessageId,
  onSelectMessage,
  onBackToList,
  onOpenReview,
}: ConversationDetailsProps) {
  const notesByMessageId = useMemo(() => {
    return conversation.messageNotes.reduce<Record<string, MessageNote[]>>(
      (accumulator, note) => {
        const currentNotes = accumulator[note.messageId] ?? [];
        accumulator[note.messageId] = [...currentNotes, note];
        return accumulator;
      },
      {},
    );
  }, [conversation.messageNotes]);
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <header className="shrink-0 border-b border-border-subtle px-4 py-3 md:px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <button
              type="button"
              onClick={onBackToList}
              className="control-ui flex h-10 w-10 shrink-0 items-center justify-center text-sm lg:hidden"
              aria-label="Back to conversation list"
            >
              ←
            </button>

            <div className="min-w-0">
              <h2 className="line-clamp-2 text-base font-semibold leading-5 text-text-primary md:text-lg">
                {conversation.title}
              </h2>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-secondary">
                <span className="rounded-full border border-border-subtle bg-bg-elevated px-2 py-1">
                  {conversation.category}
                </span>
                <span>{conversation.customerCity}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenReview}
            className="control-ui shrink-0 px-3 py-2 text-sm font-medium text-text-primary lg:hidden"
          >
            Review
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <ReviewStatusBadge status={conversation.status} />

          <span className="rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-text-secondary">
            {conversation.messages.length} messages
          </span>

          {!!conversation.notes.length && (
            <span className="rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-text-secondary">
              {conversation.notes.length} notes
            </span>
          )}

          <span className="rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-text-secondary">
            Updated {formatHeaderTime(conversation.updatedAt)}
          </span>
        </div>
      </header>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-5 md:py-5">
        <div className="mb-4">
          <WeatherCard city={conversation.customerCity} />
        </div>
        {conversation.messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <EmptyState
              title="No messages"
              description="This conversation does not contain any messages yet."
            />
          </div>
        ) : (
          <div className="space-y-4">
            {conversation.messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                notes={notesByMessageId[message.id] ?? []}
                isSelected={selectedMessageId === message.id}
                onSelect={() => onSelectMessage(message.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ConversationDetails);
