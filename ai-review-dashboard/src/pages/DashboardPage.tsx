import { useCallback, useMemo, useState } from "react";

import { AppLayout } from "../app/AppLayout";
import ConversationSidebar from "../components/sidePanel/ConversationSidebar";
import ConversationDetails from "../components/conversation/ConversationDetails";
import ReviewConversation from "../components/review/ReviewConversation";
import EmptyState from "../components/states/EmptyState";
import { mockConversations } from "../data/mockConversations";

import type {
  Conversation,
  ConversationNote,
  MessageNote,
  ReviewStatus,
} from "../types/conversation";

type MobilePane = "sidebar" | "main" | "review";

const getNowIso = () => new Date().toISOString();

function updateConversationById(
  conversations: Conversation[],
  conversationId: string,
  updater: (conversation: Conversation) => Conversation
) {
  return conversations.map((conversation) =>
    conversation.id === conversationId ? updater(conversation) : conversation
  );
}

function buildConversationNote(text: string): ConversationNote {
  return {
    id: crypto.randomUUID(),
    text,
    createdAt: getNowIso(),
  };
}

function buildMessageNote(messageId: string, text: string): MessageNote {
  return {
    id: crypto.randomUUID(),
    messageId,
    text,
    createdAt: getNowIso(),
  };
}

export function DashboardPage() {
  const [conversations, setConversations] = useState<Conversation[]>(
    () => mockConversations
  );

  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    () => mockConversations[0]?.id ?? null
  );

  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  const [activeMobilePane, setActiveMobilePane] = useState<MobilePane>("sidebar");

  const selectedConversation = useMemo(() => {
    if (!selectedConversationId) return null;

    return (
      conversations.find(
        (conversation) => conversation.id === selectedConversationId
      ) ?? null
    );
  }, [conversations, selectedConversationId]);

  const selectedMessage = useMemo(() => {
    if (!selectedConversation || !selectedMessageId) return null;

    return (
      selectedConversation.messages.find(
        (message) => message.id === selectedMessageId
      ) ?? null
    );
  }, [selectedConversation, selectedMessageId]);

  const handleSelectConversation = useCallback((conversationId: string) => {
    setSelectedConversationId(conversationId);
    setSelectedMessageId(null);
    setActiveMobilePane("main");
  }, []);

  const handleSelectMessage = useCallback((messageId: string | null) => {
    setSelectedMessageId(messageId);
  }, []);

  const handleBackToList = useCallback(() => {
    setActiveMobilePane("sidebar");
  }, []);

  const handleOpenReview = useCallback(() => {
    setActiveMobilePane("review");
  }, []);

  const handleBackToConversation = useCallback(() => {
    setActiveMobilePane("main");
  }, []);

  const handleChangeStatus = useCallback(
    (conversationId: string, nextStatus: ReviewStatus) => {
      setConversations((currentConversations) =>
        updateConversationById(currentConversations, conversationId, (conversation) => ({
          ...conversation,
          status: nextStatus,
          updatedAt: getNowIso(),
        }))
      );
    },
    []
  );

  const handleAddConversationNote = useCallback(
    (conversationId: string, text: string) => {
      const trimmedText = text.trim();

      if (!trimmedText) return;

      const newNote = buildConversationNote(trimmedText);

      setConversations((currentConversations) =>
        updateConversationById(currentConversations, conversationId, (conversation) => ({
          ...conversation,
          notes: [newNote, ...conversation.notes],
          updatedAt: getNowIso(),
        }))
      );
    },
    []
  );

  const handleAddMessageNote = useCallback(
    (conversationId: string, messageId: string, text: string) => {
      const trimmedText = text.trim();

      if (!trimmedText) return;

      const newNote = buildMessageNote(messageId, trimmedText);

      setConversations((currentConversations) =>
        updateConversationById(currentConversations, conversationId, (conversation) => ({
          ...conversation,
          messageNotes: [newNote, ...conversation.messageNotes],
          updatedAt: getNowIso(),
        }))
      );
    },
    []
  );

  return (
    <AppLayout
      activeMobilePane={activeMobilePane}
      onChangeMobilePane={setActiveMobilePane}
      sidebar={
        <ConversationSidebar
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
        />
      }
      main={
        selectedConversation ? (
          <ConversationDetails
            conversation={selectedConversation}
            selectedMessageId={selectedMessageId}
            onSelectMessage={handleSelectMessage}
            onBackToList={handleBackToList}
            onOpenReview={handleOpenReview}
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6">
            <EmptyState
              title="No conversation selected"
              description="Choose a conversation from the list to review the thread."
            />
          </div>
        )
      }
      reviewPanel={
        selectedConversation ? (
          <ReviewConversation
            conversation={selectedConversation}
            selectedMessage={selectedMessage}
            onChangeStatus={handleChangeStatus}
            onAddConversationNote={handleAddConversationNote}
            onAddMessageNote={handleAddMessageNote}
            onBackToConversation={handleBackToConversation}
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6">
            <EmptyState
              title="Review panel is empty"
              description="Select a conversation to update status and add notes."
            />
          </div>
        )
      }
    />
  );
}