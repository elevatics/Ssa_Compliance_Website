import { useEffect, useState, type ReactNode, type FormEvent } from "react";
import { createPortal } from "react-dom";
import {
  X,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Building2,
  Briefcase,
  MessageSquare,
  User,
  MapPin,
} from "lucide-react";
import {
  registerBookDemoUser,
  resendBookDemoOTP,
  verifyBookDemoOTP,
} from "@/lib/bookDemoApi";
import { OtpVerificationPopup } from "./OtpVerificationPopup";

type BookingDialogProps = {
  trigger: (open: () => void) => ReactNode;
};

type FormState = {
  name: string;
  email: string;
  mobile: string;
  companyName: string;
  designation: string;
  location: string;
  enquiryInfo: string;
  howYouHearAboutUs: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  mobile: "",
  companyName: "",
  designation: "",
  location: "",
  enquiryInfo: "",
  howYouHearAboutUs: "",
  message: "",
};

const ENQUIRY_OPTIONS = ["Compliance", "Advisory", "Training"] as const;

const HEAR_ABOUT_OPTIONS = [
  "Google",
  "LinkedIn",
  "Referral",
  "Social Media",
  "Advertisement",
  "Other",
] as const;

function FieldIcon({ children }: { children: ReactNode }) {
  return (
    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-ink/50 pointer-events-none">
      {children}
    </span>
  );
}

