import { useId, useState, type FormEvent } from "react";
import { Lock, ShieldCheck, KeyRound, AlertCircle } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { Section, Card, Button } from "@/components/ui/primitives";
import Logo from "@/components/Logo";

/**
 * SHA-256 of the current access code. To change the code, compute the new hash
 * (e.g. in a browser console:
 *   crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourcode'))
 *      .then(b => console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))
 * ) and replace the constant below. The default code is "catan2026".
 */
const GATE_HASH = "c334c9499dcc36ce69022981c876ac6944e84fc10981cead1d9b7b16ec6f2163";

const STORAGE_KEY = "catan:therapist";

/** Session-scoped unlock check. Reads sessionStorage; safe on the server. */
export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(STORAGE_KEY) === "1";
}

/** Hash an arbitrary string to a lowercase hex SHA-256 digest via Web Crypto. */
async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function AccessGate({ onUnlock }: { onUnlock: () => void }) {
  const { t } = useLang();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputId = useId();
  const errorId = useId();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(false);
    try {
      const hash = await sha256Hex(code.trim());
      if (hash === GATE_HASH) {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
        onUnlock();
      } else {
        setError(true);
      }
    } catch {
      // crypto.subtle can be unavailable on insecure origins; fail gently.
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section>
      <div className="mx-auto max-w-xl">
        <Card className="text-center">
          <div className="mb-6 flex flex-col items-center gap-3">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ backgroundColor: "#265f5914", color: "#265f59" }}
            >
              <Lock className="h-8 w-8" aria-hidden />
            </span>
            <Logo className="h-8 w-8" />
          </div>

          <h1 className="font-heading text-3xl font-bold text-ink-900">
            {t({ he: "אזור מטפלים מוגן", en: "Protected Therapist Area" })}
          </h1>

          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-700">
            {t({
              he: "אזור זה מכיל את הפרוטוקול הקליני המלא, סקריפטים וחומרים להורדה, המיועדים למטפלים שהוכשרו לכך. החומרים נושאים זכויות יוצרים וסימן מים של ARLAB/CATAN.",
              en: "This area holds the full clinical protocol, scripts, and downloadable materials, intended for trained clinicians. The materials carry the ARLAB/CATAN copyright and watermark.",
            })}
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-sm text-start">
            <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-ink-900">
              {t({ he: "קוד גישה", en: "Access code" })}
            </label>
            <div className="relative">
              <span
                className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-ink-500"
                aria-hidden
              >
                <KeyRound className="h-5 w-5" />
              </span>
              <input
                id={inputId}
                type="password"
                inputMode="text"
                autoComplete="off"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (error) setError(false);
                }}
                aria-invalid={error}
                aria-describedby={error ? errorId : undefined}
                placeholder={t({ he: "הזינו את הקוד", en: "Enter the code" })}
                className="min-h-[44px] w-full rounded-xl border border-sand-200 bg-white ps-11 pe-4 py-2.5 text-lg text-ink-900 placeholder:text-ink-500 focus-visible:border-brand-500 focus-visible:outline-none"
              />
            </div>

            {error && (
              <p id={errorId} role="alert" className="mt-3 flex items-center gap-2 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
                {t({
                  he: "הקוד אינו נכון. אנא נסו שוב, או פנו לצוות המחקר.",
                  en: "That code isn't right. Please try again, or contact the research team.",
                })}
              </p>
            )}

            <Button type="submit" className="mt-6 w-full" disabled={busy}>
              <Lock className="h-5 w-5" aria-hidden />
              {busy
                ? t({ he: "בודק…", en: "Checking…" })
                : t(UI.actions.unlock)}
            </Button>
          </form>

          <p className="mx-auto mt-6 flex max-w-md items-start gap-2 text-start text-sm text-ink-500">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>
              {t({
                he: "זהו שער גישה קל (client-side) בלבד — לא נשמר שום מידע רגיש בשרת כלשהו, והכניסה תקפה למושב הדפדפן הנוכחי בלבד.",
                en: "This is a light client-side gate only — no sensitive data is stored on any server, and access lasts for the current browser session only.",
              })}
            </span>
          </p>
        </Card>
      </div>
    </Section>
  );
}
