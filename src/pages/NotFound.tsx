import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { Section, LinkButton } from "@/components/ui/primitives";

export default function NotFound() {
  const { t } = useLang();
  return (
    <Section className="text-center">
      <h1 className="font-heading text-5xl font-bold text-brand-700">404</h1>
      <p className="mt-4 text-xl text-ink-700">
        {t({ he: "העמוד לא נמצא.", en: "Page not found." })}
      </p>
      <div className="mt-8">
        <LinkButton to="/">{t(UI.nav.home)}</LinkButton>
      </div>
    </Section>
  );
}
