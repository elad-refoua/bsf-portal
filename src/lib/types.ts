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
  minutes?: number;
  /** Ordered paragraphs of the therapist script for this segment. */
  body: BilingualBlocks;
}
