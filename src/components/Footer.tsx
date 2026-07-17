import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { Container } from "@/components/ui/primitives";
import Logo from "@/components/Logo";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-auto border-t border-sand-200 bg-sand-100">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Logo className="h-10 w-10" />
          <div>
            <p className="font-heading text-lg font-bold text-brand-700">{t(UI.brand)}</p>
            <p className="max-w-md text-sm text-ink-500">{t(UI.brandSub)}</p>
          </div>
        </div>
        <div className="max-w-md space-y-2 text-sm text-ink-500">
          <p className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden />
            <span>{t(UI.misc.privacy)}</span>
          </p>
          <p>{t(UI.misc.madeBy)}</p>
          <p className="text-ink-500">{t(UI.misc.citation)}</p>
          <p className="text-ink-500">{t(UI.misc.builtBy)}</p>
          <p>
            <Link to="/accessibility" className="font-medium text-brand-700 underline hover:text-brand-600">
              {t(UI.misc.accessibility)}
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
