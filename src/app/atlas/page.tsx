import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/db";
import { figures, atlasEntries, topics, systems } from "@/db/schema";
import { TabNav } from "@/components/TabNav";

const TABS = [
  { id: "diagrams", label: "Master Diagram Atlas" },
  { id: "classification", label: "Classifications" },
  { id: "comparison", label: "Comparisons" },
  { id: "labdx", label: "Lab Diagnosis" },
  { id: "lifecycle", label: "Life Cycles" },
  { id: "mechanism", label: "Mechanisms" },
];

export default async function AtlasPage() {
  const tab = "diagrams";
  const [allFigures, allEntries, allTopics, allSystems] = await Promise.all([
    db.select().from(figures).orderBy(figures.sortOrder),
    db.select().from(atlasEntries),
    db.select().from(topics),
    db.select().from(systems),
  ]);
  const topicById = new Map(allTopics.map((t) => [t.id, t]));
  const systemById = new Map(allSystems.map((s) => [s.id, s]));

  const counts: Record<string, number> = {
    diagrams: allFigures.length,
    classification: allEntries.filter((e) => e.kind === "classification").length,
    comparison: allEntries.filter((e) => e.kind === "comparison").length,
    labdx: allEntries.filter((e) => e.kind === "labdx").length,
    lifecycle: allEntries.filter((e) => e.kind === "lifecycle").length,
    mechanism: allEntries.filter((e) => e.kind === "mechanism").length,
  };

  const entries = allEntries.filter((e) => e.kind === tab);

  return (
    <div className="rise space-y-6">
      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">
          End-of-book atlas layers
        </p>
        <h1 className="mt-1.5 font-display text-[30px] font-semibold leading-tight">Master Atlases</h1>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-soft">
          Every figure, classification, comparison, laboratory protocol, life cycle and mechanism in the
          book — indexed in one place for final-revision redraws and cross-checks.
        </p>
      </header>

      <Suspense fallback={null}>
        <TabNav
          tabs={TABS.map((t) => ({ ...t, count: counts[t.id] }))}
          active={counts[tab] === undefined ? "diagrams" : tab}
        />
      </Suspense>

      {tab === "diagrams" || counts[tab] === undefined ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {allFigures.map((f, i) => {
            const sys = f.systemId ? systemById.get(f.systemId) : null;
            return (
              <figure key={f.id} className="figure-card">
                <div className="figure-svg" dangerouslySetInnerHTML={{ __html: f.svg }} />
                <figcaption>
                  <span className="figure-tag">FIGURE {i + 1} {sys ? `· ${sys.name}` : ""}</span>
                  <span className="figure-title">{f.title}</span>
                  <p className="figure-caption">{f.caption}</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-md border border-line bg-white p-2.5">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-crimson">
                        Must-label structures
                      </p>
                      <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">{f.labels}</p>
                    </div>
                    <div className="rounded-md border border-line bg-white p-2.5">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-teal">
                        Exam drawing sequence
                      </p>
                      <p className="mt-1 whitespace-pre-line text-[11.5px] leading-relaxed text-ink-soft">
                        {f.drawingSteps}
                      </p>
                    </div>
                  </div>
                  {f.examTip && (
                    <p className="mt-2 rounded-md bg-amber-wash px-2.5 py-1.5 text-[11.5px] font-semibold text-amber">
                      Examiner note: {f.examTip}
                    </p>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {entries.map((e) => {
            const topic = e.topicId ? topicById.get(e.topicId) : null;
            return (
              <div key={e.id} className="panel p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-[16px] font-semibold leading-snug">{e.title}</h3>
                  {e.important && <span className="badge badge-laq">SOURCE REPEATED</span>}
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{e.summary}</p>
                {topic && (
                  <Link
                    href={`/topics/${topic.id}`}
                    className="mt-2.5 inline-block text-[12.5px] font-bold text-teal-deep underline decoration-teal/40 underline-offset-4 hover:decoration-teal"
                  >
                    Full treatment → {topic.title}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
