import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Maximize2, Minimize2 } from "lucide-react";

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
};

const QUICK_REPLIES = [
  "What services do you offer?",
  "How does POSH compliance work?",
  "Labour law audit process?",
  "Book a consultation",
];

function getBotResponse(input: string): string {
  const q = input.toLowerCase();

  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("good")) {
    return "Hello! I'm the SSA Compliance assistant. How can I help you today? You can ask about our services, audits, POSH compliance, or book a consultation.";
  }
  if (q.includes("service") || q.includes("offer") || q.includes("provide") || q.includes("what do")) {
    return "We offer four core practices:\n\n1. **Advisory** — Strategic counsel, legal opinions & risk-zone guidance\n2. **Labour Law & HR Audits** — Pan-India compliance audits across your operations & contractors\n3. **Records & Compliances** — Statutory registers, EPF/ESI/PT filings, licences & renewals\n4. **POSH** — Policy, training, investigations & IC capability building\n\nWould you like to know more about any specific service?";
  }
  if (q.includes("posh") || q.includes("sexual harassment") || q.includes("internal committee") || q.includes("ic ")) {
    return "Our POSH services cover the full compliance lifecycle:\n\n• Policy drafting & rollout\n• Confidential external investigations\n• Mandatory India-specific training (quarterly & annual)\n• Internal Committee (IC) capability building\n• Annual report filing & regulator liaison\n\nOur certified specialists handle sensitive cases with complete confidentiality.";
  }
  if (q.includes("audit") || q.includes("labour law") || q.includes("hr audit")) {
    return "Our Labour Law & HR Audits include:\n\n• Centralised pan-India compliance audits\n• Contractor & vendor compliance audits\n• M&A due diligence on labour exposure\n• Risk assessment & mitigation roadmap\n• Periodic re-audits and assurance reviews\n\nWe cover all states and the extended contractor ecosystem with a clear, costed mitigation roadmap.";
  }
  if (q.includes("advisory") || q.includes("opinion") || q.includes("legal") || q.includes("counsel")) {
    return "Our Advisory practice provides strategic counsel for Boards and HR leadership:\n\n• Contract & employment agreement review\n• Statutory interpretation & legal opinions\n• Apex Court judgment briefings\n• Risk-zone opinions for senior leadership\n• HR policy drafting & harmonisation\n\nWe translate complex law into commercial decisions you can act on.";
  }
  if (q.includes("record") || q.includes("register") || q.includes("epf") || q.includes("esi") || q.includes("filing") || q.includes("pf") || q.includes("statutory")) {
    return "Our Records & Compliances service handles end-to-end statutory implementation:\n\n• 50+ statutory register formats\n• EPF, ESI, PT, LWF & Gratuity administration\n• CL(RA) licences, registrations & renewals\n• Periodic returns, filings and renewals\n• Multi-language statutory displays & abstracts\n\nEvery register, every filing, every renewal — executed on time across all jurisdictions.";
  }
  if (q.includes("book") || q.includes("consult") || q.includes("appointment") || q.includes("meeting") || q.includes("schedule") || q.includes("talk")) {
    return "To book a consultation with our team, click the **\"Book a Consultation\"** button in the top navigation bar, or visit our Services page.\n\nYou can also reach us through the contact section on our homepage. Our team typically responds within 24 hours.";
  }
  if (q.includes("price") || q.includes("cost") || q.includes("fee") || q.includes("charge") || q.includes("how much")) {
    return "Our pricing is tailored to your organisation's size, industry, and compliance needs. We offer both project-based and retainer engagements.\n\nPlease book a consultation so we can understand your specific requirements and provide an accurate proposal.";
  }
  if (q.includes("india") || q.includes("location") || q.includes("where") || q.includes("state") || q.includes("city")) {
    return "SSA Compliance Services LLP operates pan-India, covering all states and union territories. We also serve clients across Southeast Asia and the Middle East.\n\nOur centralised audit model means consistent standards across every location, regardless of local complexity.";
  }
  if (q.includes("about") || q.includes("who are") || q.includes("ssa") || q.includes("company") || q.includes("firm")) {
    return "SSA Compliance Services LLP is a specialised labour law compliance firm. We work with enterprises across India, Southeast Asia and the Middle East.\n\nOur team combines deep statutory expertise with commercial pragmatism — translating compliance obligations into decisions your leadership can act on.";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach")) {
    return "You can reach us through:\n\n• The **Contact** section on our homepage\n• Booking a consultation via the header button\n\nOur team is responsive and typically gets back within 24 business hours.";
  }
  if (q.includes("thank")) {
    return "You're welcome! If you have any other questions about our compliance services, feel free to ask. We're here to help.";
  }
  return "I can help you with information about SSA Compliance services including advisory, audits, POSH compliance, and statutory records management.\n\nCould you clarify your question? Or feel free to ask about:\n• Our services\n• POSH compliance\n• Labour law audits\n• Booking a consultation";
}

