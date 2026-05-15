import { useEffect, useState, type ReactNode } from "react";
import { X, Calendar } from "lucide-react";

// Swap this for your real Calendly / Cal.com link when ready.
// Example: "https://calendly.com/your-handle/30min"
export const BOOKING_URL = "https://calendly.com/ssa-compliance/30min";

type BookingDialogProps = {
  trigger: (open: () => void) => ReactNode;
  url?: string;
};

export function BookingDialog({ trigger, url = BOOKING_URL }: BookingDialogProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Add Calendly-friendly query params for embed chrome
  const embedUrl = (() => {
    try {
      const u = new URL(url);
      u.searchParams.set("hide_gdpr_banner", "1");
      u.searchParams.set("embed_domain", typeof window !== "undefined" ? window.location.host : "");
      u.searchParams.set("embed_type", "Inline");
      return u.toString();
    } catch {
      return url;
    }
  })();

  return (
    <>
      {trigger(() => setOpen(true))}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Book a consultation"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-4xl h-[85vh] md:h-[80vh] bg-paper rounded-3xl overflow-hidden shadow-2xl border border-rule/60 flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-rule/60 bg-paper">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-accent-blue/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-accent-blue stroke-[1.5]" />
                </div>
                <div>
                  <div className="text-[15px] font-normal tracking-tight text-ink">
                    Book a consultation
                  </div>
                  <div className="text-[12px] text-muted-ink font-light">
                    30 minutes · syncs with your calendar
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close booking"
                className="h-9 w-9 rounded-full border border-rule/60 flex items-center justify-center text-ink hover:bg-bone transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <iframe
              src={embedUrl}
              title="Booking calendar"
              className="flex-1 w-full bg-paper"
              loading="lazy"
              allow="camera; microphone; fullscreen"
            />
            <div className="px-6 py-3 border-t border-rule/60 text-[12px] text-muted-ink font-light bg-bone/40 text-center">
              Trouble loading?{" "}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:text-accent-orange underline-offset-4 hover:underline"
              >
                Open booking page in new tab
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
