import { useState, type ReactNode } from "react";
import {
  ShieldCheck,
  ListOrdered,
  DoorOpen,
  BookOpen,
  Download,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { NEED_ORDER, NEEDS_META } from "@/lib/needs-meta";
import { needById, protocol, tools } from "@/content";
import type { Bilingual, NeedId } from "@/lib/types";
import { Section, Container, Card, Prose } from "@/components/ui/primitives";
import AccessGate, { isUnlocked } from "@/components/therapist/AccessGate";
import ProtocolModule from "@/components/therapist/ProtocolModule";
import { scrollToId } from "@/lib/scroll";

const BASE = import.meta.env.BASE_URL;

/** Build a public-asset PDF URL for a given language folder + filename. */
function pdfUrl(lang: "he" | "en", file: string): string {
  return `${BASE}assets/pdf/${lang}/${encodeURIComponent(file)}`;
}

/** A single download row (a labeled file link with a download icon). */
function DownloadLink({ label, href, note }: { label: string; href: string; note?: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-sand-200 bg-white px-4 py-3 transition hover:border-brand-300 hover:bg-brand-50"
      >
        <span className="flex items-center gap-3">
          <FileText className="h-5 w-5 shrink-0 text-brand-500" aria-hidden />
          <span>
            <span className="block font-medium text-ink-900">{label}</span>
            {note && <span className="block text-sm text-ink-500">{note}</span>}
          </span>
        </span>
        <Download
          className="h-5 w-5 shrink-0 text-ink-500 transition group-hover:text-brand-600"
          aria-hidden
        />
      </a>
    </li>
  );
}

/** Six per-module Hebrew check-in PDFs (order matches NEED_ORDER). */
const CHECKIN_PDFS: Record<NeedId, string> = {
  predictability: "Check-in - Module 1 - Predictability - Hebrew.pdf",
  belonging: "Check-in - Module 2 - Belonging- Hebrew.pdf",
  competence: "Check-in - Module 3 - Competence - Hebrew.pdf",
  selfworth: "Check-in - Module 4 - Self-Worth - Hebrew.pdf",
  control: "Check-in - Module 5 - Control-Autonomy - Hebrew.pdf",
  play: "Check-in - Module 6 - Play - Hebrew.pdf",
};

/** In-page anchor targets for the sticky sub-nav. */
function NavLinks() {
  const { t } = useLang();
  const links: Array<{ id: string; label: Bilingual }> = [
    { id: "session-flow", label: protocol.meetingFlow.title },
    { id: "generic-intro", label: protocol.genericIntro.title },
    { id: "psychoeducation", label: protocol.psychoeducation.title },
    ...NEED_ORDER.map((id) => ({ id: `module-${id}`, label: NEEDS_META[id].title })),
    { id: "downloads", label: { he: "חומרים להורדה", en: "Downloads" } as Bilingual },
  ];
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((l) => (
        <li key={l.id}>
          <button
            type="button"
            onClick={() => scrollToId(l.id)}
            className="inline-flex min-h-[36px] items-center rounded-full border border-sand-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            {t(l.label)}
          </button>
        </li>
      ))}
    </ul>
  );
}

