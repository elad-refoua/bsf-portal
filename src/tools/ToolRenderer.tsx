import type { ToolContent } from "@/lib/types";
import type { Lang } from "@/lib/types";
import { useLang } from "@/i18n/LanguageContext";
import ToolShell from "@/tools/ToolShell";
import FieldForm from "@/tools/FieldForm";
import MeditationPlayer from "@/tools/MeditationPlayer";
import ClosenessCirclesBody from "@/tools/bodies/ClosenessCirclesBody";
import PleasurableActivitiesBody from "@/tools/bodies/PleasurableActivitiesBody";
import GradedTaskBody from "@/tools/bodies/GradedTaskBody";
import GuidedReflectionBody from "@/tools/bodies/GuidedReflectionBody";

/** Two-column field layout reads better for a couple of tools. */
const TWO_COL = new Set(["decisionalBalance"]);

/** Short entry label from the first non-empty field value. */
function firstValueTitle(data: Record<string, unknown>, lang: Lang): string | undefined {
  void lang;
  for (const v of Object.values(data)) {
    if (typeof v === "string" && v.trim()) return v.trim().slice(0, 40);
  }
  return undefined;
}

export default function ToolRenderer({ tool, accentHex }: { tool: ToolContent; accentHex: string }) {
  const { lang } = useLang();
  // The meditation is a player, not a savable form.
  if (tool.type === "meditation") {
    const audioSrc = `${import.meta.env.BASE_URL}assets/audio/mountain-${lang}.mp3`;
    return <MeditationPlayer script={tool.meditationScript} audioSrc={audioSrc} accentHex={accentHex} />;
  }

  return (
    <ToolShell tool={tool} accentHex={accentHex} makeTitle={firstValueTitle}>
      {(args) => {
        const body = { ...args, accentHex };
        switch (tool.type) {
          case "closenessCircles":
            return <ClosenessCirclesBody {...body} />;
          case "pleasurableActivities":
            return <PleasurableActivitiesBody {...body} />;
          case "gradedTask":
            return <GradedTaskBody {...body} />;
          case "guidedReflection":
            return <GuidedReflectionBody {...body} />;
          default:
            return (
              <FieldForm
                fields={tool.fields}
                data={args.data}
                setField={args.setField}
                columns={TWO_COL.has(tool.type) ? 2 : 1}
              />
            );
        }
      }}
    </ToolShell>
  );
}
