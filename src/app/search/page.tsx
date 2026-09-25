import Link from "next/link";
import { sourceRows } from "@/lib/static-data";
import { SourceIndex } from "@/components/SourceIndex";

export default function SearchPage() {
  return (
    <div className="rise space-y-5">
      <header><p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">Full-text study index</p><h1 className="mt-1.5 font-display text-[30px] font-semibold">Search &amp; Filter the Master Bank</h1><p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-soft">GitHub Pages uses a client-side source index here, so filtering stays in the browser with no database request. Open the index below and use its filters/search controls.</p></header>
      <SourceIndex rows={sourceRows}/>
      <p className="text-[12px] text-ink-faint">Direct topic links are preserved on every row. <Link href="/source" className="link-med font-semibold">Open full source index →</Link></p>
    </div>
  );
}