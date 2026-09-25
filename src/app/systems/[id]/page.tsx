import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { systems, papers, topics, questions, progress } from "@/db/schema";
import { TypeBadge, Stars, EmphasisBadge, FlagChips } from "@/components/Badges";

export const dynamic = "force-dynamic";

export default async function SystemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const systemId = Number(id);
  if (!Number.isFinite(systemId)) notFound();

  const [sys] = await db.select().from(systems).where(eq(systems.id, systemId));
  if (!sys) notFound();

  const [paper, sysTopics, sysQuestions, doneTopicRows] = await Promise.all([
    db.select().from(papers).where(eq(papers.id, sys.paperId)).limit(1),
    db.select().from(topics).where(eq(topics.systemId, systemId)).orderBy(topics.sortOrder),
    db.select().from(questions).where(eq(questions.systemId, systemId)).orderBy(questions.sortOrder),
    db.select().from(progress).where(eq(progress.entityType, "topic")),
  ]);
  const doneTopicIds = new Set(doneTopicRows.filter((p) => p.done).map((p) => p.entityId));
  const topicById = new Map(sysTopics.map((t) => [t.id, t]));

  const grouped: Record<string, typeof sysQuestions> = {
    laq: sysQuestions.filter((q) => q.qtype === "laq"),
    sn: sysQuestions.filter((q) => q.qtype === "sn"),
    saq: sysQuestions.filter((q) => q.qtype === "saq"),
  };

  // repetition analysis
  const topicCounts = sysTopics.map((t) => ({
    topic: t,
    total: sysQuestions.filter((q) => q.topicId === t.id).length,
    types: [...new Set(sysQuestions.filter((q) => q.topicId === t.id).map((q) => q.qtype.toUpperCase()))],
    repeated: sysQuestions.filter((q) => q.topicId === t.id && q.timesAsked > 1).length,
    starred: sysQuestions.filter((q) => q.topicId === t.id && q.stars >= 4).length,
  }));

  return (
    <div className="rise space-y-8">
      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">
          {paper[0]?.name} · {sys.unitLabel}
        </p>
        <h1 className="mt-1.5 font-display text-[30px] font-semibold leading-tight">{sys.name}</h1>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-soft">{sys.intro}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="badge badge-laq">{grouped.laq.length} LAQ</span>
          <span className="badge badge-sn">{grouped.sn.length} SN</span>
          <span className="badge badge-saq">{grouped.saq.length} SAQ</span>
          <span className="badge badge-teal">{sysTopics.length} MASTER TOPICS</span>
        </div>
      </header>

      <section>
        <h2 className="mb-3 font-display text-[21px] font-semibold">Master topics of this unit</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {sysTopics.map((t) => (
            <Link
              key={t.id}
              href={`/topics/${t.id}`}
              className="panel group flex flex-col p-4 transition-colors hover:border-teal"
            >
              <div className="flex items-center justify-between gap-2">
                <EmphasisBadge emphasis={t.emphasis} />
                {doneTopicIds.has(t.id) && <span className="badge badge-teal">STUDIED</span>}
              </div>
              <p className="mt-2.5 font-display text-[16.5px] font-semibold leading-snug group-hover:text-teal-deep">
                {t.title}
              </p>
              <p className="mt-2 text-[11.5px] font-bold text-ink-faint">
                {sysQuestions.filter((q) => q.topicId === t.id).length} source questions mapped
              </p>
            </Link>
          ))}
        </div>
      </section>

      {(["laq", "sn", "saq"] as const).map((t) =>
        grouped[t].length ? (
          <section key={t}>
            <div className="mb-3 flex items-center gap-3">
              <TypeBadge qtype={t} />
              <h2 className="font-display text-[21px] font-semibold">
                {t === "laq" ? "Long Answer Questions" : t === "sn" ? "Short Notes" : "Short Answer Questions"}
              </h2>
            </div>
            <div className="panel divide-y divide-line-soft">
              {grouped[t].map((q, i) => {
                const topic = q.topicId ? topicById.get(q.topicId) : null;
                return (
                  <div key={q.id} className="flex flex-col gap-2 px-4 py-3.5 md:flex-row md:items-start md:gap-4">
                    <span className="font-display text-[15px] font-semibold text-ink-faint md:w-10">
                      Q{i + 1}.
                    </span>
                    <div className="flex-1">
                      <p className="text-[14px] leading-relaxed">{q.text}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Stars n={q.stars} />
                        {q.timesAsked > 1 && <span className="badge badge-ink">REPEATED ×{q.timesAsked}</span>}
                        <FlagChips q={q} />
                      </div>
                    </div>
                    <div className="md:w-64 md:text-right">
                      {topic ? (
                        <Link
                          href={`/topics/${topic.id}`}
                          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-3 py-1.5 text-[12px] font-bold text-teal-deep hover:border-teal"
                        >
                          Answered in master topic <span aria-hidden>→</span>
                        </Link>
                      ) : (
                        <span className="badge badge-ink">NOT YET MAPPED</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null
      )}

      <section className="panel p-5">
        <h2 className="font-display text-[19px] font-semibold">Repetition analysis (from the source only)</h2>
        <p className="mt-1 text-[12.5px] text-ink-soft">
          How often each topic appears in this unit's bank, in which question types, and how many of its
          questions are starred or repeated.
        </p>
        <div className="table-wrap mt-3">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-ink text-left text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-paper">
                <th className="px-3 py-2">Master topic</th>
                <th className="px-3 py-2">Questions mapped</th>
                <th className="px-3 py-2">Appears as</th>
                <th className="px-3 py-2">Starred (★★★★+)</th>
                <th className="px-3 py-2">Repeated formulations</th>
              </tr>
            </thead>
            <tbody>
              {topicCounts.map(({ topic, total, types, repeated, starred }) => (
                <tr key={topic.id} className="border-t border-line-odd bg-white">
                  <td className="px-3 py-2 font-semibold">{topic.title}</td>
                  <td className="px-3 py-2">{total}</td>
                  <td className="px-3 py-2">{types.join(" · ")}</td>
                  <td className="px-3 py-2">{starred}</td>
                  <td className="px-3 py-2">{repeated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
