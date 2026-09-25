import Link from "next/link";
import { notFound } from "next/navigation";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { topics, systems, papers, questions, figures, progress } from "@/db/schema";
import { renderMarkdown, type FigurePayload } from "@/lib/markdown";
import { EmphasisBadge, TypeBadge, Stars } from "@/components/Badges";
import { ProgressToggle } from "@/components/ProgressToggle";

export function generateStaticParams() {
  return topics.map((item) => ({ id: String(item.id) }));
}

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topicId = Number(id);
  if (!Number.isFinite(topicId)) notFound();

  const [topic] = await db.select().from(topics).where(eq(topics.id, topicId));
  if (!topic) notFound();

  const [systemRows, allFigures, mappedQuestions, progressRows, siblings] = await Promise.all([
    db.select().from(systems).where(eq(systems.id, topic.systemId)).limit(1),
    db.select().from(figures).orderBy(figures.sortOrder),
    db.select().from(questions).where(eq(questions.topicId, topicId)).orderBy(questions.sortOrder),
    db
      .select()
      .from(progress)
      .where(and(eq(progress.entityType, "topic"), eq(progress.entityId, topicId))),
    db.select().from(topics).where(eq(topics.systemId, topic.systemId)).orderBy(topics.sortOrder),
  ]);
  const system = systemRows[0];
  if (!system) notFound();
  const paper = (await db.select().from(papers).where(eq(papers.id, system.paperId)))[0];

  const figuresBySlug = new Map<string, FigurePayload>();
  allFigures.forEach((f, i) =>
    figuresBySlug.set(f.slug, { slug: f.slug, title: f.title, caption: f.caption, svg: f.svg, number: i + 1 })
  );

  const { html, toc } = renderMarkdown(topic.body, figuresBySlug);
  const done = progressRows[0]?.done ?? false;

  const idx = siblings.findIndex((t) => t.id === topicId);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  return (
    <div className="rise">
      <nav className="mb-5 flex flex-wrap items-center gap-2 text-[12px] font-bold text-ink-faint">
        <Link href="/" className="hover:text-teal-deep">Console</Link>
        <span aria-hidden>/</span>
        <span>{paper?.name}</span>
        <span aria-hidden>/</span>
        <Link href={`/systems/${system.id}`} className="hover:text-teal-deep">
          {system.unitLabel} · {system.name}
        </Link>
      </nav>

      <header className="mb-6 border-b-2 border-ink pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <EmphasisBadge emphasis={topic.emphasis} />
          <span className="badge badge-teal">MASTER TOPIC</span>
          <span className="badge badge-ink">
            {mappedQuestions.length} SOURCE QUESTION{mappedQuestions.length === 1 ? "" : "S"} MAPPED
          </span>
        </div>
        <h1 className="mt-3 font-display text-[30px] font-semibold leading-[1.15] lg:text-[36px]">
          {topic.title}
        </h1>
        <div className="mt-4">
          <ProgressToggle entityType="topic" entityId={topic.id} initialDone={done} />
        </div>
      </header>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_230px]">
        <article>
          <div className="md-content" dangerouslySetInnerHTML={{ __html: html }} />

          {/* Layer 4 — one-minute revision */}
          <section className="mt-10">
            <h2 className="font-display text-[24px] font-semibold" style={{ borderBottom: "2px solid var(--color-ink)", paddingBottom: 8 }}>
              Layer 4 — One-Minute Revision
            </h2>
            <div className="callout callout-highyield mt-4">
              <div className="callout-head">
                <span className="callout-badge">Rapid recall</span>
              </div>
              <div className="callout-body">
                {topic.oneMinute.split("\n").filter(Boolean).map((line, i) => (
                  <p key={i} className="my-1.5 leading-relaxed">
                    <strong className="text-amber">▪</strong> {line.replace(/^-\s*/, "")}
                  </p>
                ))}
              </div>
            </div>
            <div className="callout callout-exam mt-3">
              <div className="callout-head">
                <span className="callout-badge">Must-use exam keywords</span>
              </div>
              <div className="callout-body">
                <p className="my-2">{topic.examKeywords}</p>
              </div>
            </div>
          </section>

          {/* Source questions covered */}
          <section className="mt-10">
            <h2 className="font-display text-[24px] font-semibold" style={{ borderBottom: "2px solid var(--color-ink)", paddingBottom: 8 }}>
              Source Questions Covered
            </h2>
            <p className="mt-2 text-[13px] text-ink-soft">
              Question-to-note traceability: every formulation below is answered by this master topic.
            </p>
            <div className="table-wrap mt-3">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-ink text-left text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-paper">
                    <th className="px-3 py-2">Source question</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Priority</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mappedQuestions.map((q) => (
                    <tr key={q.id} className="border-t border-line-soft bg-white">
                      <td className="px-3 py-2.5 leading-relaxed">{q.text}</td>
                      <td className="px-3 py-2.5"><TypeBadge qtype={q.qtype} /></td>
                      <td className="px-3 py-2.5"><Stars n={q.stars} /></td>
                      <td className="px-3 py-2.5"><span className="badge badge-teal">COMPLETE</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <nav className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
            {prev ? (
              <Link href={`/topics/${prev.id}`} className="panel max-w-sm p-3.5 hover:border-teal">
                <span className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-ink-faint">← Previous topic</span>
                <span className="mt-1 block font-display text-[14px] font-semibold">{prev.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/topics/${next.id}`} className="panel max-w-sm p-3.5 text-right hover:border-teal">
                <span className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-ink-faint">Next topic →</span>
                <span className="mt-1 block font-display text-[14px] font-semibold">{next.title}</span>
              </Link>
            )}
          </nav>
        </article>

        <aside className="hidden xl:block">
          <div className="sticky top-8 space-y-4">
            <div className="panel p-4">
              <p className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-ink-faint">
                In this chapter
              </p>
              <div className="toc-list mt-2">
                {toc.map((t) => (
                  <a key={t.id} href={`#${t.id}`}>
                    {t.text}
                  </a>
                ))}
              </div>
            </div>
            <div className="panel p-4 text-[12px] leading-relaxed text-ink-soft">
              <p className="font-bold text-ink">How to use this chapter</p>
              <p className="mt-1.5">
                Read the full notes once → recite the one-minute revision → cover the source questions
                from the table below and reproduce each answer framework.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
