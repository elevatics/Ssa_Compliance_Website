import { useState, useRef, useEffect, useCallback, type ComponentProps } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  AlertCircle,
  Plus,
  Loader2,
} from "lucide-react";
import {
  getThreadMessages,
  listThreads,
  streamChat,
  type ChatStreamEvent,
  type Thread,
} from "@/lib/chatApi";
import {
  clearChatThread,
  getChatThreadId,
  getChatUserEmail,
  isValidEmail,
  setChatThreadId,
  setChatUserEmail,
} from "@/lib/chatUser";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
  streaming?: boolean;
};

const QUICK_REPLIES = [
  "What services do you offer?",
  "How does POSH compliance work?",
  "Labour law audit process?",
  "Book a consultation",
];

const WELCOME_MESSAGE =
  "Hello! 👋 I'm the SSA Compliance assistant. How can I help you today?\n\nYou can ask me about our services, compliance audits, POSH, or how to get started.";

function createMessageId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function welcomeMessages(): Message[] {
  return [{ id: "welcome", from: "bot", text: WELCOME_MESSAGE }];
}

type MarkdownPartProps = ComponentProps<"div">;

const chatMarkdownComponents = {
  h1: ({ children }: MarkdownPartProps) => (
    <h1 className="mt-3 mb-1.5 text-[14px] font-medium first:mt-0">{children}</h1>
  ),
  h2: ({ children }: MarkdownPartProps) => (
    <h2 className="mt-3 mb-1.5 text-[14px] font-medium first:mt-0">{children}</h2>
  ),
  h3: ({ children }: MarkdownPartProps) => (
    <h3 className="mt-3 mb-1 text-[13px] font-medium first:mt-0">{children}</h3>
  ),
  h4: ({ children }: MarkdownPartProps) => (
    <h4 className="mt-2 mb-1 text-[13px] font-medium first:mt-0">{children}</h4>
  ),
  p: ({ children }: MarkdownPartProps) => (
    <p className="mb-2 last:mb-0 [li_&]:mb-0">{children}</p>
  ),
  ul: ({ children }: MarkdownPartProps) => (
    <ul className="mb-2 list-disc space-y-0.5 pl-4 last:mb-0">{children}</ul>
  ),
  ol: ({ children }: MarkdownPartProps) => (
    <ol className="mb-2 list-decimal space-y-0.5 pl-4 last:mb-0">{children}</ol>
  ),
  li: ({ children }: MarkdownPartProps) => <li className="leading-relaxed">{children}</li>,
  hr: () => <hr className="my-2.5 border-0 border-t border-rule/50" />,
  strong: ({ children }: MarkdownPartProps) => (
    <strong className="font-medium">{children}</strong>
  ),
  em: ({ children }: MarkdownPartProps) => <em>{children}</em>,
  a: ({ href, children }: MarkdownPartProps & { href?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 hover:opacity-80"
    >
      {children}
    </a>
  ),
  table: ({ children }: MarkdownPartProps) => (
    <div className="my-2 -mx-1 overflow-x-auto">
      <table className="w-full min-w-[12rem] border-collapse text-[12px]">{children}</table>
    </div>
  ),
  thead: ({ children }: MarkdownPartProps) => <thead>{children}</thead>,
  tbody: ({ children }: MarkdownPartProps) => <tbody>{children}</tbody>,
  tr: ({ children }: MarkdownPartProps) => (
    <tr className="border-b border-rule/40">{children}</tr>
  ),
  th: ({ children }: MarkdownPartProps) => (
    <th className="px-2 py-1 text-left font-medium">{children}</th>
  ),
  td: ({ children }: MarkdownPartProps) => <td className="px-2 py-1">{children}</td>,
  blockquote: ({ children }: MarkdownPartProps) => (
    <blockquote className="my-2 border-l-2 border-rule/60 pl-3 text-muted-ink">{children}</blockquote>
  ),
  code: ({ children, className }: MarkdownPartProps & { className?: string }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <pre className="my-2 overflow-x-auto rounded-lg bg-bone px-3 py-2 text-[12px]">
          <code className={className}>{children}</code>
        </pre>
      );
    }
    return (
      <code className="rounded bg-bone/80 px-1 py-0.5 text-[12px] font-mono">{children}</code>
    );
  },
};

