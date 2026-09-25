import Link from "next/link";
import { ilike, or } from "drizzle-orm";
import { db } from "@/db";
import { questions, topics, figures, systems, papers } from "@/db/schema";
import { TypeBadge, Stars } from "@/components/Badges";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const term = q.trim();

  type TopicRow = { id: number; title: string; systemId: number; slug: string };
  type QuestionRow = { id: number; text: string; qtype: "laq" | "sn" | "saq"; stars: number; topicId: number | null };
  type FigureRow = { id: number; slug: string; title: string };
  let tHits: TopicRow[] = [];
  let qHits: QuestionRow[] = [];
  let fHits: FigureRow[] = [];

  if (term) {
    const pattern = `%${term}%`;
    [tHits, qHits, fHits] = await Promise.all([
      db
        .select({ id: topics.id, title: topics.title, systemId: topics.systemId, slug: topics.slug })
        .from(topics)
        .where(or(ilike(topics.title, pattern), ilike(topics.body, pattern), ilike(topics.examKeywords, pattern)))
        .limit(30),
      db
        .select({ id: questions.id, text: questions.text, qtype: questions.qtype, stars: questions.stars, topicId: questions.topicId })
        .from(questions)
        .where(ilike(questions.text, pattern))
        .limit(40),
      db
        .select({ id: figures.id, slug: figures.slug, title: figures.title })
        .from(figures)
        .where(or(ilike(figures.title, pattern), ilike(figures.caption, pattern)))
        .limit(20),
    ]);
  }
  const allSystems = await db.select().from(systems);
  const allPapers = await db.select().from(papers);
  const systemById = new Map(allSystems.map((s) => [s.id, s]));
  const paperById = new Map(allPapers.map((p) => [p.id, p]));

  return (
    <div className="rise space-y-6">
      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">Full-text search</p>
        <h1 className="mt-1.5 font-display text-[30px] font-semibold">
          {term ? <>Results for “{term}”</> : "Search the master book"}
        </h1>
        <form className="mt-4 max-w-xl">
          <input
            name="q"
            defaultValue={term}
            placeholder="Try: peptidoglycan, hypnozoite, C3 convertase, metastasis, clavulanic…"
            className="w-full rounded-lg border border-line bg-white px-4 py-3 text-[14px] outline-none placeholder:text-ink-faint focus:border-teal"
          />
        </form>
      </header>

      {term && (
        <>
          <section>
            <h2 className="mb-2 font-display text-[19px] font-semibold">Master topics ({tHits.length})</h2>
            <div className="grid gap-2.5 md:grid-cols-2">
              {tHits.map((t) => {
                const sys = systemById.get(t.systemId);
                return (
                  <Link key={t.id} href={`/topics/${t.id}`} className="panel p-3.5 hover:border-teal">
                    <p className="font-display text-[15px] font-semibold">{t.title}</p>
                    <p className="mt-1 text-[11.5px] font-bold text-ink-faint">
                      {sys ? `${paperById.get(sys.paperId)?.name} · ${sys.name}` : ""}
                    </p>
                  </Link>
                );
              })}
              {tHits.length === 0 && <p className="text-[13px] text-ink-faint">No topic matches.</p>}
            </div>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[19px] font-semibold">Source questions ({qHits.length})</h2>
            <div className="panel divide-y divide-line-soft">
              {qHits.map((qr) => (
                <div key={qr.id} className="flex flex-wrap items-center gap-2.5 px-4 py-3">
                  <TypeBadge qtype={qr.qtype} />
                  <p className="flex-1 text-[13.5px]">{qr.text}</p>
                  <Stars n={qr.stars} />
                  {qr.topicId && (
                    <Link href={`/topics/${qr.topicId}`} className="text-[12px] font-bold text-teal-deep underline decoration-teal/40 underline-offset-4">
                      open chapter →
                    </Link>
                  )}
                </div>
              ))}
              {qHits.length === 0 && <p className="px-4 py-5 text-[13px] text-ink-faint">No question matches.</p>}
            </div>
          </section>

          <section>
            <h2 className="mb-2 font-display text-[19px] font-semibold">Figures ({fHits.length})</h2>
            <div className="flex flex-wrap gap-2">
              {fHits.map((f) => (
                <Link key={f.id} href="/atlas?tab=diagrams" className="panel px-3.5 py-2 text-[13px] font-bold hover:border-teal">
                  {f.title}
                </Link>
              ))}
              {fHits.length === 0 && <p className="text-[13px] text-ink-faint">No figure matches.</p>}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
