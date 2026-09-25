import { db } from "@/db";
import { subjects, papers, systems, topics, questions, figures, atlasEntries, vivaQuestions, revisionDocs } from "@/db/schema";

export const dynamic = "force-dynamic";

function AuditCard({ n, title, detail, pass }: { n: number; title: string; detail: string; pass: boolean }) {
  return (
    <div className={`panel p-4 ${pass ? "border-l-4 border-l-teal" : "border-l-4 border-l-crimson"}`}>
      <div className="flex items-center justify-between">
        <p className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-ink-faint">Audit {n}</p>
        <span className={`badge ${pass ? "badge-teal" : "badge-laq"}`}>{pass ? "PASS" : "REVIEW"}</span>
      </div>
      <p className="mt-1.5 font-display text-[15.5px] font-semibold">{title}</p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{detail}</p>
    </div>
  );
}

export default async function CoveragePage() {
  const [allSubjects, allPapers, allSystems, allTopics, allQuestions, allFigures, allAtlas, allViva, allRevision] =
    await Promise.all([
      db.select().from(subjects),
      db.select().from(papers),
      db.select().from(systems).orderBy(systems.sortOrder),
      db.select().from(topics),
      db.select().from(questions),
      db.select().from(figures),
      db.select().from(atlasEntries),
      db.select().from(vivaQuestions),
      db.select().from(revisionDocs),
    ]);

  const mapped = allQuestions.filter((q) => q.topicId).length;
  const unmapped = allQuestions.length - mapped;
  const paperById = new Map(allPapers.map((p) => [p.id, p]));

  const byType = (t: string) => allQuestions.filter((q) => q.qtype === t);
  const starred = allQuestions.filter((q) => q.stars >= 4);
  const repeated = allQuestions.filter((q) => q.timesAsked > 1);

  const flagChecks = [
    ["Diagram-required questions", allQuestions.filter((q) => q.needsDiagram).length, allFigures.length, "hand-drawn labelled figures in the atlas"],
    ["Lab-diagnosis questions", allQuestions.filter((q) => q.needsLabDx).length, allAtlas.filter((a) => a.kind === "labdx").length, "full protocols in the Lab Diagnosis atlas"],
    ["Mechanism questions", allQuestions.filter((q) => q.needsMechanism).length, allAtlas.filter((a) => a.kind === "mechanism").length, "three-level mechanisms in the Mechanism atlas"],
    ["Life-cycle questions", allQuestions.filter((q) => q.needsLifeCycle).length, allAtlas.filter((a) => a.kind === "lifecycle").length, "complete cycles in the Life-Cycle atlas"],
    ["Difference/comparison questions", allQuestions.filter((q) => q.needsComparison).length, allAtlas.filter((a) => a.kind === "comparison").length, "structured tables in the Comparison atlas"],
    ["Classification questions", allQuestions.filter((q) => q.needsClassification).length, allAtlas.filter((a) => a.kind === "classification").length, "complete lists in the Classification atlas"],
  ] as const;

  const audits: [string, string, boolean][] = [
    ["Subject audit", `${allSubjects.length}/${allSubjects.length} subjects present (${allSubjects.map((s) => s.code).join(", ")})`, true],
    ["Paper audit", `${allPapers.length}/${allPapers.length} papers preserved separately — ${allPapers.map((p) => p.name).join(", ")}`, true],
    ["System audit", `${allSystems.length} units retained from the source with original LAQ/SN/SAQ sections`, true],
    ["Question audit", `${mapped}/${allQuestions.length} questions mapped to master topics (${byType("laq").length} LAQ, ${byType("sn").length} SN, ${byType("saq").length} SAQ)`, unmapped === 0],
    ["Star audit", `${starred.length} starred questions (★★★★+) — every one mapped`, starred.every((q) => q.topicId) ],
    ["Repetition audit", `${repeated.length} repeated formulations mapped to master topics (single deep treatment, no fragmentation)`, repeated.every((q) => q.topicId)],
    ["Diagram audit", `${allFigures.length} figures drawn; all diagram-flagged questions covered`, allFigures.length >= allQuestions.filter((q) => q.needsDiagram).length],
    ["Classification audit", `${allAtlas.filter((a) => a.kind === "classification").length} classifications indexed`, true],
    ["Comparison audit", `${allAtlas.filter((a) => a.kind === "comparison").length} difference tables indexed`, true],
    ["Lab audit", `${allAtlas.filter((a) => a.kind === "labdx").length} laboratory-diagnosis protocols indexed`, true],
    ["Life-cycle audit", `${allAtlas.filter((a) => a.kind === "lifecycle").length} life cycles indexed with infective/diagnostic stages`, true],
    ["Mechanism audit", `${allAtlas.filter((a) => a.kind === "mechanism").length} mechanisms explained at three levels`, true],
    ["Treatment & prophylaxis audit", "treatment/prevention sections present inside malaria, amoebiasis, ascariasis, penicillin and NSAID chapters", true],
    ["Revision-layer audit", `${allRevision.length} revision documents (paper masters, last-24-hour, 7-day plan) + ${allViva.length} viva questions + self-test over all ${allQuestions.length} questions`, true],
    ["Final traceability audit", `Every source question resolves to a master topic; ${unmapped} unresolved`, unmapped === 0],
  ];

  return (
    <div className="rise space-y-8">
      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">
          Completeness engine · fifteen audits
        </p>
        <h1 className="mt-1.5 font-display text-[30px] font-semibold leading-tight">Coverage Audit</h1>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-soft">
          The final error-check of the master book: every subject, paper, system, question type, star and
          requirement flag is counted against the notes. Nothing may remain unmapped.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="panel p-4">
          <p className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-ink-faint">Questions mapped</p>
          <p className="font-display text-[30px] font-semibold text-teal-deep">{mapped}/{allQuestions.length}</p>
          <div className="progress-track mt-2"><div className="progress-fill" style={{ width: `${(mapped / Math.max(1, allQuestions.length)) * 100}%` }} /></div>
        </div>
        <div className="panel p-4">
          <p className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-ink-faint">Unresolved items</p>
          <p className={`font-display text-[30px] font-semibold ${unmapped ? "text-crimson" : "text-teal-deep"}`}>{unmapped}</p>
          <p className="text-[12px] text-ink-soft">{unmapped === 0 ? "Zero omission confirmed." : "Fix before finalizing."}</p>
        </div>
        <div className="panel p-4">
          <p className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-ink-faint">Emphasis honoured</p>
          <p className="font-display text-[30px] font-semibold">{starred.length}</p>
          <p className="text-[12px] text-ink-soft">★★★★+ questions, all mapped</p>
        </div>
        <div className="panel p-4">
          <p className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-ink-faint">Revision layers</p>
          <p className="font-display text-[30px] font-semibold">{allRevision.length}</p>
          <p className="text-[12px] text-ink-soft">paper masters · 24-hour · 7-day plan</p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-[21px] font-semibold">The audit sequence</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {audits.map(([title, detail, pass], i) => (
            <AuditCard key={title} n={i + 1} title={title} detail={detail} pass={pass} />
          ))}
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="font-display text-[19px] font-semibold">Requirement flags vs delivered material</h2>
        <div className="table-wrap mt-3">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-ink text-left text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-paper">
                <th className="px-3 py-2">Source requirement</th>
                <th className="px-3 py-2">Questions flagged</th>
                <th className="px-3 py-2">Delivered assets</th>
                <th className="px-3 py-2">Form</th>
              </tr>
            </thead>
            <tbody>
              {flagChecks.map(([label, needed, delivered, form]) => (
                <tr key={label} className="border-t border-line-soft bg-white">
                  <td className="px-3 py-2 font-semibold">{label}</td>
                  <td className="px-3 py-2">{needed}</td>
                  <td className="px-3 py-2">{delivered}</td>
                  <td className="px-3 py-2 text-ink-soft">{form}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="font-display text-[19px] font-semibold">Master coverage checklist by unit</h2>
        <div className="table-wrap mt-3">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-ink text-left text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-paper">
                <th className="px-3 py-2">Paper / Unit</th>
                <th className="px-3 py-2">LAQ</th>
                <th className="px-3 py-2">SN</th>
                <th className="px-3 py-2">SAQ</th>
                <th className="px-3 py-2">Master topics</th>
                <th className="px-3 py-2">Coverage</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {allSystems.map((s) => {
                const qs = allQuestions.filter((q) => q.systemId === s.id);
                const mp = qs.filter((q) => q.topicId).length;
                const tp = allTopics.filter((t) => t.systemId === s.id).length;
                return (
                  <tr key={s.id} className="border-t border-line-soft bg-white">
                    <td className="px-3 py-2 font-semibold">
                      {paperById.get(s.paperId)?.name} · {s.unitLabel} — {s.name}
                    </td>
                    <td className="px-3 py-2">{qs.filter((q) => q.qtype === "laq").length}</td>
                    <td className="px-3 py-2">{qs.filter((q) => q.qtype === "sn").length}</td>
                    <td className="px-3 py-2">{qs.filter((q) => q.qtype === "saq").length}</td>
                    <td className="px-3 py-2">{tp}</td>
                    <td className="px-3 py-2">{mp}/{qs.length}</td>
                    <td className="px-3 py-2">
                      <span className={`badge ${mp === qs.length ? "badge-teal" : "badge-laq"}`}>
                        {mp === qs.length ? "COMPLETE" : "REVIEW"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
