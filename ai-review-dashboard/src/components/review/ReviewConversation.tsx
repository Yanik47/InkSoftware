import { useState, memo } from "react";

import type {
  Conversation,
  Message,
  ReviewStatus,
} from "../../types/conversation";
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

  const selectedMessageNotes = selectedMessage
    ? conversation.messageNotes.filter(
        (note) => note.messageId === selectedMessage.id,
      )
    : [];

  const handleConversationNoteSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    onAddConversationNote(conversation.id, conversationNote);
    setConversationNote("");
  };

  const handleMessageNoteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedMessage) return;

    onAddMessageNote(conversation.id, selectedMessage.id, messageNote);
    setMessageNote("");
  };

  return (
    <div className="flex h-full flex-col">
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

      <div className="no-scrollbar flex-1 space-y-5 overflow-y-auto px-4 py-4 md:px-5 md:py-5">
        <section className="card-ui p-4">
          <p className="mb-3 text-sm font-semibold text-text-primary">Status</p>
          <div className="grid gap-2">
            {statuses.map((status) => {
              const active = conversation.status === status;

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
                  <span className="capitalize text-text-primary">
                    {status.replace("_", " ")}
                  </span>
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
              >
                <textarea
                  value={messageNote}
                  onChange={(event) => setMessageNote(event.target.value)}
                  placeholder="Add a note for this message"
                  rows={4}
                  className="control-ui w-full resize-none px-3 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
                />
                <button
                  type="submit"
                  className="rounded-[14px] bg-accent-blue px-4 py-3 text-sm font-semibold text-text-primary transition hover:opacity-90"
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
          <form className="grid gap-3" onSubmit={handleConversationNoteSubmit}>
            <textarea
              value={conversationNote}
              onChange={(event) => setConversationNote(event.target.value)}
              placeholder="Summarize the overall quality of this conversation"
              rows={4}
              className="control-ui w-full resize-none px-3 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
            />
            <button
              type="submit"
              className="rounded-[14px] bg-bg-elevated px-4 py-3 text-sm font-semibold text-text-primary ring-1 ring-border-default transition hover:bg-bg-muted"
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
