import Link from "next/link";
import { db } from "@/db";
import { questions, systems, topics } from "@/db/schema";
import { TypeBadge, Stars, FlagChips } from "@/components/Badges";
import { Reveal } from "@/components/Reveal";

export default async function SelfTestPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; system?: string }>;
}) {
  const { type = "all", system = "all" } = await searchParams;
  const [allQuestions, allSystems, allTopics] = await Promise.all([
    db.select().from(questions).orderBy(questions.sortOrder),
    db.select().from(systems).orderBy(systems.sortOrder),
    db.select().from(topics),
  ]);
  const systemById = new Map(allSystems.map((s) => [s.id, s]));
  const topicById = new Map(allTopics.map((t) => [t.id, t]));

  const filtered = allQuestions.filter((q) => {
    if (type !== "all" && q.qtype !== type) return false;
    if (system !== "all" && q.systemId !== Number(system)) return false;
    return true;
  });

  const link = (active: boolean) =>
    `rounded-md border px-3 py-1.5 text-[12px] font-bold transition-colors ${
      active ? "border-teal-deep bg-teal-deep text-paper" : "border-line bg-white text-ink-soft hover:border-teal"
    }`;

  return (
    <div className="rise space-y-6">
      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">
          Final self-test section · answers withheld until revealed
        </p>
        <h1 className="mt-1.5 font-display text-[30px] font-semibold leading-tight">Self-Test</h1>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-soft">
          Questions strictly from the supplied bank. Attempt each answer on paper first — frameworks,
          diagrams and tables count — then reveal the answer key. The key gives the points the examiner
          expects, not a model essay.
        </p>
      </header>

      <div className="panel flex flex-wrap items-center gap-2 p-3.5">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-faint">Type</span>
        {[
          ["all", `All (${allQuestions.length})`],
          ["laq", "LAQ"],
          ["sn", "SN"],
          ["saq", "SAQ"],
        ].map(([v, label]) => (
          <Link key={v} href={`?type=${v}&system=${system}`} className={link(type === v)}>
            {label}
          </Link>
        ))}
        <span className="mx-2 hidden h-5 w-px bg-line sm:block" />
        <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-faint">System</span>
        <Link href={`?type=${type}&system=all`} className={link(system === "all")}>
          All systems
        </Link>
        {allSystems.map((s) => (
          <Link key={s.id} href={`?type=${type}&system=${s.id}`} className={link(system === String(s.id))}>
            {s.name}
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((q, i) => {
          const sys = systemById.get(q.systemId);
          const topic = q.topicId ? topicById.get(q.topicId) : null;
          return (
            <div key={q.id} className="panel p-4">
              <div className="flex flex-wrap items-center gap-2">
                <TypeBadge qtype={q.qtype} />
                <Stars n={q.stars} />
                {q.timesAsked > 1 && <span className="badge badge-ink">REPEATED ×{q.timesAsked}</span>}
                <FlagChips q={q} />
                <span className="ml-auto text-[11px] font-bold text-ink-faint">
                  {sys?.name} · Q{i + 1}
                </span>
              </div>
              <p className="mt-2.5 text-[14.5px] font-semibold leading-relaxed">{q.text}</p>
              <div className="mt-3">
                <Reveal label="Show answer key">
                  <div className="rounded-lg border border-line bg-paper px-4 py-3">
                    <p className="text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-teal">
                      Answer key — expected points
                    </p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed">{q.keyPoints}</p>
                    {topic && (
                      <Link
                        href={`/topics/${topic.id}`}
                        className="mt-2 inline-block text-[12.5px] font-bold text-teal-deep underline decoration-teal/40 underline-offset-4"
                      >
                        Full chapter → {topic.title}
                      </Link>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="panel p-8 text-center text-ink-faint">No questions match this filter.</p>
        )}
      </div>
    </div>
  );
}
