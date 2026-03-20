import type { Conversation } from "../types/conversation";

export const mockConversations: Conversation[] = [
  {
    id: "conv-001",
    title: "Refund request after duplicate payment",
    category: "Billing",
    updatedAt: "2026-03-20T08:45:00Z",
    status: "pending",
    customerCity: "Krakow",
    messages: [
      {
        id: "msg-001-1",
        role: "customer",
        text: "Hi, I was charged twice for the same subscription renewal. Can you help me get one of the payments refunded?",
        timestamp: "2026-03-20T08:31:00Z",
      },
      {
        id: "msg-001-2",
        role: "assistant",
        text: "I’m sorry about that. Please share the last four digits of the card and the transaction date so I can check the payment records.",
        timestamp: "2026-03-20T08:32:00Z",
      },
      {
        id: "msg-001-3",
        role: "customer",
        text: "Sure, the last four digits are 4821 and the payment happened this morning.",
        timestamp: "2026-03-20T08:34:00Z",
      },
      {
        id: "msg-001-4",
        role: "assistant",
        text: "Thanks. I found two successful charges. I can help you submit a refund request for the duplicate payment.",
        timestamp: "2026-03-20T08:36:00Z",
      },
      {
        id: "msg-001-5",
        role: "customer",
        text: "How long does the refund usually take?",
        timestamp: "2026-03-20T08:38:00Z",
      },
      {
        id: "msg-001-6",
        role: "assistant",
        text: "Refunds usually take 5 to 10 business days depending on your bank. You will receive a confirmation email once the request is processed.",
        timestamp: "2026-03-20T08:40:00Z",
      },
    ],
    messageNotes: [
      {
        id: "mnote-001-1",
        messageId: "msg-001-6",
        text: "Good answer, but could mention exact next step more explicitly.",
        createdAt: "2026-03-20T08:43:00Z",
      },
    ],
    notes: [
      {
        id: "note-001-1",
        text: "Conversation is clear and polite. Needs review for stronger operational guidance.",
        createdAt: "2026-03-20T08:44:00Z",
      },
    ],
  },

  {
    id: "conv-002",
    title: "Password reset link not working",
    category: "Technical Support",
    updatedAt: "2026-03-20T09:12:00Z",
    status: "approved",
    customerCity: "Warsaw",
    messages: [
      {
        id: "msg-002-1",
        role: "customer",
        text: "I tried to reset my password but the reset link says it has expired immediately.",
        timestamp: "2026-03-20T08:55:00Z",
      },
      {
        id: "msg-002-2",
        role: "assistant",
        text: "That can happen if multiple reset emails were requested. Please use only the most recent email and open the link in the same browser.",
        timestamp: "2026-03-20T08:56:00Z",
      },
      {
        id: "msg-002-3",
        role: "customer",
        text: "I did that and it still failed.",
        timestamp: "2026-03-20T08:58:00Z",
      },
      {
        id: "msg-002-4",
        role: "assistant",
        text: "Please clear your browser cache or try an incognito window. If the issue continues, I can recommend requesting a fresh reset link and waiting two minutes before opening it.",
        timestamp: "2026-03-20T09:00:00Z",
      },
      {
        id: "msg-002-5",
        role: "customer",
        text: "The incognito window worked. Thanks.",
        timestamp: "2026-03-20T09:04:00Z",
      },
      {
        id: "msg-002-6",
        role: "assistant",
        text: "Glad it worked. If you want, I can also share quick tips to avoid this issue in the future.",
        timestamp: "2026-03-20T09:05:00Z",
      },
    ],
    messageNotes: [],
    notes: [
      {
        id: "note-002-1",
        text: "Approved. Helpful, concise, and resolved the issue without unnecessary back-and-forth.",
        createdAt: "2026-03-20T09:10:00Z",
      },
    ],
  },

  {
    id: "conv-003",
    title: "Order delay and customer frustration",
    category: "Delivery",
    updatedAt: "2026-03-20T10:18:00Z",
    status: "needs_fix",
    customerCity: "Berlin",
    messages: [
      {
        id: "msg-003-1",
        role: "customer",
        text: "My package was supposed to arrive yesterday and there is still no update. This is really frustrating.",
        timestamp: "2026-03-20T09:41:00Z",
      },
      {
        id: "msg-003-2",
        role: "assistant",
        text: "Delays can happen sometimes. Please wait a bit longer and check the tracking page later.",
        timestamp: "2026-03-20T09:42:00Z",
      },
      {
        id: "msg-003-3",
        role: "customer",
        text: "That does not help. I already checked the tracking page three times.",
        timestamp: "2026-03-20T09:45:00Z",
      },
      {
        id: "msg-003-4",
        role: "assistant",
        text: "Then you should contact the courier directly.",
        timestamp: "2026-03-20T09:46:00Z",
      },
      {
        id: "msg-003-5",
        role: "customer",
        text: "I expected support from your side, not to be redirected elsewhere.",
        timestamp: "2026-03-20T09:49:00Z",
      },
      {
        id: "msg-003-6",
        role: "assistant",
        text: "Our system only shows the same tracking information that you can already see.",
        timestamp: "2026-03-20T09:50:00Z",
      },
      {
        id: "msg-003-7",
        role: "customer",
        text: "So basically you are telling me you cannot do anything?",
        timestamp: "2026-03-20T09:52:00Z",
      },
      {
        id: "msg-003-8",
        role: "assistant",
        text: "At the moment, there is no additional update available from our side.",
        timestamp: "2026-03-20T09:53:00Z",
      },
      {
        id: "msg-003-9",
        role: "customer",
        text: "This order contains a birthday gift. I needed it yesterday, not sometime next week.",
        timestamp: "2026-03-20T09:55:00Z",
      },
      {
        id: "msg-003-10",
        role: "assistant",
        text: "I understand, but shipping times are estimates and can occasionally change.",
        timestamp: "2026-03-20T09:56:00Z",
      },
      {
        id: "msg-003-11",
        role: "customer",
        text: "You keep repeating general information instead of helping me solve the problem.",
        timestamp: "2026-03-20T09:58:00Z",
      },
      {
        id: "msg-003-12",
        role: "assistant",
        text: "You may continue monitoring the tracking page for further movement.",
        timestamp: "2026-03-20T09:59:00Z",
      },
      {
        id: "msg-003-13",
        role: "customer",
        text: "This is honestly the worst support experience I have had in a while.",
        timestamp: "2026-03-20T10:01:00Z",
      },
      {
        id: "msg-003-14",
        role: "assistant",
        text: "I’m sorry you feel that way.",
        timestamp: "2026-03-20T10:02:00Z",
      },
      {
        id: "msg-003-15",
        role: "customer",
        text: "It is not about how I feel. I need a clear next step, a refund, or an escalation.",
        timestamp: "2026-03-20T10:04:00Z",
      },
      {
        id: "msg-003-16",
        role: "assistant",
        text: "I can submit a delivery issue report, but response times may take 2 to 3 business days.",
        timestamp: "2026-03-20T10:06:00Z",
      },
      {
        id: "msg-003-17",
        role: "customer",
        text: "Why was that not offered from the beginning?",
        timestamp: "2026-03-20T10:08:00Z",
      },
      {
        id: "msg-003-18",
        role: "assistant",
        text: "If you want, I can also share the courier contact page again.",
        timestamp: "2026-03-20T10:09:00Z",
      },
      {
        id: "msg-003-19",
        role: "customer",
        text: "No, I want you to take ownership and actually open the case.",
        timestamp: "2026-03-20T10:12:00Z",
      },
      {
        id: "msg-003-20",
        role: "assistant",
        text: "Understood. I will open a delivery investigation case and mark it as urgent due to the missed delivery date.",
        timestamp: "2026-03-20T10:14:00Z",
      },
    ],
    messageNotes: [
      {
        id: "mnote-003-1",
        messageId: "msg-003-2",
        text: "Weak empathy. Should acknowledge inconvenience more directly.",
        createdAt: "2026-03-20T09:55:00Z",
      },
      {
        id: "mnote-003-2",
        messageId: "msg-003-4",
        text: "Poor ownership. Assistant should offer next steps instead of pushing customer away.",
        createdAt: "2026-03-20T09:57:00Z",
      },
      {
        id: "mnote-003-3",
        messageId: "msg-003-6",
        text: "Overly defensive wording. Focuses on system limitations instead of customer support.",
        createdAt: "2026-03-20T10:00:00Z",
      },
      {
        id: "mnote-003-4",
        messageId: "msg-003-10",
        text: "Technically correct but emotionally tone-deaf. Misses urgency around the birthday gift.",
        createdAt: "2026-03-20T10:01:30Z",
      },
      {
        id: "mnote-003-5",
        messageId: "msg-003-12",
        text: "Repetitive and unhelpful. Repeats prior advice without adding value.",
        createdAt: "2026-03-20T10:03:00Z",
      },
      {
        id: "mnote-003-6",
        messageId: "msg-003-14",
        text: "Generic apology. Should acknowledge the concrete failure, not just the customer's feelings.",
        createdAt: "2026-03-20T10:04:30Z",
      },
      {
        id: "mnote-003-7",
        messageId: "msg-003-16",
        text: "Better because it introduces an actionable step, but it comes too late in the conversation.",
        createdAt: "2026-03-20T10:07:00Z",
      },
      {
        id: "mnote-003-8",
        messageId: "msg-003-18",
        text: "Regression in quality. Reintroduces deflection after the customer explicitly asked for escalation.",
        createdAt: "2026-03-20T10:10:00Z",
      },
      {
        id: "mnote-003-9",
        messageId: "msg-003-20",
        text: "Finally shows ownership and a concrete action, but trust has already been damaged.",
        createdAt: "2026-03-20T10:15:00Z",
      },
    ],
    notes: [
      {
        id: "note-003-1",
        text: "Needs fix. Tone is dismissive and resolution path is incomplete.",
        createdAt: "2026-03-20T10:01:00Z",
      },
      {
        id: "note-003-2",
        text: "Conversation shows a classic support failure pattern: low empathy, repeated generic responses, and delayed escalation.",
        createdAt: "2026-03-20T10:11:00Z",
      },
      {
        id: "note-003-3",
        text: "Recovery attempt appears only near the end. A stronger assistant would acknowledge the issue, explain the next step, and take ownership by message 2 or 4.",
        createdAt: "2026-03-20T10:16:00Z",
      },
    ],
  },

  {
    id: "conv-004",
    title: "Changing subscription from monthly to annual",
    category: "Account Management",
    updatedAt: "2026-03-20T10:28:00Z",
    status: "approved",
    customerCity: "Prague",
    messages: [
      {
        id: "msg-004-1",
        role: "customer",
        text: "Can I switch from the monthly plan to the annual one without losing my current settings?",
        timestamp: "2026-03-20T10:11:00Z",
      },
      {
        id: "msg-004-2",
        role: "assistant",
        text: "Yes. Switching plans does not affect your saved settings, projects, or account history.",
        timestamp: "2026-03-20T10:12:00Z",
      },
      {
        id: "msg-004-3",
        role: "customer",
        text: "Will I be charged immediately or only after my current billing cycle ends?",
        timestamp: "2026-03-20T10:15:00Z",
      },
      {
        id: "msg-004-4",
        role: "assistant",
        text: "You would typically be charged the difference on a prorated basis when changing the plan. The exact amount is shown before confirmation.",
        timestamp: "2026-03-20T10:17:00Z",
      },
      {
        id: "msg-004-5",
        role: "customer",
        text: "Okay, where do I change it?",
        timestamp: "2026-03-20T10:20:00Z",
      },
      {
        id: "msg-004-6",
        role: "assistant",
        text: "Go to Settings, then Billing, then select Change Plan. Choose Annual and review the pricing summary before confirming.",
        timestamp: "2026-03-20T10:22:00Z",
      },
    ],
    messageNotes: [],
    notes: [
      {
        id: "note-004-1",
        text: "Approved. Strong structure: confirms impact, explains billing, provides navigation path.",
        createdAt: "2026-03-20T10:26:00Z",
      },
    ],
  },

  {
    id: "conv-005",
    title: "Unclear AI answer in travel recommendation",
    category: "Quality Review",
    updatedAt: "2026-03-20T11:07:00Z",
    status: "pending",
    customerCity: "Lisbon",
    messages: [
      {
        id: "msg-005-1",
        role: "customer",
        text: "I’m visiting your city for two days. What local places should I see if I want something authentic and not too touristy?",
        timestamp: "2026-03-20T10:51:00Z",
      },
      {
        id: "msg-005-2",
        role: "assistant",
        text: "You can visit the main square, the central shopping street, and the museum district. These are popular and easy to reach.",
        timestamp: "2026-03-20T10:52:00Z",
      },
      {
        id: "msg-005-3",
        role: "customer",
        text: "That sounds very generic. I asked for something more authentic.",
        timestamp: "2026-03-20T10:55:00Z",
      },
      {
        id: "msg-005-4",
        role: "assistant",
        text: "You may also try local cafes or markets depending on your preferences.",
        timestamp: "2026-03-20T10:57:00Z",
      },
      {
        id: "msg-005-5",
        role: "customer",
        text: "Can you give me specific ideas?",
        timestamp: "2026-03-20T10:59:00Z",
      },
    ],
    messageNotes: [
      {
        id: "mnote-005-1",
        messageId: "msg-005-2",
        text: "Missed user intent. Answer is generic and does not adapt to request for authentic places.",
        createdAt: "2026-03-20T11:03:00Z",
      },
    ],
    notes: [
      {
        id: "note-005-1",
        text: "Pending review. Probably should move to needs_fix after final evaluation.",
        createdAt: "2026-03-20T11:05:00Z",
      },
    ],
  },

  {
    id: "conv-006",
    title: "Invoice needed for business purchase",
    category: "Billing",
    updatedAt: "2026-03-20T11:36:00Z",
    status: "approved",
    customerCity: "Vienna",
    messages: [
      {
        id: "msg-006-1",
        role: "customer",
        text: "I purchased a team plan for my company. How can I download an invoice with the business details on it?",
        timestamp: "2026-03-20T11:18:00Z",
      },
      {
        id: "msg-006-2",
        role: "assistant",
        text: "You can download invoices from the Billing section of your account. Open Invoices and select the relevant payment record.",
        timestamp: "2026-03-20T11:19:00Z",
      },
      {
        id: "msg-006-3",
        role: "customer",
        text: "I do not see the VAT number on the current invoice.",
        timestamp: "2026-03-20T11:23:00Z",
      },
      {
        id: "msg-006-4",
        role: "assistant",
        text: "In that case, please update your billing profile with the company name, address, and VAT number first. Future invoices will reflect that information.",
        timestamp: "2026-03-20T11:25:00Z",
      },
      {
        id: "msg-006-5",
        role: "customer",
        text: "Can the previous invoice be corrected as well?",
        timestamp: "2026-03-20T11:28:00Z",
      },
      {
        id: "msg-006-6",
        role: "assistant",
        text: "Yes, if invoice corrections are supported for your account type, you can contact billing support and request a corrected invoice. Include the purchase date and company details in the request.",
        timestamp: "2026-03-20T11:31:00Z",
      },
    ],
    messageNotes: [
      {
        id: "mnote-006-1",
        messageId: "msg-006-6",
        text: "Good escalation guidance and clear required information.",
        createdAt: "2026-03-20T11:33:00Z",
      },
    ],
    notes: [
      {
        id: "note-006-1",
        text: "Approved. Clear, structured, and useful for both self-service and support escalation.",
        createdAt: "2026-03-20T11:34:00Z",
      },
    ],
  },
];
