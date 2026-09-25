export function TypeBadge({ qtype }: { qtype: string }) {
  const cls = qtype === "laq" ? "badge-laq" : qtype === "sn" ? "badge-sn" : "badge-saq";
  return <span className={`badge ${cls}`}>{qtype.toUpperCase()}</span>;
}

export function Stars({ n }: { n: number }) {
  if (n <= 0) return <span className="text-xs text-ink-faint">—</span>;
  return (
    <span className="stars" title={`Source priority ${n}/5`}>
      {"★".repeat(n)}
      <span className="text-line">{"★".repeat(Math.max(0, 5 - n))}</span>
    </span>
  );
}

export function EmphasisBadge({ emphasis }: { emphasis: string }) {
  const map: Record<string, [string, string]> = {
    "ultra-high": ["badge-laq", "ULTRA-HIGH"],
    "very-high": ["badge-plum", "VERY HIGH"],
    high: ["badge-sn", "HIGH"],
    standard: ["badge-ink", "STANDARD"],
  };
  const [cls, label] = map[emphasis] ?? map.standard;
  return <span className={`badge ${cls}`}>{label}</span>;
}

export function FlagChips({ q }: { q: {
  needsDiagram?: boolean;
  needsLabDx?: boolean;
  needsMechanism?: boolean;
  needsLifeCycle?: boolean;
  needsComparison?: boolean;
  needsClassification?: boolean;
} }) {
  const chips: string[] = [];
  if (q.needsDiagram) chips.push("DIAGRAM");
  if (q.needsLabDx) chips.push("LAB DX");
  if (q.needsMechanism) chips.push("MECHANISM");
  if (q.needsLifeCycle) chips.push("LIFE CYCLE");
  if (q.needsComparison) chips.push("DIFFERENCE");
  if (q.needsClassification) chips.push("CLASSIFY");
  if (!chips.length) return null;
  return (
    <span className="inline-flex flex-wrap gap-1">
      {chips.map((c) => (
        <span key={c} className="chip">
          {c}
        </span>
      ))}
    </span>
  );
}
