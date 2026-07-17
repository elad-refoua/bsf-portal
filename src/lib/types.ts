/** Every human-facing string in the content model carries both languages. */
export interface Bilingual {
  he: string;
  en: string;
}

export type Lang = "he" | "en";

/** A block of longer prose (paragraphs) in both languages. */
export interface BilingualBlocks {
  he: string[];
  en: string[];
}

export type NeedId =
  | "predictability"
  | "belonging"
  | "competence"
  | "selfworth"
  | "control"
  | "play";

export type ToolType =
  | "triangle"
  | "woop"
  | "meditation"
  | "journal"
  | "monitor"
  | "decisionalBalance"
  | "closenessCircles"
  | "pleasurableActivities"
  | "gradedTask"
  | "guidedReflection";

export interface ToolField {
  id: string;
  label: Bilingual;
  /** Rendered input control. */
  kind: "text" | "textarea" | "select" | "checkbox";
  placeholder?: Bilingual;
  options?: Bilingual[];
  helper?: Bilingual;
}

export interface ProtocolSegment {
  label: Bilingual;
  minutes?: number | null;
  /** Ordered paragraphs of the therapist script for this segment. */
  body: BilingualBlocks;
}

/** One need-module's full content (patient + therapist), from src/content/needs.json. */
export interface NeedContent {
  id: NeedId;
  order: number;
  name: Bilingual;
  tagline: Bilingual;
  patient: {
    whatItIs: BilingualBlocks;
    whenUnmet: BilingualBlocks;
    whyItMatters: BilingualBlocks;
    toolIds: string[];
  };
  therapist: {
    highlightNeed: BilingualBlocks;
    didactic: BilingualBlocks;
    goalSetting: BilingualBlocks;
    mainPhase: ProtocolSegment[];
    homePractice: BilingualBlocks;
    extraTime: BilingualBlocks;
  };
  checkIn: BilingualBlocks;
  provenance?: Record<string, string>;
}

/** One interactive tool definition, from src/content/tools.json. */
export interface ToolContent {
  id: string;
  type: ToolType;
  name: Bilingual;
  summary: Bilingual;
  instructions: BilingualBlocks;
  fields: ToolField[];
  moduleIds: NeedId[];
  pdfHe?: string | null;
  pdfEn?: string | null;
  /** Only present for the "mountain" meditation tool. */
  meditationScript?: BilingualBlocks;
}

/** Shared, module-independent protocol content, from src/content/protocol.json. */
export interface ProtocolContent {
  genericIntro: { title: Bilingual; minutes: number; body: BilingualBlocks };
  psychoeducation: { title: Bilingual; patient: BilingualBlocks; therapist: BilingualBlocks };
  meetingFlow: { title: Bilingual; steps: Array<{ label: Bilingual; minutes: number | null }> };
  checkInGeneral: { title: Bilingual; body: BilingualBlocks };
  provenance?: Record<string, string>;
}
