import { memo, useMemo, useState } from "react";

import type {
  Conversation,
  Message,
  ReviewStatus,
} from "../../types/conversation";
import {
  REVIEW_STATUS_CONFIG,
  REVIEW_STATUS_ORDER,
} from "../../constants/review";
import ReviewStatusBadge from "./ReviewStatusBadge";
import ReviewNotes from "./ReviewerNotes";

type ReviewConversationProps = {
  conversation: Conversation;
  selectedMessage: Message | null;
  onChangeStatus: (conversationId: string, nextStatus: ReviewStatus) => void;
  onAddConversationNote: (conversationId: string, text: string) => void;
  onAddMessageNote: (
    conversationId: string,
    messageId: string,
    text: string,
  ) => void;
  onBackToConversation: () => void;
};

const statuses: ReviewStatus[] = ["pending", "approved", "needs_fix"];

function ReviewConversation({
  conversation,
  selectedMessage,
  onChangeStatus,
  onAddConversationNote,
  onAddMessageNote,
  onBackToConversation,
}: ReviewConversationProps) {
  const [conversationNote, setConversationNote] = useState("");
  const [messageNote, setMessageNote] = useState("");

  const [conversationNoteError, setConversationNoteError] = useState<
    string | null
  >(null);

  const [messageNoteError, setMessageNoteError] = useState<string | null>(null);

  const selectedMessageNotes = useMemo(() => {
    if (!selectedMessage) {
      return [];
    }

    return conversation.messageNotes.filter(
      (note) => note.messageId === selectedMessage.id,
    );
  }, [conversation.messageNotes, selectedMessage]);

  const trimmedConversationNote = conversationNote.trim();
  const trimmedMessageNote = messageNote.trim();

  const isConversationNoteValid = trimmedConversationNote.length > 0;
  const isMessageNoteValid = trimmedMessageNote.length > 0;

  const handleConversationNoteChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const nextValue = event.target.value;
    setConversationNote(nextValue);

    if (conversationNoteError && nextValue.trim()) {
      setConversationNoteError(null);
    }
  };

  const handleMessageNoteChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const nextValue = event.target.value;
    setMessageNote(nextValue);

    if (messageNoteError && nextValue.trim()) {
      setMessageNoteError(null);
    }
  };

  const handleConversationNoteSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!isConversationNoteValid) {
      setConversationNoteError("Please enter a note before saving.");
      return;
    }

    onAddConversationNote(conversation.id, trimmedConversationNote);
    setConversationNote("");
    setConversationNoteError(null);
  };

  const handleMessageNoteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedMessage) return;

    if (!isMessageNoteValid) {
      setMessageNoteError("Please enter a note before saving.");
      return;
    }

    onAddMessageNote(conversation.id, selectedMessage.id, trimmedMessageNote);
    setMessageNote("");
    setMessageNoteError(null);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex items-center justify-between gap-3 border-b border-border-subtle px-4 py-4 pb-5 md:px-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
            Review conversation
          </p>
          <h2 className="text-base font-semibold text-text-primary md:text-lg">
            QA actions
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <ReviewStatusBadge status={conversation.status} />
          <button
            type="button"
            onClick={onBackToConversation}
            className="control-ui px-3 py-2 text-sm font-medium text-text-primary lg:hidden"
          >
            Back
          </button>
        </div>
      </header>

      <div className="no-scrollbar min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4 md:px-5 md:py-5">
        <section className="card-ui p-4">
          <p className="mb-3 text-sm font-semibold text-text-primary">Status</p>

          <div className="grid gap-2">
            {REVIEW_STATUS_ORDER.map((status) => {
              const active = conversation.status === status;
              const config = REVIEW_STATUS_CONFIG[status];

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => onChangeStatus(conversation.id, status)}
                  className={`flex items-center justify-between rounded-[14px] border px-3 py-3 text-left text-sm transition ${
                    active
                      ? "border-border-accent bg-accent-blue/10"
                      : "border-border-subtle bg-bg-elevated hover:border-border-strong"
                  }`}
                >
                  <span className="text-text-primary">{config.label}</span>
                  <ReviewStatusBadge status={status} compact />
                </button>
              );
            })}
          </div>
        </section>

        <section className="card-ui p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-text-primary">
              Selected message
            </h3>
            <span className="text-xs text-text-muted">
              {selectedMessage ? selectedMessage.role : "none"}
            </span>
          </div>

          {selectedMessage ? (
            <>
              <div className="rounded-[14px] border border-border-subtle bg-bg-muted px-3 py-3 text-sm leading-6 text-text-primary">
                {selectedMessage.text}
              </div>

              <form
                className="mt-4 grid gap-3"
                onSubmit={handleMessageNoteSubmit}
                noValidate
              >
                <textarea
                  value={messageNote}
                  onChange={handleMessageNoteChange}
                  placeholder="Add a note for this message"
                  rows={4}
                  aria-invalid={Boolean(messageNoteError)}
                  className={`control-ui w-full resize-none px-3 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted ${
                    messageNoteError ? "ring-1 ring-status-needsfix" : ""
                  }`}
                />

                <p
                  className={`text-xs ${
                    messageNoteError
                      ? "text-status-needsfix"
                      : "text-text-muted"
                  }`}
                >
                  {messageNoteError ??
                    "Add a clear internal note tied to the selected message."}
                </p>

                <button
                  type="submit"
                  disabled={!isMessageNoteValid}
                  className="rounded-[14px] bg-accent-blue px-4 py-3 text-sm font-semibold text-text-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Save message note
                </button>
              </form>
            </>
          ) : (
            <div className="rounded-[14px] border border-dashed border-border-default px-4 py-6 text-sm text-text-secondary">
              Select a message in the conversation to attach a note.
            </div>
          )}
        </section>

        <ReviewNotes
          title="Message notes"
          notes={selectedMessageNotes}
          emptyText="No notes for the selected message yet."
        />

        <section className="card-ui p-4">
          <h3 className="mb-3 text-sm font-semibold text-text-primary">
            Conversation note
          </h3>

          <form className="grid gap-3" onSubmit={handleConversationNoteSubmit} noValidate>
            <textarea
              value={conversationNote}
              onChange={handleConversationNoteChange}
              placeholder="Summarize the overall quality of this conversation"
              rows={4}
              aria-invalid={Boolean(conversationNoteError)}
              className={`control-ui w-full resize-none px-3 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted ${
                conversationNoteError ? "ring-1 ring-status-needsfix" : ""
              }`}
            />

            <p
              className={`text-xs ${
                conversationNoteError
                  ? "text-status-needsfix"
                  : "text-text-muted"
              }`}
            >
              {conversationNoteError ??
                "Summarize the overall quality, risks, or follow-up needed."}
            </p>

            <button
              type="submit"
              disabled={!isConversationNoteValid}
              className="rounded-[14px] bg-bg-elevated px-4 py-3 text-sm font-semibold text-text-primary ring-1 ring-border-default transition hover:bg-bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save conversation note
            </button>
          </form>
        </section>

        <ReviewNotes
          title="Conversation notes"
          notes={conversation.notes}
          emptyText="No conversation notes yet."
        />
      </div>
    </div>
  );
}

export default memo(ReviewConversation);