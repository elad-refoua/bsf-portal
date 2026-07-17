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

/**
 * The accent hexes are mid-tone — great as backgrounds/icon fills, but they FAIL WCAG-AA
 * contrast when used as TEXT on white/light tints, or under white text. `darken()` produces a
 * text-safe variant (≥4.5:1 on white / under white). Use `needTextHex(id)` for accent-colored
 * text, and `darken(accentHex)` for accent backgrounds that carry white text.
 */
export function darken(hex: string, amount = 0.42): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const f = 1 - amount;
  const r = Math.round(((n >> 16) & 255) * f);
  const g = Math.round(((n >> 8) & 255) * f);
  const b = Math.round((n & 255) * f);
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

export const NEED_TEXT_HEX = Object.fromEntries(
  NEED_ORDER.map((id) => [id, darken(NEEDS_META[id].hex)]),
) as Record<NeedId, string>;

export function needTextHex(id: NeedId): string {
  return NEED_TEXT_HEX[id];
}
