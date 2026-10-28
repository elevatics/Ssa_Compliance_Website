import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "ssa_popup_v3";
const DISMISS_COUNT_KEY = "ssa_popup_dismiss_count";
const INITIAL_DELAY_MS = 3 * 60 * 1000; // 3 minutes
const REOPEN_BASE_MINUTES = 2; // then 2, 4, 8, 16… minutes

function getReopenDelayMs(dismissCount: number) {
  const minutes = REOPEN_BASE_MINUTES * 2 ** dismissCount;
  return minutes * 60 * 1000;
}

export function SubscriptionPopup() {
  const [visible, setVisible] = useState(false);

  const reopenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissCountRef = useRef(0);

  useEffect(() => {
    localStorage.removeItem("ssa_popup_v1");
    localStorage.removeItem("ssa_popup_v2");

    if (localStorage.getItem(STORAGE_KEY) === "subscribed") return;

    dismissCountRef.current = Number(localStorage.getItem(DISMISS_COUNT_KEY) ?? "0") || 0;

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

    const delayMs = getReopenDelayMs(dismissCountRef.current);
    dismissCountRef.current += 1;
    localStorage.setItem(DISMISS_COUNT_KEY, String(dismissCountRef.current));

    reopenTimerRef.current = setTimeout(() => {
      setVisible(true);
    }, delayMs);
  }

  function dismiss() {
    setVisible(false);
    scheduleReopen();
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-xl bg-bone border border-rule/60 flex items-center justify-center shrink-0">
                    <Shield className="h-4 w-4 text-accent-blue stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="eyebrow text-xs mb-0.5">Stay Compliant</div>
                    <h2 className="font-display text-xl tracking-tight leading-tight">
                      Get compliance insights
                      <span className="text-accent-blue font-light"> on this site.</span>
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

                <Link
                  to="/insights"
                  onClick={() => setVisible(false)}
                  className="block w-full bg-ink text-paper py-2.5 rounded-xl text-sm font-normal hover:bg-accent-blue transition text-center"
                >
                  Read the latest insights
                </Link>

                <p className="text-xs text-muted-ink/55 text-center mt-3">
                  No email is collected here.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
