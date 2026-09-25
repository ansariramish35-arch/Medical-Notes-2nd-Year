"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TypeBadge, Stars, FlagChips } from "./Badges";

export interface SourceRow {
  id: number;
  qtype: string;
  text: string;
  stars: number;
  timesAsked: number;
  paperName: string;
  systemName: string;
  unitLabel: string;
  topicTitle: string | null;
  topicId: number | null;
  needsDiagram: boolean;
  needsLabDx: boolean;
  needsMechanism: boolean;
  needsLifeCycle: boolean;
  needsComparison: boolean;
  needsClassification: boolean;
}

export function SourceIndex({ rows }: { rows: SourceRow[] }) {
  const [system, setSystem] = useState("all");
  const [qtype, setQtype] = useState("all");
  const [flag, setFlag] = useState("all");
  const [minStars, setMinStars] = useState(0);
  const [query, setQuery] = useState("");

  const systemNames = useMemo(() => [...new Set(rows.map((r) => r.systemName))], [rows]);

  const filtered = rows.filter((r) => {
    if (system !== "all" && r.systemName !== system) return false;
    if (qtype !== "all" && r.qtype !== qtype) return false;
    if (r.stars < minStars) return false;
    if (flag === "diagram" && !r.needsDiagram) return false;
    if (flag === "labdx" && !r.needsLabDx) return false;
    if (flag === "mechanism" && !r.needsMechanism) return false;
    if (flag === "lifecycle" && !r.needsLifeCycle) return false;
    if (flag === "comparison" && !r.needsComparison) return false;
    if (flag === "classification" && !r.needsClassification) return false;
    if (query && !r.text.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const sel =
    "rounded-md border border-line bg-white px-2.5 py-1.5 text-[12.5px] font-semibold text-ink outline-none focus:border-teal";

  return (
    <div className="rise">
      <div className="panel mb-4 flex flex-wrap items-center gap-2.5 p-3.5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by wording…"
          className={`${sel} min-w-44 flex-1`}
        />
        <select value={system} onChange={(e) => setSystem(e.target.value)} className={sel}>
          <option value="all">All systems</option>
          {systemNames.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={qtype} onChange={(e) => setQtype(e.target.value)} className={sel}>
          <option value="all">All types</option>
          <option value="laq">LAQ</option>
          <option value="sn">SN</option>
          <option value="saq">SAQ</option>
        </select>
        <select value={flag} onChange={(e) => setFlag(e.target.value)} className={sel}>
          <option value="all">Any requirement</option>
          <option value="diagram">Diagram required</option>
          <option value="labdx">Lab diagnosis</option>
          <option value="mechanism">Mechanism</option>
          <option value="lifecycle">Life cycle</option>
          <option value="comparison">Difference / comparison</option>
          <option value="classification">Classification</option>
        </select>
        <select
          value={minStars}
          onChange={(e) => setMinStars(Number(e.target.value))}
          className={sel}
        >
          <option value={0}>Any priority</option>
          <option value={3}>★★★ and above</option>
          <option value={4}>★★★★ and above</option>
          <option value={5}>★★★★★ only</option>
        </select>
        <span className="ml-auto text-[12px] font-bold text-ink-faint">
          {filtered.length} of {rows.length} items
        </span>
      </div>

      <div className="panel overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-ink text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-paper">
              <th className="px-3 py-2.5">No.</th>
              <th className="px-3 py-2.5">System / Unit</th>
              <th className="min-w-72 px-3 py-2.5">Source question</th>
              <th className="px-3 py-2.5">Type</th>
              <th className="px-3 py-2.5">Priority</th>
              <th className="px-3 py-2.5">Repeated</th>
              <th className="px-3 py-2.5">Requirements</th>
              <th className="px-3 py-2.5">Covered by (master topic)</th>
              <th className="px-3 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr
                key={r.id}
                className="border-t border-line-soft align-top text-[13px] odd:bg-white even:bg-[#faf7ef]"
              >
                <td className="px-3 py-2.5 font-display text-ink-faint">{i + 1}</td>
                <td className="px-3 py-2.5">
                  <span className="font-bold">{r.systemName}</span>
                  <span className="block text-[11px] text-ink-faint">
                    {r.paperName} · {r.unitLabel}
                  </span>
                </td>
                <td className="px-3 py-2.5 leading-relaxed">{r.text}</td>
                <td className="px-3 py-2.5">
                  <TypeBadge qtype={r.qtype} />
                </td>
                <td className="px-3 py-2.5">
                  <Stars n={r.stars} />
                </td>
                <td className="px-3 py-2.5 text-[12px] font-bold text-ink-soft">
                  {r.timesAsked > 1 ? `×${r.timesAsked}` : "×1"}
                </td>
                <td className="px-3 py-2.5">
                  <FlagChips q={r} />
                </td>
                <td className="px-3 py-2.5">
                  {r.topicId ? (
                    <Link
                      href={`/topics/${r.topicId}`}
                      className="link-med font-semibold"
                    >
                      {r.topicTitle}
                    </Link>
                  ) : (
                    <span className="text-ink-faint">—</span>
                  )}
                </td>
                <td className="px-3 py-2.5">
                  {r.topicId ? (
                    <span className="badge badge-teal">COMPLETE</span>
                  ) : (
                    <span className="badge badge-ink">PENDING</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-ink-faint">
                  No questions match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
