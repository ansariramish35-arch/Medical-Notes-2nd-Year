import Link from "next/link";
import { eq, sql, and } from "drizzle-orm";
import { db } from "@/db";
import {
  subjects,
  papers,
  systems,
  topics,
  questions,
  figures,
  progress,
} from "@/db/schema";
import { EmphasisBadge, TypeBadge } from "@/components/Badges";

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="panel px-4 py-3.5">
      <p className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-ink-faint">{label}</p>
      <p className="font-display text-[26px] font-semibold leading-tight">{value}</p>
      {sub && <p className="text-[11.5px] font-semibold text-ink-soft">{sub}</p>}
    </div>
  );
}

export default async function Home() {
  const [
    allSubjects,
    allPapers,
    allSystems,
    allTopics,
    allQuestions,
    allFigures,
    doneTopics,
    doneQuestions,
  ] = await Promise.all([
    db.select().from(subjects),
    db.select().from(papers).orderBy(papers.sortOrder),
    db.select().from(systems).orderBy(systems.sortOrder),
    db.select().from(topics).orderBy(topics.sortOrder),
    db.select().from(questions),
    db.select().from(figures),
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(progress)
      .where(and(eq(progress.entityType, "topic"), eq(progress.done, true))),
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(progress)
      .where(and(eq(progress.entityType, "question"), eq(progress.done, true))),
  ]);

  const laqs = allQuestions.filter((q) => q.qtype === "laq").length;
  const sns = allQuestions.filter((q) => q.qtype === "sn").length;
  const saqs = allQuestions.filter((q) => q.qtype === "saq").length;
  const mapped = allQuestions.filter((q) => q.topicId).length;
  const coverage = allQuestions.length
    ? Math.round((mapped / allQuestions.length) * 100)
    : 0;
  const topicProgress = allTopics.length
    ? Math.round(((doneTopics[0]?.n ?? 0) / allTopics.length) * 100)
    : 0;

  const emphasisPriority = ["ultra-high", "very-high"];
  const hotTopics = allTopics
    .filter((t) => emphasisPriority.includes(t.emphasis))
    .sort((a, b) => emphasisPriority.indexOf(a.emphasis) - emphasisPriority.indexOf(b.emphasis));
  const topicById = new Map(allTopics.map((t) => [t.id, t]));
  const systemById = new Map(allSystems.map((s) => [s.id, s]));
  const paperById = new Map(allPapers.map((p) => [p.id, p]));

  const flagged = {
    diagram: allQuestions.filter((q) => q.needsDiagram).length,
    labdx: allQuestions.filter((q) => q.needsLabDx).length,
    mechanism: allQuestions.filter((q) => q.needsMechanism).length,
    lifecycle: allQuestions.filter((q) => q.needsLifeCycle).length,
    comparison: allQuestions.filter((q) => q.needsComparison).length,
  };

  return (
    <div className="rise space-y-8">
      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">
          Complete University Master Notes · {allSubjects.map((s) => s.code).join(" + ")}
        </p>
        <h1 className="mt-2 font-display text-[34px] font-semibold leading-[1.12] lg:text-[40px]">
          The entire supplied question bank —<br />
          rewritten as a master textbook.
        </h1>
        <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-ink-soft">
          Every LAQ, SN and SAQ from the source is preserved in the{" "}
          <Link href="/source" className="link-med font-semibold">
            Master Source Index
          </Link>
          , answered inside a master topic, and cross-linked to the{" "}
          <Link href="/atlas" className="link-med font-semibold">
            diagram, classification, comparison, lab-diagnosis, life-cycle and mechanism atlases
          </Link>
          . Depth first — no page limit, zero omission.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <Stat label="Source questions" value={allQuestions.length} sub={`${laqs} LAQ · ${sns} SN · ${saqs} SAQ`} />
        <Stat label="Master topics" value={allTopics.length} sub="multi-layer, all mapped" />
        <Stat label="Figures" value={allFigures.length} sub="labelled, exam-drawable" />
        <Stat label="Systems / units" value={allSystems.length} sub={`${allPapers.length} papers · ${allSubjects.length} subjects`} />
        <Stat label="Source coverage" value={`${coverage}%`} sub={`${mapped}/${allQuestions.length} questions mapped`} />
        <Stat label="Study progress" value={`${topicProgress}%`} sub={`${doneTopics[0]?.n ?? 0}/${allTopics.length} topics · ${doneQuestions[0]?.n ?? 0}/${allQuestions.length} questions`} />
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="space-y-4">
          <h2 className="font-display text-[22px] font-semibold">Papers, systems and units</h2>
          {allPapers.map((paper) => {
            const paperSystems = allSystems.filter((s) => s.paperId === paper.id);
            return (
              <div key={paper.id} className="panel p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-[19px] font-semibold">{paper.name}</h3>
                  <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink-faint">
                    {paper.scope}
                  </span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {paperSystems.map((sys) => {
                    const sysTopics = allTopics.filter((t) => t.systemId === sys.id);
                    const sysQs = allQuestions.filter((q) => q.systemId === sys.id);
                    return (
                      <Link
                        key={sys.id}
                        href={`/systems/${sys.id}`}
                        className="group rounded-lg border border-line bg-white p-4 transition-colors hover:border-teal"
                      >
                        <p className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-crimson">
                          {sys.unitLabel}
                        </p>
                        <p className="font-display text-[16.5px] font-semibold group-hover:text-teal-deep">
                          {sys.name}
                        </p>
                        <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{sys.intro}</p>
                        <p className="mt-2.5 text-[11.5px] font-bold text-ink-faint">
                          {sysQs.filter((q) => q.qtype === "laq").length} LAQ ·{" "}
                          {sysQs.filter((q) => q.qtype === "sn").length} SN ·{" "}
                          {sysQs.filter((q) => q.qtype === "saq").length} SAQ · {sysTopics.length} master topics
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="panel p-5">
            <h2 className="font-display text-[19px] font-semibold">Requirement flags across the bank</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[
                ["Diagram required", flagged.diagram],
                ["Lab diagnosis", flagged.labdx],
                ["Mechanism", flagged.mechanism],
                ["Life cycle", flagged.lifecycle],
                ["Difference table", flagged.comparison],
              ].map(([label, n]) => (
                <div key={label as string} className="rounded-lg border border-line bg-white px-3 py-2.5 text-center">
                  <p className="font-display text-[22px] font-semibold text-teal-deep">{n}</p>
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-ink-faint">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12px] text-ink-soft">
              Every flagged item is answered in-kind: diagrams drawn, lab protocols written out, mechanisms in
              three levels, differences as tables. See the <Link href="/coverage" className="link-med font-semibold">Coverage Audit</Link>.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="panel p-5">
            <h2 className="font-display text-[19px] font-semibold">Ultra-priority master topics</h2>
            <p className="mt-1 text-[12px] text-ink-soft">
              Ranked by source stars and repetition only.
            </p>
            <ul className="mt-3 space-y-2.5">
              {hotTopics.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/topics/${t.id}`}
                    className="block rounded-lg border border-line bg-white p-3 transition-colors hover:border-teal"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-display text-[14.5px] font-semibold leading-snug">{t.title}</span>
                      <EmphasisBadge emphasis={t.emphasis} />
                    </div>
                    <p className="mt-1 text-[11px] font-bold text-ink-faint">
                      {paperById.get(systemById.get(t.systemId)?.paperId ?? 0)?.name} ·{" "}
                      {systemById.get(t.systemId)?.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-5">
            <h2 className="font-display text-[19px] font-semibold">Jump into the system</h2>
            <div className="mt-3 space-y-2">
              {[
                ["/source", "Master Source Index", "the complete question-by-question inventory"],
                ["/atlas?tab=diagrams", "Master Diagram Atlas", "every labelled figure with drawing sequence"],
                ["/revision?doc=last24", "Last 24-Hour Revision", "one-minute core of every topic"],
                ["/revision?doc=plan", "7-Day Study Plan", "day-by-day sequence over the whole bank"],
                ["/selftest", "Self-Test", "questions first, answer key behind a reveal"],
                ["/viva", "Viva Guide", "rapid oral questions with precise answers"],
              ].map(([href, title, sub]) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between rounded-lg border border-line bg-white px-3.5 py-2.5 text-[13px] font-bold transition-colors hover:border-teal hover:text-teal-deep"
                >
                  <span>
                    {title}
                    <span className="block text-[11px] font-semibold text-ink-faint">{sub}</span>
                  </span>
                  <span aria-hidden>→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="panel border-l-4 border-l-crimson p-5">
            <h2 className="font-display text-[17px] font-semibold">Question-type distribution</h2>
            <div className="mt-3 space-y-2 text-[12.5px]">
              {[
                ["laq", laqs],
                ["sn", sns],
                ["saq", saqs],
              ].map(([t, n]) => (
                <div key={t as string} className="flex items-center gap-3">
                  <TypeBadge qtype={t as string} />
                  <div className="progress-track flex-1">
                    <div
                      className="progress-fill"
                      style={{ width: `${(Number(n) / Math.max(1, allQuestions.length)) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-bold">{n}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
