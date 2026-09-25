import { revisionDocs, figures } from "@/lib/static-data";
import { renderMarkdown, type FigurePayload } from "@/lib/markdown";

export default function RevisionPage() {
  const figuresBySlug=new Map<string,FigurePayload>();
  figures.forEach((f,i)=>figuresBySlug.set(f.slug,{slug:f.slug,title:f.title,caption:f.caption,svg:f.svg,number:i+1}));
  return (
    <div className="rise space-y-6">
      <header><p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">Multi-layer revision system</p><h1 className="mt-1.5 font-display text-[30px] font-semibold leading-tight">Revision Masters</h1><p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-soft">Paper-end revision masters, the last-24-hour layer and the 7-day plan.</p></header>
      {revisionDocs.slice().sort((a,b)=>a.sortOrder-b.sortOrder).map((doc)=><article key={doc.id} className="panel p-6 lg:p-8"><h2 className="font-display text-[24px] font-semibold">{doc.title}</h2><div className="md-content mt-4" dangerouslySetInnerHTML={{__html:renderMarkdown(doc.body,figuresBySlug).html}}/></article>)}
    </div>
  );
}