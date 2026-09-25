import { Suspense } from "react";
import { db } from "@/db";
import { revisionDocs, figures } from "@/db/schema";
import { renderMarkdown, type FigurePayload } from "@/lib/markdown";
import { TabNav } from "@/components/TabNav";

export default async function RevisionPage({
  searchParams,
}: {
  searchParams: Promise<{ doc?: string }>;
}) {
  const { doc = "paper1" } = await searchParams;
  const [docs, allFigures] = await Promise.all([
    db.select().from(revisionDocs).orderBy(revisionDocs.sortOrder),
    db.select().from(figures).orderBy(figures.sortOrder),
  ]);

  // stable ids: paper docs get paper1, paper2 in order
  const paperDocs = docs.filter((x) => x.kind === "paper");
  const tabList = docs.map((d) => {
    const id = d.kind === "paper" ? `paper${paperDocs.indexOf(d) + 1}` : d.kind;
    return { id, label: d.title, doc: d };
  });

  const active = tabList.find((t) => t.id === doc) ?? tabList[0];
  if (!active) {
    return <div className="rise">No revision documents found. Run the seed script first.</div>;
  }

  const figuresBySlug = new Map<string, FigurePayload>();
  allFigures.forEach((f, i) =>
    figuresBySlug.set(f.slug, { slug: f.slug, title: f.title, caption: f.caption, svg: f.svg, number: i + 1 })
  );
  const { html } = renderMarkdown(active.doc.body, figuresBySlug);

  return (
    <div className="rise space-y-6">
      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">
          Multi-layer revision system
        </p>
        <h1 className="mt-1.5 font-display text-[30px] font-semibold leading-tight">Revision Masters</h1>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-soft">
          Paper-end revision masters (LAQ / SN / SAQ master lists), the Last 24-Hour Revision built from
          every topic's one-minute layer, and the 7-day plan that sequences the entire supplied bank.
        </p>
      </header>

      <Suspense fallback={null}>
        <TabNav param="doc" tabs={tabList.map(({ id, label }) => ({ id, label }))} active={active.id} />
      </Suspense>

      <article className="panel p-6 lg:p-8">
        <h2 className="font-display text-[24px] font-semibold">{active.doc.title}</h2>
        <div className="md-content mt-4" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}
