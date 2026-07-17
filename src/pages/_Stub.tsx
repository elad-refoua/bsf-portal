import { Section, PageHeader } from "@/components/ui/primitives";
import { useLang } from "@/i18n/LanguageContext";
import type { Bilingual } from "@/lib/types";

/** Temporary placeholder used by pages still being built out in P4/P5. */
export default function Stub({ title, lead }: { title: Bilingual; lead?: Bilingual }) {
  const { t } = useLang();
  return (
    <Section>
      <PageHeader title={t(title)} lead={lead ? t(lead) : undefined} />
      <p className="text-ink-500">
        {t({ he: "התוכן נבנה כעת…", en: "This section is being built…" })}
      </p>
    </Section>
  );
}