function ChatMarkdown({ text, variant }: { text: string; variant: "bot" | "user" }) {
  return (
    <div
      className={`chat-markdown min-w-0 break-words [&_*:first-child]:mt-0 [&_*:last-child]:mb-0 ${
        variant === "user" ? "text-paper" : "text-ink"
      }`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={chatMarkdownComponents}>
        {text}
      </ReactMarkdown>
    </div>
  );
}

function truncateTitle(title: string | undefined, max = 42) {
  const value = title?.trim() || "New conversation";
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(() => getChatUserEmail() ?? "");
  const [emailDraft, setEmailDraft] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [needsEmail, setNeedsEmail] = useState(() => !getChatUserEmail());
  const [messages, setMessages] = useState<Message[]>(welcomeMessages);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [threadsLoading, setThreadsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [toolStatus, setToolStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const threadIdRef = useRef<string | null>(getChatThreadId());
  const [activeThreadId, setActiveThreadId] = useState<string | null>(getChatThreadId());

  useEffect(() => {
    if (open && !needsEmail) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, needsEmail]);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const container = messagesRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior });
  }, []);

  const handleMessagesScroll = useCallback(() => {
    const container = messagesRef.current;
    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    shouldAutoScrollRef.current = distanceFromBottom < 80;
  }, []);

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      scrollToBottom(messages.some((message) => message.streaming) ? "auto" : "smooth");
    }
  }, [messages, typing, toolStatus, scrollToBottom]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const refreshThreads = useCallback(async () => {
    if (needsEmail) return;

    setThreadsLoading(true);
    try {
      const nextThreads = await listThreads(30);
      setThreads(nextThreads);
    } catch {
      // Sidebar can stay empty if threads fail to load.
    } finally {
      setThreadsLoading(false);
    }
  }, [needsEmail]);

  const loadThreadMessages = useCallback(async (threadId: string) => {
    try {
      const apiMessages = await getThreadMessages(threadId);
      if (apiMessages.length === 0) {
        setMessages(welcomeMessages());
      } else {
        setMessages(
          apiMessages.map((message) => ({
            id: message.id,
            from: message.role === "assistant" ? "bot" : "user",
            text: message.content,
          })),
        );
      }

      threadIdRef.current = threadId;
      setActiveThreadId(threadId);
      setChatThreadId(threadId);
      setError(null);
    } catch {
      setError("Unable to load this conversation.");
    }
  }, []);

  useEffect(() => {
    if (open && !needsEmail) {
      void refreshThreads();
      const storedThreadId = threadIdRef.current ?? getChatThreadId();
      if (storedThreadId) {
        void loadThreadMessages(storedThreadId);
      }
    }
  }, [open, needsEmail, refreshThreads, loadThreadMessages]);

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = emailDraft.trim();

    if (!isValidEmail(trimmed)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setChatUserEmail(trimmed);
    setEmail(trimmed);
    setEmailError(null);
    setNeedsEmail(false);
  }

  function startNewChat() {
    abortRef.current?.abort();
    threadIdRef.current = null;
    setActiveThreadId(null);
    clearChatThread();
    setMessages(welcomeMessages());
    setError(null);
    setInput("");
    setTyping(false);
    setToolStatus(null);
  }

  async function selectThread(threadId: string) {
    if (threadId === threadIdRef.current) return;

    abortRef.current?.abort();
    setTyping(false);
    setToolStatus(null);
    await loadThreadMessages(threadId);
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing || needsEmail) return;

    setError(null);
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const userMsg: Message = { id: createMessageId(), from: "user", text: trimmed };
    const botMsgId = createMessageId();
    const botMsg: Message = { id: botMsgId, from: "bot", text: "", streaming: true };

    shouldAutoScrollRef.current = true;
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    setTyping(true);
    setToolStatus(null);

    let streamedText = "";

    const applyEvent = (event: ChatStreamEvent) => {
      if (event.type === "chunk") {
        streamedText += event.content;
        setMessages((prev) =>
          prev.map((message) =>
            message.id === botMsgId ? { ...message, text: streamedText, streaming: true } : message,
          ),
        );
        return;
      }

      if (event.type === "tool_start") {
        setToolStatus(`Looking up ${event.name.replace(/_/g, " ")}…`);
        return;
      }

      if (event.type === "tool_end") {
        setToolStatus(null);
        return;
      }

      if (event.type === "full_response") {
        streamedText = event.content;
        setMessages((prev) =>
          prev.map((message) =>
            message.id === botMsgId
              ? { ...message, text: event.content, streaming: false }
              : message,
          ),
        );
        return;
      }

      if (event.type === "error") {
        throw new Error(event.content);
      }
    };

    try {
      const { threadId } = await streamChat({
        query: trimmed,
        thread_id: threadIdRef.current,
        signal: abortRef.current.signal,
        onEvent: applyEvent,
      });

      if (!streamedText) {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === botMsgId
              ? {
                  ...message,
                  text: "I couldn't generate a response. Please try again.",
                  streaming: false,
                }
              : message,
          ),
        );
      } else {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === botMsgId ? { ...message, streaming: false } : message,
          ),
        );
      }

      if (threadId) {
        threadIdRef.current = threadId;
        setActiveThreadId(threadId);
        setChatThreadId(threadId);
      }

      void refreshThreads();
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;

      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again in a moment.";

      setError(message);
      setMessages((prev) => {
        const withoutEmptyBot = prev.filter(
          (item) => !(item.id === botMsgId && !item.text.trim()),
        );
        return withoutEmptyBot.map((item) =>
          item.id === botMsgId
            ? {
                ...item,
                text: "Sorry, I couldn't reach the assistant right now. Please try again shortly.",
                streaming: false,
              }
            : item,
        );
      });
    } finally {
      setTyping(false);
      setToolStatus(null);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void sendMessage(input);
  }

  const showQuickReplies =
    messages.length <= 1 && !typing && messages[0]?.id === "welcome";

  const panelClass =
    "fixed z-50 bg-paper shadow-2xl border border-rule/60 flex flex-col overflow-hidden max-h-[100dvh] inset-x-3 bottom-3 top-auto h-[min(520px,calc(100dvh-1.5rem-env(safe-area-inset-bottom)))] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:top-auto sm:w-[360px] sm:max-w-[calc(100vw-2rem)] sm:h-[min(520px,calc(100dvh-5rem))] rounded-2xl sm:rounded-3xl";

  const chatBody = (
    <>
      <div className="flex items-center justify-between px-3 py-3 sm:px-5 sm:py-4 bg-ink text-paper shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-full bg-accent-blue/20 flex items-center justify-center shrink-0">
            <Bot className="h-4 w-4 text-paper" />
          </div>
          <div className="min-w-0">
            <div className="text-[14px] font-normal">SSA Assistant</div>
            <div className="text-[11px] text-paper/50 truncate">
              {typing ? "Typing…" : email ? `${email} · Online` : "Compliance Services · Online"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={startNewChat}
            className="h-8 w-8 rounded-full hover:bg-paper/10 flex items-center justify-center transition"
            aria-label="Start new chat"
            title="New chat"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              abortRef.current?.abort();
              setOpen(false);
            }}
            className="h-8 w-8 rounded-full hover:bg-paper/10 flex items-center justify-center transition"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={messagesRef}
        onScroll={handleMessagesScroll}
        className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 space-y-3 bg-bone/30 min-h-0 touch-pan-y [-webkit-overflow-scrolling:touch]"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                msg.from === "bot" ? "bg-ink text-paper" : "bg-accent-blue text-paper"
              }`}
            >
              {msg.from === "bot" ? (
                <Bot className="h-3.5 w-3.5" />
              ) : (
                <User className="h-3.5 w-3.5" />
              )}
            </div>
            <div
              className={`px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-[13px] leading-relaxed max-w-[88%] sm:max-w-[78%] min-w-0 ${
                msg.from === "bot"
                  ? "bg-paper text-ink rounded-bl-sm border border-rule/40"
                  : "bg-accent-blue text-paper rounded-br-sm"
              }`}
            >
              {msg.text ? (
                <ChatMarkdown
                  text={msg.text}
                  variant={msg.from === "bot" ? "bot" : "user"}
                />
              ) : (
                <span className="text-muted-ink italic">…</span>
              )}
              {msg.streaming && msg.text && (
                <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-accent-blue/70 animate-pulse align-middle" />
              )}
            </div>
          </div>
        ))}

        {typing && !messages.some((message) => message.streaming && message.text) && (
          <div className="flex items-end gap-2">
            <div className="h-7 w-7 rounded-full bg-ink text-paper flex items-center justify-center shrink-0">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="bg-paper border border-rule/40 px-4 py-3 rounded-2xl rounded-bl-sm">
              {toolStatus ? (
                <p className="text-[12px] text-muted-ink">{toolStatus}</p>
              ) : (
                <div className="flex gap-1">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-muted-ink animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-muted-ink animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-muted-ink animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-accent-orange/30 bg-accent-orange/10 px-3 py-2 text-[12px] text-ink">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-accent-orange" />
            <span>{error}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {showQuickReplies && (
        <div className="px-3 py-2 sm:px-4 flex gap-1.5 sm:gap-2 flex-wrap bg-paper border-t border-rule/40 shrink-0 max-h-24 overflow-y-auto overscroll-contain">
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => void sendMessage(reply)}
              className="text-[11px] px-3 py-1.5 rounded-full border border-accent-blue/40 text-accent-blue hover:bg-accent-blue hover:text-paper transition"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 border-t border-rule/40 bg-paper shrink-0"
        style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about our services…"
          disabled={typing || needsEmail}
          className="flex-1 bg-bone rounded-full px-4 py-2.5 text-[13px] text-ink placeholder:text-muted-ink/60 outline-none focus:ring-2 focus:ring-accent-blue/30 transition disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!input.trim() || typing || needsEmail}
          className="h-9 w-9 rounded-full bg-ink text-paper flex items-center justify-center hover:bg-accent-blue transition disabled:opacity-40 shrink-0"
          aria-label="Send message"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </>
  );

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="h-14 w-14 rounded-full bg-accent-blue text-white shadow-lg hover:bg-accent-blue/90 transition flex items-center justify-center touch-manipulation"
              aria-label="Open chat assistant"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent-orange animate-pulse pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && needsEmail && (
          <motion.div
            key="email-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="w-full max-w-md rounded-3xl border border-rule/60 bg-paper p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-accent-blue/10 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-accent-blue" />
                </div>
                <div>
                  <h2 className="text-[16px] font-normal text-ink">Enter your email</h2>
                  <p className="text-[12px] text-muted-ink">
                    We use your email to save and continue your conversations.
                  </p>
                </div>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  value={emailDraft}
                  onChange={(e) => {
                    setEmailDraft(e.target.value);
                    setEmailError(null);
                  }}
                  placeholder="you@company.com"
                  autoFocus
                  className="w-full rounded-2xl border border-rule/60 bg-bone px-4 py-3 text-[13px] text-ink outline-none focus:ring-2 focus:ring-accent-blue/30"
                />
                {emailError && (
                  <p className="text-[12px] text-accent-orange">{emailError}</p>
                )}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-full px-4 py-2 text-[13px] text-muted-ink hover:text-ink transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-ink px-5 py-2 text-[13px] text-paper hover:bg-accent-blue transition"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && !needsEmail && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className={panelClass}
          >
            <div className="flex min-h-0 min-w-0 flex-1 flex-col h-full">{chatBody}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
