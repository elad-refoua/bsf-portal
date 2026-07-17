import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { NEEDS_META } from "@/lib/needs-meta";
import { toolById, needsForTool, needById } from "@/content";
import { Section, Container } from "@/components/ui/primitives";
import ToolRenderer from "@/tools/ToolRenderer";

export default function ToolPage() {
  const { toolId } = useParams();
  const { t, lang } = useLang();
  const tool = toolId ? toolById[toolId] : undefined;
  if (!tool) return <Navigate to="/practice" replace />;

  const usedIn = needsForTool(tool.id);
  const accentHex = usedIn.length ? NEEDS_META[usedIn[0]].hex : "#2f7f77";
  const Arrow = lang === "he" ? ArrowLeft : ArrowRight;

  return (
    <>
      <div style={{ backgroundColor: `${accentHex}12` }}>
        <Container className="py-10">
          <Link to="/practice" className="mb-4 inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700">
            <Arrow className="h-4 w-4 rotate-180" aria-hidden /> {t(UI.nav.practice)}
          </Link>
          <h1 className="font-heading text-3xl font-bold text-ink-900 sm:text-4xl">{t(tool.name)}</h1>
          <p className="mt-2 max-w-2xl text-lg text-ink-700">{t(tool.summary)}</p>
          {usedIn.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-ink-500">{t({ he: "שייך לצורך:", en: "Part of:" })}</span>
              {usedIn.map((nid) => (
                <Link
                  key={nid}
                  to={`/needs/${nid}`}
                  className="rounded-full px-3 py-1 text-sm font-medium"
                  style={{ backgroundColor: `${NEEDS_META[nid].hex}1f`, color: NEEDS_META[nid].hex }}
                >
                  {t(needById[nid].name)}
                </Link>
              ))}
            </div>
          )}
        </Container>
      </div>

      <Section className="py-10">
        <div className="mx-auto max-w-4xl">
          <ToolRenderer tool={tool} accentHex={accentHex} />
        </div>
      </Section>
    </>
  );
}
