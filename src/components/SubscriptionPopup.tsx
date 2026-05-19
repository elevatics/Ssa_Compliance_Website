import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Shield, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "ssa_popup_v3";
const INITIAL_DELAY_MS = 2 * 60 * 1000; // 2 minutes
const REOPEN_INTERVAL_MS = 5 * 1000; // 5 seconds

export function SubscriptionPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const reopenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    localStorage.removeItem("ssa_popup_v1");
    localStorage.removeItem("ssa_popup_v2");

    if (localStorage.getItem(STORAGE_KEY) === "subscribed") return;

    reopenTimerRef.current = setTimeout(() => {
      setVisible(true);
    }, INITIAL_DELAY_MS);

    return () => {
      if (reopenTimerRef.current) clearTimeout(reopenTimerRef.current);
    };
  }, []);

  function scheduleReopen() {
    if (localStorage.getItem(STORAGE_KEY) === "subscribed") return;
    if (reopenTimerRef.current) clearTimeout(reopenTimerRef.current);
    reopenTimerRef.current = setTimeout(() => {
      setVisible(true);
    }, REOPEN_INTERVAL_MS);
  }

  function dismiss() {
    setVisible(false);
    scheduleReopen();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    console.info("[SSA] Subscription email captured:", trimmed);
    setSubmitted(true);
    localStorage.setItem(STORAGE_KEY, "subscribed");
    if (reopenTimerRef.current) clearTimeout(reopenTimerRef.current);
    setTimeout(() => setVisible(false), 2800);
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-ink/35 backdrop-blur-sm"
            onClick={dismiss}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="fixed inset-0 z-[61] flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-sm bg-paper rounded-2xl shadow-2xl border border-rule/60 pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-accent-blue via-accent-orange to-accent-blue" />

              <button
                type="button"
                onClick={dismiss}
                aria-label="Close"
                className="absolute top-3.5 right-3.5 h-7 w-7 rounded-full border border-rule/60 flex items-center justify-center text-muted-ink hover:text-ink hover:bg-bone transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              <div className="px-6 pt-6 pb-7">
                {!submitted ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-9 w-9 rounded-xl bg-bone border border-rule/60 flex items-center justify-center shrink-0">
                        <Shield className="h-4 w-4 text-accent-blue stroke-[1.5]" />
                      </div>
                      <div>
                        <div className="eyebrow text-xs mb-0.5">Stay Compliant</div>
                        <h2 className="font-display text-xl tracking-tight leading-tight">
                          Get compliance insights
                          <span className="text-accent-blue font-light"> delivered to you.</span>
                        </h2>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-5">
                      {[
                        "Labour law updates & Apex Court verdicts",
                        "POSH compliance reminders & templates",
                        "Pan-India statutory filing calendars",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-ink/75">
                          <CheckCircle2 className="h-3.5 w-3.5 text-accent-blue stroke-[2] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <form onSubmit={handleSubmit} className="space-y-2.5">
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-ink stroke-[1.5]" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setError(""); }}
                          placeholder="Enter your work email"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-rule/60 bg-bone text-sm text-ink placeholder:text-muted-ink/60 outline-none focus:ring-2 focus:ring-accent-blue/30 transition"
                          autoFocus
                        />
                      </div>
                      {error && <p className="text-xs text-red-500 pl-0.5">{error}</p>}
                      <button
                        type="submit"
                        className="w-full bg-ink text-paper py-2.5 rounded-xl text-sm font-normal hover:bg-accent-blue transition"
                      >
                        Send me compliance insights
                      </button>
                    </form>

                    <p className="text-xs text-muted-ink/55 text-center mt-3">
                      No spam. Unsubscribe at any time.
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    <div className="h-12 w-12 rounded-full bg-bone border border-rule/60 flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-6 w-6 text-accent-blue stroke-[1.5]" />
                    </div>
                    <h3 className="font-display text-xl tracking-tight mb-2">You're in.</h3>
                    <p className="text-sm text-muted-ink font-light leading-relaxed max-w-[220px]">
                      Compliance insights will be delivered to your inbox shortly.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
