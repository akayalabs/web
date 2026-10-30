// Çerez tercihi tek yerden okunur; bant, Analytics ve gizlilik sayfası aynı kaydı kullanır.
const CONSENT_KEY = "cookie-consent";
const CHANGE_EVENT = "cookie-consent-change";

export type ConsentChoice = "accepted" | "rejected";

export function readConsent(): ConsentChoice | null {
  return localStorage.getItem(CONSENT_KEY) as ConsentChoice | null;
}

export function saveConsent(choice: ConsentChoice) {
  localStorage.setItem(CONSENT_KEY, choice);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

// Rıza geri alınınca Analytics çerezleri de silinir, bant yeniden sorar.
export function withdrawConsent() {
  localStorage.removeItem(CONSENT_KEY);
  const domain = window.location.hostname.replace(/^www\./, "");
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const scope of ["", `; domain=.${domain}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${scope}`;
    }
  }
  window.location.reload();
}
