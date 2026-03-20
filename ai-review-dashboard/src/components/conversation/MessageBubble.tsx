import type { Message, MessageNote } from "../../types/conversation";
import { formatFullDate, formatTime } from "../../lib/format";
import { memo } from "react";

type MessageBubbleProps = {
  message: Message;
  notes: MessageNote[];
  isSelected: boolean;
  onSelect: () => void;
};

function MessageBubble({
  message,
  notes,
  isSelected,
  onSelect,
}: MessageBubbleProps) {
  const isCustomer = message.role === "customer";

  return (
    <div className={` flex ${isCustomer ? "justify-start" : "justify-end"}`}>
      <div className="max-w-[85%] md:max-w-[75%]">
        <button
          type="button"
          onClick={onSelect}
          className={`w-full text-left transition ${
            isCustomer ? "bubble-customer" : "bubble-assistant"
          } ${isSelected ? "ring-2 ring-border-accent" : "hover:border-border-strong"}`}
        >
          <div className="flex items-center justify-between gap-3 px-4 pb-1 pt-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              {isCustomer ? "Client" : "Assistant"}
            </span>
            <span
              className="text-[11px] text-text-muted"
              title={formatFullDate(message.timestamp)}
            >
              {formatTime(message.timestamp)}
            </span>
          </div>

          <div className="px-4 pb-4 pt-1 text-sm leading-6 text-text-primary">
            {message.text}
          </div>
        </button>

        {notes.length > 0 ? (
          <div className="mt-2 space-y-2 px-1">
            {notes.map((note) => (
              <div
                key={note.id}
                className="rounded-[14px] border border-border-subtle bg-bg-elevated px-3 py-2 text-xs leading-5 text-text-secondary"
              >
                <span className="mr-2 rounded-full bg-bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-blue">
                  Message note
                </span>
                {note.text}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default memo(MessageBubble);

