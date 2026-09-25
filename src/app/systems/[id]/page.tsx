import Link from "next/link";
import { notFound } from "next/navigation";
import { systems, papers, topics, questions } from "@/lib/static-data";
import { TypeBadge, Stars, EmphasisBadge, FlagChips } from "@/components/Badges";

export function generateStaticParams(){ return systems.map((s)=>({id:String(s.id)})); }
export const dynamicParams=false;

export default async function SystemPage({params}:{params:Promise<{id:string}>}){
  const { id } = await params;
  const systemId=Number(id);
  if(!Number.isFinite(systemId)) notFound();
  const sys=systems.find((s)=>s.id===systemId);
  if(!sys) notFound();
  const paper=papers.find((p)=>p.id===sys.paperId);
  const sysTopics=topics.filter((t)=>t.systemId===systemId).sort((a,b)=>a.sortOrder-b.sortOrder);
  const sysQuestions=questions.filter((q)=>q.systemId===systemId).sort((a,b)=>a.sortOrder-b.sortOrder);
  const topicById=new Map(sysTopics.map((t)=>[t.id,t]));
  const grouped={laq:sysQuestions.filter(q=>q.qtype==="laq"),sn:sysQuestions.filter(q=>q.qtype==="sn"),saq:sysQuestions.filter(q=>q.qtype==="saq")};
  return <div className="rise space-y-8"><header><p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">{paper?.name} · {sys.unitLabel}</p><h1 className="mt-1.5 font-display text-[30px] font-semibold leading-tight">{sys.name}</h1><p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-soft">{sys.intro}</p><div className="mt-3 flex flex-wrap gap-2"><span className="badge badge-laq">{grouped.laq.length} LAQ</span><span className="badge badge-sn">{grouped.sn.length} SN</span><span className="badge badge-saq">{grouped.saq.length} SAQ</span><span className="badge badge-teal">{sysTopics.length} MASTER TOPICS</span></div></header><section><h2 className="mb-3 font-display text-[21px] font-semibold">Master topics of this unit</h2><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{sysTopics.map(t=><Link key={t.id} href={"/topics/"+t.id} className="panel group flex flex-col p-4 transition-colors hover:border-teal"><EmphasisBadge emphasis={t.emphasis}/><p className="mt-2.5 font-display text-[16.5px] font-semibold leading-snug group-hover:text-teal-deep">{t.title}</p><p className="mt-2 text-[11.5px] font-bold text-ink-faint">{sysQuestions.filter(q=>q.topicId===t.id).length} source questions mapped</p></Link>)}</div></section>{([["laq","Long Answer Questions"],["sn","Short Notes"],["saq","Short Answer Questions"]] as const).map(([kind,label])=>{const list=grouped[kind];return list.length?<section key={kind}><div className="mb-3 flex items-center gap-3"><TypeBadge qtype={kind}/><h2 className="font-display text-[21px] font-semibold">{label}</h2></div><div className="panel divide-y divide-line-soft">{list.map((q,i)=>{const topic=q.topicId?topicById.get(q.topicId):null;return <div key={q.id} className="flex flex-col gap-2 px-4 py-3.5 md:flex-row md:items-start md:gap-4"><span className="font-display text-[15px] font-semibold text-ink-faint md:w-10">Q{i+1}.</span><div className="flex-1"><p className="text-[14px] leading-relaxed">{q.text}</p><div className="mt-2 flex flex-wrap items-center gap-2"><Stars n={q.stars}/>{q.timesAsked>1&&<span className="badge badge-ink">REPEATED ×{q.timesAsked}</span>}<FlagChips q={q}/></div></div>{topic&&<Link href={"/topics/"+topic.id} className="inline-flex items-center rounded-md border border-line bg-white px-3 py-1.5 text-[12px] font-bold text-teal-deep hover:border-teal">Answered in master topic →</Link>}</div>})}</div></section>:null})}</div>;
}