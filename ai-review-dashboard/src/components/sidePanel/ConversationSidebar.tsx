import { useMemo, useState, memo } from "react";

import type { Conversation, ReviewStatus } from "../../types/conversation";
import SearchPanel from "./SearchPanel";
import ConversationListItem from "./ConversationListItem";

type ConversationSidebarProps = {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
};

function ConversationSidebar({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationSidebarProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ReviewStatus | "all">("all");

  const filteredConversations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...conversations]
      .filter((conversation) => {
        if (activeFilter !== "all" && conversation.status !== activeFilter) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        return [
          conversation.title,
          conversation.category,
          conversation.customerCity,
          conversation.messages.map((message) => message.text).join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .sort(
        (left, right) =>
          new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
      );
  }, [activeFilter, conversations, query]);

  return (
    <div className="flex h-full flex-col gap-4 p-3 md:p-4">
      <SearchPanel
        query={query}
        onQueryChange={setQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="flex items-center justify-between px-1">
        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
          Conversations
        </p>
        <span className="text-xs text-text-secondary">
          {filteredConversations.length}
        </span>
      </div>

      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto pr-1 pl-1 pt-1">
        {filteredConversations.map((conversation) => (
          <ConversationListItem
            key={conversation.id}
            conversation={conversation}
            isSelected={conversation.id === selectedConversationId}
            onClick={() => onSelectConversation(conversation.id)}
          />
        ))}

        {filteredConversations.length === 0 ? (
          <div className="card-ui px-4 py-6 text-sm text-text-secondary">
            No conversations match the current search.
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default memo(ConversationSidebar);