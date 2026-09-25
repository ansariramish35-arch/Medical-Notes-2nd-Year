import { SourceIndex, type SourceRow } from "@/components/SourceIndex";
import { sourceRows } from "@/lib/static-data";

export default function SourcePage() {
  const rows: SourceRow[] = sourceRows;
  const mapped = rows.filter((r) => r.topicId).length;

  return (
    <div className="rise space-y-5">
      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">Source question-bank index · zero omission</p>
        <h1 className="mt-1.5 font-display text-[30px] font-semibold leading-tight">Master Source Index</h1>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-soft">
          The complete inventory of every question in the supplied bank — subject, paper, system, type,
          source priority (stars), repetition and requirement flags. Every row maps to the master topic
          that answers it: <strong className="text-teal-deep">{mapped} of {rows.length} items covered</strong>.
        </p>
      </header>
      <SourceIndex rows={rows} />
    </div>
  );
}