function GatedArea() {
  const { t, lang } = useLang();

  // Worksheet PDFs that carry a link for the active language (from content).
  const worksheetPdfs = tools
    .map((tool) => {
      const file = lang === "he" ? tool.pdfHe : tool.pdfEn;
      return file ? { id: tool.id, name: t(tool.name), file } : null;
    })
    .filter((x): x is { id: string; name: string; file: string } => x !== null);

  const watermarkNote = t({
    he: "כל קובצי ה-PDF נושאים סימן מים וזכויות יוצרים של ARLAB/CATAN.",
    en: "All PDFs carry the ARLAB/CATAN watermark and copyright.",
  });

  return (
    <>
      {/* Distinct, cooler header band for the clinician area */}
      <div style={{ backgroundColor: "#265f59" }}>
        <Container className="py-14">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-100/90">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            {t(UI.nav.therapist)}
          </p>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            {t({ he: "הפרוטוקול הקליני המלא", en: "The Full Clinical Protocol" })}
          </h1>
          <p className="mt-4 max-w-3xl text-xl text-brand-50">
            {t({
              he: "מדריך המטפל/ת לפגישת ההתערבות בת 90 הדקות: מבנה המפגש, סקריפטים, ששת מודולי הצרכים, מטלות בית ופגישות המעקב — עם חומרים להורדה.",
              en: "The clinician's reference for the 90-minute intervention session: session flow, scripts, the six need-modules, home practice, and check-ins — with downloadable materials.",
            })}
          </p>
        </Container>
      </div>

      {/* Sticky in-page navigation */}
      <div className="sticky top-16 z-20 border-b border-sand-200 bg-sand-50/95 backdrop-blur">
        <Container className="py-3">
          <nav aria-label={t({ he: "ניווט בפרוטוקול", en: "Protocol navigation" })}>
            <NavLinks />
          </nav>
        </Container>
      </div>

      <Section className="space-y-16">
        {/* a. Session Flow */}
        <section id="session-flow" className="scroll-mt-28">
          <SectionHeading icon={ListOrdered} title={protocol.meetingFlow.title} />
          <Card>
            <ol className="space-y-4">
              {protocol.meetingFlow.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700">
                    {i + 1}
                  </span>
                  <div className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-lg text-ink-900">{t(step.label)}</span>
                    {typeof step.minutes === "number" && (
                      <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-0.5 text-sm font-medium text-brand-700">
                        {step.minutes} {t(UI.misc.minutes)}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </section>

        {/* b. Generic Introduction */}
        <section id="generic-intro" className="scroll-mt-28">
          <SectionHeading
            icon={DoorOpen}
            title={protocol.genericIntro.title}
            trailing={
              <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                {protocol.genericIntro.minutes} {t(UI.misc.minutes)}
              </span>
            }
          />
          <Card>
            <Prose paragraphs={protocol.genericIntro.body[lang]} />
          </Card>
        </section>

        {/* c. Psychoeducation (therapist script; bracketed notes styled subtly) */}
        <section id="psychoeducation" className="scroll-mt-28">
          <SectionHeading icon={BookOpen} title={protocol.psychoeducation.title} />
          <Card>
            <TherapistScript paragraphs={protocol.psychoeducation.therapist[lang]} />
          </Card>
        </section>

        {/* d. The six modules */}
        <section className="scroll-mt-28">
          <h2 className="mb-6 font-heading text-2xl font-bold text-ink-900">
            {t({ he: "ששת מודולי הצרכים", en: "The Six Need-Modules" })}
          </h2>
          <p className="mb-6 max-w-3xl text-ink-700">
            {t({
              he: "כל מודול נפתח בלחיצה. הסדר תואם את סדר הצרכים בפרוטוקול; בפועל בוחרים את המודול המתאים לצורך הבלתי-מסופק המרכזי של המשתתף/ת.",
              en: "Each module expands on click. The order follows the protocol's need order; in practice you choose the module matching the participant's central unmet need.",
            })}
          </p>
          <div className="space-y-4">
            {NEED_ORDER.map((id) => (
              <ProtocolModule key={id} need={needById[id]} />
            ))}
          </div>
        </section>

        {/* f. Downloads */}
        <section id="downloads" className="scroll-mt-28">
          <SectionHeading icon={Download} title={{ he: "חומרים להורדה", en: "Downloads" }} />
          <p className="mb-6 flex items-start gap-2 text-sm text-ink-500">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {watermarkNote}
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Protocol & pointers */}
            <Card>
              <h3 className="mb-4 font-heading text-lg font-bold text-ink-900">
                {t({ he: "פרוטוקול והנחיות", en: "Protocol & pointers" })}
              </h3>
              <ul className="space-y-2">
                <DownloadLink
                  label={t({ he: "הפרוטוקול המלא (עברית)", en: "Full protocol (Hebrew)" })}
                  href={pdfUrl("he", "Final SSI Protocol - hebrew translation - draft i - Dec 15 2023.pdf")}
                  note={t({ he: "טיוטה, דצמבר 2023", en: "Draft, December 2023" })}
                />
                <DownloadLink
                  label={t({ he: "הנחיות נוספות למטפל/ת (עברית)", en: "Additional pointers (Hebrew)" })}
                  href={pdfUrl("he", "SSI additional pointers - hebrew - july 15 2023 .pdf")}
                />
                <DownloadLink
                  label={t({ he: "דף מבנה המפגש (עברית)", en: "Meeting flow handout (Hebrew)" })}
                  href={pdfUrl("he", "0.1 Meeting Flow Handout.pdf")}
                />
              </ul>
            </Card>

            {/* Worksheets */}
            <Card>
              <h3 className="mb-4 font-heading text-lg font-bold text-ink-900">
                {t({ he: "דפי עבודה", en: "Worksheets" })}
              </h3>
              {worksheetPdfs.length > 0 ? (
                <ul className="space-y-2">
                  {worksheetPdfs.map((w) => (
                    <DownloadLink key={w.id} label={w.name} href={pdfUrl(lang, w.file)} />
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-500">
                  {t({
                    he: "אין דפי עבודה מקושרים בשפה זו. עברו לעברית לצפייה בדפי העבודה.",
                    en: "No worksheets are linked for this language. Switch to Hebrew to see the worksheets.",
                  })}
                </p>
              )}
            </Card>

            {/* Check-ins */}
            <Card>
              <h3 className="mb-4 font-heading text-lg font-bold text-ink-900">
                {t({ he: "דפי פגישת מעקב", en: "Check-in sheets" })}
              </h3>
              <ul className="space-y-2">
                {NEED_ORDER.map((id) => (
                  <DownloadLink
                    key={id}
                    label={`${t({ he: "מודול", en: "Module" })} ${NEEDS_META[id].order} — ${t(NEEDS_META[id].title)}`}
                    href={pdfUrl("he", CHECKIN_PDFS[id])}
                    note={t({ he: "עברית", en: "Hebrew" })}
                  />
                ))}
              </ul>
            </Card>
          </div>
        </section>
      </Section>
    </>
  );
}

/** A consistent section heading with a lucide icon and optional trailing element. */
function SectionHeading({
  icon: Icon,
  title,
  trailing,
}: {
  icon: LucideIcon;
  title: Bilingual;
  trailing?: ReactNode;
}) {
  const { t } = useLang();
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h2 className="font-heading text-2xl font-bold text-ink-900">{t(title)}</h2>
      {trailing}
    </div>
  );
}

/**
 * Renders the therapist script. Bracketed "[elaboration…]" paragraphs (therapist-only
 * asides / examples) are kept but styled subtly: italic, muted, with an accent rule.
 */
function TherapistScript({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-lg leading-relaxed text-ink-700">
      {paragraphs.map((p, i) => {
        const isAside = p.trimStart().startsWith("[");
        if (isAside) {
          return (
            <p
              key={i}
              className="rounded-xl border-s-2 border-sand-200 bg-sand-50 px-4 py-3 text-base italic text-ink-500"
            >
              {p}
            </p>
          );
        }
        return <p key={i}>{p}</p>;
      })}
    </div>
  );
}

export default function Therapist() {
  const [unlocked, setUnlocked] = useState(isUnlocked);

  if (!unlocked) {
    return <AccessGate onUnlock={() => setUnlocked(true)} />;
  }
  return <GatedArea />;
}