let msgIdCounter = 100;

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "bot",
      text: "Hello! 👋 I'm the SSA Compliance assistant. How can I help you today?\n\nYou can ask me about our services, compliance audits, POSH, or how to get started.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // close expanded when chat closes
  useEffect(() => {
    if (!open) setExpanded(false);
  }, [open]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: ++msgIdCounter, from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const delay = 700 + Math.random() * 500;
    setTimeout(() => {
      const botMsg: Message = {
        id: ++msgIdCounter,
        from: "bot",
        text: getBotResponse(trimmed),
      };
      setTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function formatText(text: string) {
    return text.split("\n").map((line, i, arr) => {
      const formatted = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: formatted }} />
          {i < arr.length - 1 && <br />}
        </span>
      );
    });
  }

  // Panel dimensions based on expanded state
  const panelClass = expanded
    ? "fixed inset-4 md:inset-8 lg:inset-12 z-50 bg-paper rounded-3xl shadow-2xl border border-rule/60 flex flex-col overflow-hidden"
    : "fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-paper rounded-3xl shadow-2xl border border-rule/60 flex flex-col overflow-hidden";

  const panelStyle = expanded ? {} : { height: "520px" };

  return (
    <>
      {/* Floating button — only when closed */}
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

      {/* Expanded backdrop */}
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

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
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
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-ink text-paper shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-accent-blue/20 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-paper" />
                </div>
                <div>
                  <div className="text-[14px] font-normal">SSA Assistant</div>
                  <div className="text-[11px] text-paper/50">Compliance Services</div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Expand / compress toggle */}
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="h-8 w-8 rounded-full hover:bg-paper/10 flex items-center justify-center transition"
                  aria-label={expanded ? "Collapse chat" : "Expand chat"}
                >
                  {expanded ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 rounded-full hover:bg-paper/10 flex items-center justify-center transition"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
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
                    {msg.from === "bot" ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
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
                    {formatText(msg.text)}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex items-end gap-2">
                  <div className="h-7 w-7 rounded-full bg-ink text-paper flex items-center justify-center shrink-0">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="bg-paper border border-rule/40 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-ink animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-ink animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-ink animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && !typing && (
              <div className="px-4 py-2 flex gap-2 flex-wrap bg-paper border-t border-rule/40 shrink-0">
                {QUICK_REPLIES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => sendMessage(r)}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-accent-blue/40 text-accent-blue hover:bg-accent-blue hover:text-paper transition"
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
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
                className="flex-1 bg-bone rounded-full px-4 py-2.5 text-[13px] text-ink placeholder:text-muted-ink/60 outline-none focus:ring-2 focus:ring-accent-blue/30 transition"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="h-9 w-9 rounded-full bg-ink text-paper flex items-center justify-center hover:bg-accent-blue transition disabled:opacity-40 shrink-0"
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
