import Link from "next/link";
import { questions, systems, topics } from "@/lib/static-data";
import { TypeBadge, Stars, FlagChips } from "@/components/Badges";
import { Reveal } from "@/components/Reveal";

export default function SelfTestPage() {
  const allQuestions = questions;
  const allSystems = systems.slice().sort((a,b)=>a.sortOrder-b.sortOrder);
  const allTopics = topics;
  const systemById = new Map(allSystems.map((s)=>[s.id,s]));
  const topicById = new Map(allTopics.map((t)=>[t.id,t]));
  return (
    <div className="rise space-y-6">
      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">Final self-test section · answers withheld until revealed</p>
        <h1 className="mt-1.5 font-display text-[30px] font-semibold leading-tight">Self-Test</h1>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-soft">Questions strictly from the supplied bank. Attempt each answer first, then reveal the answer key. Filters are intentionally omitted in static mode; use the source index for client-side filtering.</p>
      </header>
      <div className="space-y-3">
        {allQuestions.map((q,i)=>{
          const sys=systemById.get(q.systemId);
          const topic=q.topicId?topicById.get(q.topicId):null;
          return <div key={q.id} className="panel p-4">
            <div className="flex flex-wrap items-center gap-2"><TypeBadge qtype={q.qtype}/><Stars n={q.stars}/>{q.timesAsked>1&&<span className="badge badge-ink">REPEATED ×{q.timesAsked}</span>}<FlagChips q={q}/><span className="ml-auto text-[11px] font-bold text-ink-faint">{sys?.name} · Q{i+1}</span></div>
            <p className="mt-2.5 text-[14.5px] font-semibold leading-relaxed">{q.text}</p>
            <div className="mt-3"><Reveal label="Show answer key"><div className="rounded-lg border border-line bg-paper px-4 py-3"><p className="text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-teal">Answer key — expected points</p><p className="mt-1.5 text-[13.5px] leading-relaxed">{q.keyPoints}</p>{topic&&<Link href={"/topics/"+topic.id} className="mt-2 inline-block text-[12.5px] font-bold text-teal-deep underline decoration-teal/40 underline-offset-4">Full chapter → {topic.title}</Link>}</div></Reveal></div>
          </div>;
        })}
      </div>
    </div>
  );
}