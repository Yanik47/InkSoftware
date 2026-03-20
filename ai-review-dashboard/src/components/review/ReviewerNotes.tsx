import type { ConversationNote, MessageNote } from "../../types/conversation";
import { formatFullDate } from "../../lib/format";
import { memo } from "react";

type ReviewNotesProps = {
  title: string;
  notes: ConversationNote[] | MessageNote[];
  emptyText: string;
};

function ReviewNotes({
  title,
  notes,
  emptyText,
}: ReviewNotesProps) {
  return (
    <section className="grid gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        <span className="text-xs text-text-muted">{notes.length}</span>
      </div>

      {notes.length === 0 ? (
        <div className="rounded-[16px] border border-dashed border-border-default px-4 py-4 text-sm text-text-secondary">
          {emptyText}
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <article
              key={note.id}
              className="rounded-[16px] border border-border-subtle bg-bg-elevated px-4 py-3"
            >
              <p className="text-sm leading-6 text-text-primary">{note.text}</p>
              <p className="mt-2 text-xs text-text-muted">
                {formatFullDate(note.createdAt)}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default memo(ReviewNotes);