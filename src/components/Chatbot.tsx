import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Maximize2,
  Minimize2,
  AlertCircle,
  Plus,
  Trash2,
  PanelLeftClose,
  PanelLeft,
  Loader2,
} from "lucide-react";
import {
  deleteThread,
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

function formatText(text: string) {
  return text.split("\n").map((line, i, arr) => {
    const formatted = line
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/^(\d+)\.\s/, "<strong>$1.</strong> ")
      .replace(/^•\s/, "• ");

    return (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: formatted }} />
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

function truncateTitle(title: string | undefined, max = 42) {
  const value = title?.trim() || "New conversation";
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
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
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const threadIdRef = useRef<string | null>(getChatThreadId());
  const [activeThreadId, setActiveThreadId] = useState<string | null>(getChatThreadId());

  useEffect(() => {
    if (open && !needsEmail) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, needsEmail]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, toolStatus]);

  useEffect(() => {
    if (!open) setExpanded(false);
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

  async function handleDeleteThread(threadId: string) {
    try {
      await deleteThread(threadId);
      setThreads((prev) => prev.filter((thread) => thread.id !== threadId));

      if (threadIdRef.current === threadId) {
        startNewChat();
      }
    } catch {
      setError("Unable to delete this conversation.");
    }
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

  const panelClass = expanded
    ? "fixed inset-4 md:inset-8 lg:inset-12 z-50 bg-paper rounded-3xl shadow-2xl border border-rule/60 flex overflow-hidden"
    : "fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-paper rounded-3xl shadow-2xl border border-rule/60 flex flex-col overflow-hidden";

  const panelStyle = expanded ? {} : { height: "520px" };

  const chatBody = (
    <>
      <div className="flex items-center justify-between px-5 py-4 bg-ink text-paper shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {expanded && (
            <button
              type="button"
              onClick={() => setShowSidebar((value) => !value)}
              className="h-8 w-8 rounded-full hover:bg-paper/10 flex items-center justify-center transition shrink-0"
              aria-label={showSidebar ? "Hide conversations" : "Show conversations"}
            >
              {showSidebar ? (
                <PanelLeftClose className="h-4 w-4" />
              ) : (
                <PanelLeft className="h-4 w-4" />
              )}
            </button>
          )}
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
            onClick={() => setExpanded((value) => !value)}
            className="h-8 w-8 rounded-full hover:bg-paper/10 flex items-center justify-center transition"
            aria-label={expanded ? "Collapse chat" : "Expand chat"}
          >
            {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
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

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-bone/30 min-h-0">
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
              className={`px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${
                expanded ? "max-w-[65%]" : "max-w-[78%]"
              } ${
                msg.from === "bot"
                  ? "bg-paper text-ink rounded-bl-sm border border-rule/40"
                  : "bg-accent-blue text-paper rounded-br-sm"
              }`}
            >
              {msg.text ? (
                formatText(msg.text)
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
        <div className="px-4 py-2 flex gap-2 flex-wrap bg-paper border-t border-rule/40 shrink-0">
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
        className="flex items-center gap-2 px-4 py-3 border-t border-rule/40 bg-paper shrink-0"
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
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="h-14 w-14 rounded-full bg-accent-blue text-white shadow-lg hover:bg-accent-blue/90 transition flex items-center justify-center"
              aria-label="Open chat assistant"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent-orange animate-pulse pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && expanded && (
          <motion.div
            key="chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm"
            onClick={() => setExpanded(false)}
          />
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
            layout
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className={panelClass}
            style={panelStyle}
          >
            {expanded && showSidebar && (
              <aside className="hidden md:flex w-[240px] shrink-0 flex-col border-r border-rule/60 bg-paper">
                <div className="px-4 py-4 border-b border-rule/60">
                  <button
                    type="button"
                    onClick={startNewChat}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-rule/60 px-3 py-2 text-[12px] text-ink hover:bg-bone transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    New chat
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-3">
                  {threadsLoading ? (
                    <div className="flex items-center justify-center py-8 text-muted-ink">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : threads.length === 0 ? (
                    <p className="px-2 text-[12px] text-muted-ink">No conversations yet</p>
                  ) : (
                    <div className="space-y-1">
                      {threads.map((thread) => {
                        const active = thread.id === activeThreadId;
                        return (
                          <div key={thread.id} className="group relative">
                            <button
                              type="button"
                              onClick={() => void selectThread(thread.id)}
                              className={`w-full rounded-xl px-3 py-2.5 text-left text-[12px] transition ${
                                active
                                  ? "bg-accent-blue/10 text-ink"
                                  : "text-muted-ink hover:bg-bone hover:text-ink"
                              }`}
                            >
                              <span className="block truncate">{truncateTitle(thread.title)}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleDeleteThread(thread.id)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-ink opacity-0 transition hover:bg-paper hover:text-accent-orange group-hover:opacity-100"
                              aria-label="Delete conversation"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </aside>
            )}

            <div className="flex min-w-0 flex-1 flex-col">{chatBody}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
