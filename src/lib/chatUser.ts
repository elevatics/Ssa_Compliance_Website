import { PRIVACY_NOTICE_VERSION } from "./privacy";

const ANON_USER_ID_KEY = "ssa-chat-user-id";
const THREAD_ID_KEY = "ssa-chat-thread-id";
const LEGACY_EMAIL_KEY = "ssa-chat-user-email";
const CHAT_CONSENT_KEY = "ssa-chat-consent";

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function hasChatConsent() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CHAT_CONSENT_KEY) === PRIVACY_NOTICE_VERSION;
}

export function setChatConsent() {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAT_CONSENT_KEY, PRIVACY_NOTICE_VERSION);
}

export function clearChatConsent() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CHAT_CONSENT_KEY);
}

export function takeLegacyChatEmail() {
  if (typeof window === "undefined") return null;
  const email = localStorage.getItem(LEGACY_EMAIL_KEY);
  localStorage.removeItem(LEGACY_EMAIL_KEY);
  return email;
}

export function getChatUserId() {
  if (typeof window === "undefined") return "ssa-visitor";

  const existing = localStorage.getItem(ANON_USER_ID_KEY);
  if (existing) return existing;

  const userId = createId("ssa_user");
  localStorage.setItem(ANON_USER_ID_KEY, userId);
  return userId;
}

export function resetChatIdentity() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ANON_USER_ID_KEY);
  localStorage.removeItem(THREAD_ID_KEY);
  localStorage.removeItem(LEGACY_EMAIL_KEY);
}

export function getChatThreadId() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(THREAD_ID_KEY);
}

export function setChatThreadId(threadId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(THREAD_ID_KEY, threadId);
}

export function clearChatThread() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(THREAD_ID_KEY);
}