export function BookingDialog({ trigger }: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [otpPopupOpen, setOtpPopupOpen] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !otpPopupOpen) handleClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, otpPopupOpen]);

  const resetState = () => {
    setForm(EMPTY);
    setSubmitted(false);
    setError("");
    setAcceptedTerms(false);
    setOtpPopupOpen(false);
    setPendingEmail("");
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(resetState, 400);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!acceptedTerms) {
      setError("Please accept the Privacy Policy & Terms to continue");
      return;
    }

    setSubmitting(true);
    try {
      const response = await registerBookDemoUser(form);

      if (response.success) {
        setPendingEmail(form.email);
        setOtpPopupOpen(true);
      } else {
        setError(response.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during registration.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtpVerify = async (otp: number) => {
    const response = await verifyBookDemoOTP({ email: pendingEmail, otp });

    if (response.success) {
      setOtpPopupOpen(false);
      setSubmitted(true);
    } else {
      throw new Error(response.error || "OTP verification failed");
    }
  };

  const handleResendOtp = async () => {
    const response = await resendBookDemoOTP(pendingEmail);
    if (!response.success) {
      throw new Error(response.error || "Failed to resend OTP");
    }
  };

  const modal = open
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Book a demo"
          style={{ zIndex: 99999 }}
          className="fixed inset-0 flex items-center justify-center p-4 md:p-6"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-md"
          />

          <div
            className="relative w-full max-w-2xl bg-paper rounded-3xl shadow-2xl border border-rule/40 flex flex-col overflow-hidden"
            style={{ maxHeight: "calc(100vh - 2rem)" }}
          >
            <div className="relative bg-ink text-paper px-8 py-7 shrink-0 overflow-hidden">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent-blue/20 blur-2xl" />
              <div className="absolute -bottom-10 left-0 h-32 w-32 rounded-full bg-accent-orange/15 blur-2xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="eyebrow mb-2 text-accent-orange" style={{ fontSize: "0.7rem" }}>
                    SSA Compliance Services LLP
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl tracking-tight leading-snug">
                    Book a Demo
                  </h2>
                  <p className="mt-1.5 text-[13px] text-paper/60 font-light">
                    Drop your details and we&apos;ll connect with you shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close booking"
                  className="shrink-0 h-9 w-9 rounded-full border border-paper/20 flex items-center justify-center text-paper/70 hover:bg-paper/10 hover:text-paper transition mt-0.5"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 px-8 text-center gap-5">
                  <div className="h-18 w-18 rounded-full bg-accent-blue/10 flex items-center justify-center p-5">
                    <CheckCircle2 className="h-10 w-10 text-accent-blue stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl tracking-tight mb-2">Demo Scheduled!</h3>
                    <p className="text-[14px] text-muted-ink font-light leading-relaxed max-w-sm mx-auto">
                      Demo will be scheduled soon. We will notify you via email at{" "}
                      <span className="text-ink font-normal">{form.email}</span>.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-2 inline-flex items-center gap-2 bg-accent-orange text-paper px-8 py-3 rounded-full text-[14px] font-normal hover:opacity-90 transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-8 py-7 space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="block text-[12px] font-normal text-muted-ink uppercase tracking-wider"
                    >
                      Name <span className="text-accent-orange">*</span>
                    </label>
                    <div className="relative">
                      <FieldIcon>
                        <User className="h-4 w-4" />
                      </FieldIcon>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-rule bg-bone/40 text-[14px] text-ink placeholder:text-muted-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/50 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block text-[12px] font-normal text-muted-ink uppercase tracking-wider"
                      >
                        Corporate Email <span className="text-accent-orange">*</span>
                      </label>
                      <div className="relative">
                        <FieldIcon>
                          <Mail className="h-4 w-4" />
                        </FieldIcon>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className="w-full h-11 pl-10 pr-4 rounded-xl border border-rule bg-bone/40 text-[14px] text-ink placeholder:text-muted-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/50 transition"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="mobile"
                        className="block text-[12px] font-normal text-muted-ink uppercase tracking-wider"
                      >
                        Contact No. <span className="text-accent-orange">*</span>
                      </label>
                      <div className="relative">
                        <FieldIcon>
                          <Phone className="h-4 w-4" />
                        </FieldIcon>
                        <input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          required
                          value={form.mobile}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full h-11 pl-10 pr-4 rounded-xl border border-rule bg-bone/40 text-[14px] text-ink placeholder:text-muted-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/50 transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="companyName"
                        className="block text-[12px] font-normal text-muted-ink uppercase tracking-wider"
                      >
                        Company Name <span className="text-accent-orange">*</span>
                      </label>
                      <div className="relative">
                        <FieldIcon>
                          <Building2 className="h-4 w-4" />
                        </FieldIcon>
                        <input
                          id="companyName"
                          name="companyName"
                          type="text"
                          required
                          value={form.companyName}
                          onChange={handleChange}
                          placeholder="Your company"
                          className="w-full h-11 pl-10 pr-4 rounded-xl border border-rule bg-bone/40 text-[14px] text-ink placeholder:text-muted-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/50 transition"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="designation"
                        className="block text-[12px] font-normal text-muted-ink uppercase tracking-wider"
                      >
                        Designation <span className="text-accent-orange">*</span>
                      </label>
                      <div className="relative">
                        <FieldIcon>
                          <Briefcase className="h-4 w-4" />
                        </FieldIcon>
                        <input
                          id="designation"
                          name="designation"
                          type="text"
                          required
                          value={form.designation}
                          onChange={handleChange}
                          placeholder="Your role"
                          className="w-full h-11 pl-10 pr-4 rounded-xl border border-rule bg-bone/40 text-[14px] text-ink placeholder:text-muted-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/50 transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="location"
                        className="block text-[12px] font-normal text-muted-ink uppercase tracking-wider"
                      >
                        Location / City / State <span className="text-accent-orange">*</span>
                      </label>
                      <div className="relative">
                        <FieldIcon>
                          <MapPin className="h-4 w-4" />
                        </FieldIcon>
                        <input
                          id="location"
                          name="location"
                          type="text"
                          required
                          value={form.location}
                          onChange={handleChange}
                          placeholder="City, State"
                          className="w-full h-11 pl-10 pr-4 rounded-xl border border-rule bg-bone/40 text-[14px] text-ink placeholder:text-muted-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/50 transition"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="enquiryInfo"
                        className="block text-[12px] font-normal text-muted-ink uppercase tracking-wider"
                      >
                        Enquiry For <span className="text-accent-orange">*</span>
                      </label>
                      <div className="relative">
                        <FieldIcon>
                          <Briefcase className="h-4 w-4" />
                        </FieldIcon>
                        <select
                          id="enquiryInfo"
                          name="enquiryInfo"
                          required
                          value={form.enquiryInfo}
                          onChange={handleChange}
                          className="w-full h-11 pl-10 pr-4 rounded-xl border border-rule bg-bone/40 text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/50 transition appearance-none cursor-pointer"
                        >
                          <option value="" disabled>
                            Select enquiry type
                          </option>
                          {ENQUIRY_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="howYouHearAboutUs"
                      className="block text-[12px] font-normal text-muted-ink uppercase tracking-wider"
                    >
                      How did you hear about us? <span className="text-accent-orange">*</span>
                    </label>
                    <select
                      id="howYouHearAboutUs"
                      name="howYouHearAboutUs"
                      required
                      value={form.howYouHearAboutUs}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-rule bg-bone/40 text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/50 transition appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {HEAR_ABOUT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block text-[12px] font-normal text-muted-ink uppercase tracking-wider"
                    >
                      Your Message <span className="text-accent-orange">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3.5 text-muted-ink/50 pointer-events-none">
                        <MessageSquare className="h-4 w-4" />
                      </span>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your compliance needs…"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-rule bg-bone/40 text-[14px] text-ink placeholder:text-muted-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/50 transition resize-none"
                      />
                    </div>
                  </div>

                  <div className="h-px bg-rule/60" />

                  <label className="flex items-start gap-2.5 text-[13px] text-muted-ink font-light cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-rule accent-ink"
                      required
                    />
                    <span>I accept the Privacy Policy &amp; Terms.</span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 rounded-full bg-ink text-paper text-[15px] font-normal hover:bg-accent-blue disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>

                  <p className="text-[11px] text-muted-ink/60 text-center font-light">
                    Your information is kept strictly confidential and never shared with third
                    parties.
                  </p>
                </form>
              )}
            </div>
          </div>

          <OtpVerificationPopup
            isOpen={otpPopupOpen}
            email={pendingEmail}
            onClose={() => setOtpPopupOpen(false)}
            onVerify={handleOtpVerify}
            onResend={handleResendOtp}
          />
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      {trigger(() => setOpen(true))}
      {modal}
    </>
  );
}
