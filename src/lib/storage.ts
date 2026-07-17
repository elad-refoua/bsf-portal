import { useCallback, useEffect, useState } from "react";

/**
 * Client-side persistence for the practice tools. EVERYTHING lives in localStorage on the
 * user's own device — nothing is ever transmitted. Each tool holds a list of entries
 * (e.g. several filled Triangle sheets, or many journal days).
 */

export interface ToolEntry {
  id: string;
  createdAt: number;
  updatedAt: number;
  /** Optional short label for lists (falls back to a date). */
  title?: string;
  data: Record<string, unknown>;
}

const NS = "catan:tool:";
const key = (toolId: string) => NS + toolId;

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "id-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function readEntries(toolId: string): ToolEntry[] {
  try {
    const raw = localStorage.getItem(key(toolId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ToolEntry[]) : [];
  } catch {
    return [];
  }
}

function writeEntries(toolId: string, entries: ToolEntry[]): void {
  localStorage.setItem(key(toolId), JSON.stringify(entries));
  // notify same-tab listeners (storage event only fires cross-tab)
  window.dispatchEvent(new CustomEvent("catan:storage", { detail: { toolId } }));
}

export function upsertEntry(
  toolId: string,
  data: Record<string, unknown>,
  id?: string,
  title?: string,
): ToolEntry {
  const entries = readEntries(toolId);
  const now = Date.now();
  if (id) {
    const idx = entries.findIndex((e) => e.id === id);
    if (idx >= 0) {
      entries[idx] = { ...entries[idx], data, title, updatedAt: now };
      writeEntries(toolId, entries);
      return entries[idx];
    }
  }
  const entry: ToolEntry = { id: id ?? newId(), createdAt: now, updatedAt: now, title, data };
  entries.unshift(entry);
  writeEntries(toolId, entries);
  return entry;
}

export function deleteEntry(toolId: string, id: string): void {
  writeEntries(
    toolId,
    readEntries(toolId).filter((e) => e.id !== id),
  );
}

export function clearTool(toolId: string): void {
  localStorage.removeItem(key(toolId));
  window.dispatchEvent(new CustomEvent("catan:storage", { detail: { toolId } }));
}

/** All tool ids that currently have saved entries, with counts + last-touched time. */
export function listAllTools(): Array<{ toolId: string; count: number; lastUpdated: number }> {
  const out: Array<{ toolId: string; count: number; lastUpdated: number }> = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k || !k.startsWith(NS)) continue;
    const toolId = k.slice(NS.length);
    const entries = readEntries(toolId);
    if (entries.length) {
      out.push({
        toolId,
        count: entries.length,
        lastUpdated: Math.max(...entries.map((e) => e.updatedAt)),
      });
    }
  }
  return out.sort((a, b) => b.lastUpdated - a.lastUpdated);
}

export function clearAllData(): void {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(NS)) keys.push(k);
  }
  keys.forEach((k) => localStorage.removeItem(k));
  window.dispatchEvent(new CustomEvent("catan:storage", { detail: { toolId: "*" } }));
}

/** React hook: live list of a tool's entries + CRUD, synced within and across tabs. */
export function useToolEntries(toolId: string) {
  const [entries, setEntries] = useState<ToolEntry[]>(() =>
    typeof window === "undefined" ? [] : readEntries(toolId),
  );

  const refresh = useCallback(() => setEntries(readEntries(toolId)), [toolId]);

  useEffect(() => {
    refresh();
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.toolId === toolId || detail.toolId === "*") refresh();
    };
    const onStorage = () => refresh();
    window.addEventListener("catan:storage", onCustom as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("catan:storage", onCustom as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, [toolId, refresh]);

  const save = useCallback(
    (data: Record<string, unknown>, id?: string, title?: string) =>
      upsertEntry(toolId, data, id, title),
    [toolId],
  );
  const remove = useCallback((id: string) => deleteEntry(toolId, id), [toolId]);
  const clear = useCallback(() => clearTool(toolId), [toolId]);

  return { entries, save, remove, clear };
}
