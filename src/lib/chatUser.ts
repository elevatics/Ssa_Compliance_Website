const USER_EMAIL_KEY = "ssa-chat-user-email";
const ANON_USER_ID_KEY = "ssa-chat-user-id";
const THREAD_ID_KEY = "ssa-chat-thread-id";

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function getChatUserEmail() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USER_EMAIL_KEY);
}

export function setChatUserEmail(email: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_EMAIL_KEY, email.trim().toLowerCase());
}

export function clearChatUserEmail() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_EMAIL_KEY);
}

export function getChatUserId() {
  if (typeof window === "undefined") return "ssa-visitor";

  const email = getChatUserEmail();
  if (email) return email;

  const existing = localStorage.getItem(ANON_USER_ID_KEY);
  if (existing) return existing;

  const userId = createId("ssa_user");
  localStorage.setItem(ANON_USER_ID_KEY, userId);
  return userId;
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

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
