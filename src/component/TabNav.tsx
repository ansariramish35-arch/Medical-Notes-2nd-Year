"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function TabNav({
  param = "tab",
  tabs,
  active,
}: {
  param?: string;
  tabs: { id: string; label: string; count?: number }[];
  active: string;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  return (
    <div className="flex flex-wrap gap-1.5">
      {tabs.map((t) => {
        const isActive = t.id === active;
        const next = new URLSearchParams(sp.toString());
        next.set(param, t.id);
        return (
          <button
            key={t.id}
            onClick={() => router.push(`?${next.toString()}`)}
            className={`rounded-md border px-3.5 py-2 text-[12.5px] font-bold transition-colors ${
              isActive
                ? "border-teal-deep bg-teal-deep text-paper"
                : "border-line bg-white text-ink-soft hover:border-teal hover:text-teal-deep"
            }`}
          >
            {t.label}
            {typeof t.count === "number" && (
              <span
                className={`ml-1.5 rounded px-1.5 py-0.5 text-[10px] font-extrabold ${
                  isActive ? "bg-white/15 text-paper" : "bg-paper text-ink-faint"
                }`}
              >
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
