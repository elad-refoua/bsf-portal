import needsRaw from "./needs.json";
import toolsRaw from "./tools.json";
import protocolRaw from "./protocol.json";
import type { NeedContent, NeedId, ProtocolContent, ToolContent } from "@/lib/types";

export const needs = needsRaw as unknown as NeedContent[];
export const tools = toolsRaw as unknown as ToolContent[];
export const protocol = protocolRaw as unknown as ProtocolContent;

export const needById = Object.fromEntries(needs.map((n) => [n.id, n])) as Record<NeedId, NeedContent>;
export const toolById = Object.fromEntries(tools.map((t) => [t.id, t])) as Record<string, ToolContent>;

/** The tools a given need's patient page offers, in order. */
export function toolsForNeed(id: NeedId): ToolContent[] {
  const n = needById[id];
  if (!n) return [];
  return n.patient.toolIds.map((tid) => toolById[tid]).filter(Boolean);
}

/** Needs that use a given tool (for the tool page's "used in" chips). */
export function needsForTool(toolId: string): NeedId[] {
  return needs.filter((n) => n.patient.toolIds.includes(toolId)).map((n) => n.id);
}
