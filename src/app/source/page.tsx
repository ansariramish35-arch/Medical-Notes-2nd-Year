import { db } from "@/db";
import { questions, systems, papers, topics } from "@/db/schema";
import { SourceIndex, type SourceRow } from "@/components/SourceIndex";

export const dynamic = "force-dynamic";

export default async function SourcePage() {
  const [allQuestions, allSystems, allPapers, allTopics] = await Promise.all([
    db.select().from(questions).orderBy(questions.sortOrder),
    db.select().from(systems),
    db.select().from(papers),
    db.select().from(topics),
  ]);
  const systemById = new Map(allSystems.map((s) => [s.id, s]));
  const paperById = new Map(allPapers.map((p) => [p.id, p]));
  const topicById = new Map(allTopics.map((t) => [t.id, t]));

  const rows: SourceRow[] = allQuestions.map((q) => {
    const sys = systemById.get(q.systemId);
    return {
      id: q.id,
      qtype: q.qtype,
      text: q.text,
      stars: q.stars,
      timesAsked: q.timesAsked,
      paperName: sys ? paperById.get(sys.paperId)?.name ?? "" : "",
      systemName: sys?.name ?? "",
      unitLabel: sys?.unitLabel ?? "",
      topicTitle: q.topicId ? topicById.get(q.topicId)?.title ?? null : null,
      topicId: q.topicId,
      needsDiagram: q.needsDiagram,
      needsLabDx: q.needsLabDx,
      needsMechanism: q.needsMechanism,
      needsLifeCycle: q.needsLifeCycle,
      needsComparison: q.needsComparison,
      needsClassification: q.needsClassification,
    };
  });

  const mapped = rows.filter((r) => r.topicId).length;

  return (
    <div className="rise space-y-5">
      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">
          Source question-bank index · zero omission
        </p>
        <h1 className="mt-1.5 font-display text-[30px] font-semibold leading-tight">
          Master Source Index
        </h1>
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
