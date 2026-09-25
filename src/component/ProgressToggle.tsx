"use client";

import { useState, useTransition } from "react";

export function ProgressToggle({
  entityType,
  entityId,
  initialDone,
}: {
  entityType: "topic" | "question";
  entityId: number;
  initialDone: boolean;
}) {
  const [done, setDone] = useState(initialDone);
  const [pending, startTransition] = useTransition();

  const toggle = () => {
    const next = !done;
    setDone(next);
    startTransition(async () => {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entityType, entityId, done: next }),
      });
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-[12px] font-bold transition-colors ${
        done
          ? "border-teal bg-teal-wash text-teal-deep"
          : "border-line bg-white text-ink-soft hover:border-teal hover:text-teal-deep"
      }`}
    >
      <span
        className={`grid h-4 w-4 place-items-center rounded-sm border text-[10px] font-black ${
          done ? "border-teal bg-teal text-paper" : "border-ink-faint"
        }`}
      >
        {done ? "✓" : ""}
      </span>
      {done ? "Studied — tap to unmark" : "Mark as studied"}
    </button>
  );
}
