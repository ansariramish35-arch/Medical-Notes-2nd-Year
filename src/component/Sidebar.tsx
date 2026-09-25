"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", num: "00", label: "Study Console" },
  { href: "/source", num: "01", label: "Master Source Index" },
  { href: "/atlas", num: "02", label: "Master Atlases" },
  { href: "/revision", num: "03", label: "Revision Masters" },
  { href: "/selftest", num: "04", label: "Self-Test" },
  { href: "/viva", num: "05", label: "Viva Guide" },
  { href: "/coverage", num: "06", label: "Coverage Audit" },
];

export function Sidebar({ systems }: { systems: { id: number; slug: string; name: string; unitLabel: string; paperName: string }[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-line bg-card lg:flex">
      <div className="border-b border-line px-5 py-5">
        <Link href="/" className="block">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-teal-deep font-display text-lg font-bold text-paper">
              M
            </span>
            <span>
              <span className="block font-display text-[17px] font-semibold leading-tight">
                MedMaster Notes
              </span>
              <span className="block text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-faint">
                University Master Book
              </span>
            </span>
          </div>
        </Link>
        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
          }}
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search topics, questions…"
            className="w-full rounded-md border border-line bg-paper px-3 py-2 text-[13px] outline-none placeholder:text-ink-faint focus:border-teal"
          />
        </form>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          <p className="px-2 pb-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink-faint">
            Sections
          </p>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`nav-item ${pathname === n.href ? "active" : ""}`}
            >
              <span className="nav-num">{n.num}</span>
              {n.label}
            </Link>
          ))}
        </div>
        <div className="space-y-1">
          <p className="px-2 pb-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink-faint">
            Systems / Units
          </p>
          {systems.map((s) => (
            <Link
              key={s.id}
              href={`/systems/${s.id}`}
              className={`nav-item ${pathname === `/systems/${s.id}` ? "active" : ""}`}
            >
              <span className="nav-num">{s.unitLabel.replace("Unit ", "U")}</span>
              <span className="truncate">{s.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="border-t border-line px-5 py-3 text-[10.5px] leading-relaxed text-ink-faint">
        Completeness &gt; brevity · every source question mapped to a master topic.
      </div>
    </aside>
  );
}
