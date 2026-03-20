export type ReviewStatus = "pending" | "approved" | "needs_fix";

export type MessageRole = "customer" | "assistant";

export type Message = {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: string;
};

export type ConversationNote = {
  id: string;
  text: string;
  createdAt: string;
};

export type MessageNote = {
  id: string;
  messageId: string;
  text: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  title: string;
  category: string;
  updatedAt: string;
  status: ReviewStatus;
  customerCity: string;
  messages: Message[];
  messageNotes: MessageNote[];
  notes: ConversationNote[];
};



