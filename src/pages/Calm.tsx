import { useLang } from "@/i18n/LanguageContext";
import { UI } from "@/lib/ui-strings";
import { toolById } from "@/content";
import { Section, PageHeader } from "@/components/ui/primitives";
import MeditationPlayer from "@/tools/MeditationPlayer";
import AssetImage from "@/components/AssetImage";

export default function Calm() {
  const { t, lang } = useLang();
  const mountain = toolById["mountain"];
  const audioSrc = `${import.meta.env.BASE_URL}assets/audio/mountain-${lang}.mp3`;

  return (
    <Section>
      <PageHeader
        title={t(UI.nav.calm)}
        lead={t({
          he: "רגע לעצור, לנשום, ולהתחבר לתחושת יציבות — כמו הר. אפשר להאזין, לתרגל נשימה, ולקרוא את הטקסט המלא.",
          en: "A moment to pause, breathe, and connect to a sense of steadiness — like a mountain. Listen, pace your breath, and read the full script.",
        })}
      />
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 overflow-hidden rounded-xl2 shadow-soft">
          <AssetImage
            src="images/mountain.webp"
            alt={t({ he: "הר רגוע המשתקף במים שקטים", en: "A calm mountain mirrored in still water" })}
            className="h-48 w-full object-cover sm:h-64"
          />
        </div>
        <MeditationPlayer script={mountain?.meditationScript} audioSrc={audioSrc} accentHex="#5b8fb0" />
      </div>
    </Section>
  );
}
