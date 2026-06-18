import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, RotateCcw, X } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type OtpVerificationPopupProps = {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onVerify: (otp: number) => Promise<void>;
  onResend?: () => Promise<void>;
};

export function OtpVerificationPopup({
  isOpen,
  email,
  onClose,
  onVerify,
  onResend,
}: OtpVerificationPopupProps) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setOtp("");
      setError("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((v) => v - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a complete 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await onVerify(Number(otp));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !onResend) return;

    setResendLoading(true);
    setError("");
    try {
      await onResend();
      setResendCooldown(60);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Verify OTP"
      style={{ zIndex: 100000 }}
      className="fixed inset-0 flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-md"
      />

      <div className="relative w-full max-w-md bg-paper rounded-3xl shadow-2xl border border-rule/40 p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close OTP verification"
          className="absolute top-4 right-4 h-9 w-9 rounded-full border border-rule/60 flex items-center justify-center text-muted-ink hover:bg-bone/60 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center mb-6">
          <h2 className="font-display text-2xl tracking-tight text-ink">Verify OTP</h2>
          <p className="text-[13px] text-muted-ink font-light mt-2 leading-relaxed">
            Enter the 6-digit OTP sent to
            <br />
            <span className="text-ink font-normal">{email}</span>
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="h-12 w-11 rounded-xl border border-rule bg-bone/40 text-lg font-medium first:rounded-xl last:rounded-xl"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={() => void handleVerify()}
          disabled={loading || otp.length !== 6}
          className="w-full h-12 rounded-full bg-ink text-paper text-[15px] font-normal hover:bg-accent-blue disabled:opacity-50 transition-colors flex items-center justify-center gap-2 mb-3"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying…
            </>
          ) : (
            "Verify OTP"
          )}
        </button>

        {onResend && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => void handleResend()}
              disabled={resendLoading || resendCooldown > 0}
              className="inline-flex items-center gap-2 text-[13px] text-accent-blue hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className={`h-3.5 w-3.5 ${resendLoading ? "animate-spin" : ""}`} />
              {resendLoading
                ? "Sending…"
                : resendCooldown > 0
                  ? `Resend OTP in ${resendCooldown}s`
                  : "Resend OTP"}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
