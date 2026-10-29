import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  applyStoredAnalyticsConsent,
  getAnalyticsConsent,
  setAnalyticsConsent,
} from "@/lib/analytics";

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    applyStoredAnalyticsConsent();
    setOpen(getAnalyticsConsent() === null);

    const reopen = () => setOpen(true);
    window.addEventListener("ssa-open-cookie-settings", reopen);
    return () => window.removeEventListener("ssa-open-cookie-settings", reopen);
  }, []);

  if (!open) return null;

  function choose(value: "granted" | "denied") {
    setAnalyticsConsent(value);
    setOpen(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none">
      <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-rule/60 bg-ink px-5 py-4 text-paper shadow-2xl sm:flex-row sm:items-end sm:justify-between">
        <p className="text-[13px] leading-relaxed text-paper/80 sm:max-w-xl">
          Google Analytics measures visits only if you accept. Until then it does not load and sets
          no cookies.{" "}
          <Link to="/privacy" className="text-paper underline underline-offset-2">
            Privacy Notice
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="h-10 rounded-full border border-paper/50 px-5 text-[13px] text-paper hover:bg-paper/10"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="h-10 rounded-full border border-paper bg-paper px-5 text-[13px] text-ink hover:bg-paper/90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
