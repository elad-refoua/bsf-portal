import { Route, Users, Target, Heart, Compass, Sparkles, type LucideIcon } from "lucide-react";
import type { Bilingual, NeedId } from "@/lib/types";

/**
 * Static *design* metadata for each need (icon, accent color, order, short label). Kept
 * separate from the clinical *content* (src/content/needs.json), which is authored from the
 * approved protocol. Color keys map to `need-<id>` in tailwind.config.js. The short `title`
 * + `tagline` here are UI labels; the rich prose lives in the content JSON.
 */
export interface NeedMeta {
  id: NeedId;
  order: number;
  icon: LucideIcon;
  /** Tailwind color token suffix, e.g. `need-predictability`. */
  color: string;
  /** Raw hex (for inline SVG / gradients / charts). */
  hex: string;
  title: Bilingual;
  tagline: Bilingual;
}

export const NEEDS_META: Record<NeedId, NeedMeta> = {
  predictability: {
    id: "predictability", order: 1, icon: Route, color: "need-predictability", hex: "#5b8fb0",
    title: { he: "ניבוי", en: "Predictability" },
    tagline: { he: "לדעת למה לצפות", en: "Knowing what to expect" },
  },
  belonging: {
    id: "belonging", order: 2, icon: Users, color: "need-belonging", hex: "#c97b84",
    title: { he: "שייכות", en: "Belonging" },
    tagline: { he: "להיות מחובר ומקובל", en: "Feeling connected and accepted" },
  },
  competence: {
    id: "competence", order: 3, icon: Target, color: "need-competence", hex: "#d9a441",
    title: { he: "מסוגלות", en: "Competence" },
    tagline: { he: "לפעול ביעילות בעולם", en: "Acting effectively in the world" },
  },
  selfworth: {
    id: "selfworth", order: 4, icon: Heart, color: "need-selfworth", hex: "#a97fb8",
    title: { he: "ערך עצמי", en: "Self-Worth" },
    tagline: { he: "להתייחס לעצמי בחמלה", en: "Meeting yourself with kindness" },
  },
  control: {
    id: "control", order: 5, icon: Compass, color: "need-control", hex: "#4f9d78",
    title: { he: "שליטה ואוטונומיה", en: "Control & Autonomy" },
    tagline: { he: "לבחור מתוך המצפן הפנימי", en: "Choosing from your inner compass" },
  },
  play: {
    id: "play", order: 6, icon: Sparkles, color: "need-play", hex: "#e0813f",
    title: { he: "משחק והנאה", en: "Play & Pleasure" },
    tagline: { he: "לעשות מקום לשמחה", en: "Making room for joy" },
  },
};

export const NEED_ORDER: NeedId[] = [
  "predictability",
  "belonging",
  "competence",
  "selfworth",
  "control",
  "play",
];
