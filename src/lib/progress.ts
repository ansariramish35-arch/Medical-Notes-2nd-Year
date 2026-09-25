"use client";

export type ProgressType = "topic" | "question";

export function getDoneIds(type: ProgressType): number[] {
  if (typeof window === "undefined") return [];
  const prefix = `progress-${type}-`;
  const ids: number[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(prefix)) {
      const id = Number.parseInt(key.slice(prefix.length), 10);
      if (!Number.isNaN(id)) ids.push(id);
    }
  }
  return ids;
}

export function isDone(type: ProgressType, id: number): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(`progress-${type}-${id}`) === "done";
}

export function toggleDone(type: ProgressType, id: number): boolean {
  if (typeof window === "undefined") return false;
  const key = `progress-${type}-${id}`;
  if (isDone(type, id)) { localStorage.removeItem(key); return false; }
  localStorage.setItem(key, "done");
  return true;
}

export function getProgressCount(type: ProgressType): number {
  return getDoneIds(type).length;
}
