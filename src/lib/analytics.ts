const CONSENT_KEY = "ssa-analytics-consent";
const GA_ID = "G-DCYLWV5X4G";
const SCRIPT_ID = "ssa-gtag";

export type AnalyticsConsent = "granted" | "denied";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setAnalyticsConsent(value: AnalyticsConsent) {
  localStorage.setItem(CONSENT_KEY, value);
  if (value === "granted") loadGoogleAnalytics();
  else disableGoogleAnalytics();
  window.dispatchEvent(new Event("ssa-analytics-consent"));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event("ssa-open-cookie-settings"));
}

export function applyStoredAnalyticsConsent() {
  if (getAnalyticsConsent() === "granted") loadGoogleAnalytics();
}

function loadGoogleAnalytics() {
  if (typeof window === "undefined" || document.getElementById(SCRIPT_ID)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function disableGoogleAnalytics() {
  if (typeof window === "undefined") return;
  document.getElementById(SCRIPT_ID)?.remove();
  window.gtag?.("consent", "update", { analytics_storage: "denied" });

  const host = window.location.hostname;
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0]?.trim();
    if (!name?.startsWith("_ga")) continue;
    const expiry = `${name}=; Max-Age=0; path=/`;
    document.cookie = expiry;
    document.cookie = `${expiry}; domain=${host}`;
    document.cookie = `${expiry}; domain=.${host}`;
  }
}
