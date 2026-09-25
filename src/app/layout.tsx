import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { systems, papers } from "@/lib/static-data";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "MedMaster Notes — University Master Book",
  description:
    "Complete master-notes platform: question bank, master topics, diagram atlas, revision layers and coverage audit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const paperById = new Map(allPapers.map((p) => [p.id, p]));
  const sidebarSystems = allSystems.map((s) => ({
    id: s.id,
    slug: s.slug,
    name: s.name,
    unitLabel: s.unitLabel,
    paperName: paperById.get(s.paperId)?.name ?? "",
  }));

  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${manrope.variable}`}>
        <Sidebar systems={sidebarSystems} />
        <div className="lg:pl-72">
          {/* mobile top bar */}
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-card/95 px-4 py-3 backdrop-blur lg:hidden">
            <Link href="/" className="font-display text-[15px] font-semibold">
              MedMaster Notes
            </Link>
            <nav className="ml-auto flex gap-1 overflow-x-auto text-[11px] font-bold text-ink-soft">
              {[
                ["/source", "Index"],
                ["/atlas", "Atlas"],
                ["/revision", "Revise"],
                ["/selftest", "Test"],
                ["/coverage", "Audit"],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="rounded-md border border-line bg-white px-2.5 py-1.5">
                  {label}
                </Link>
              ))}
            </nav>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-8 lg:px-10 lg:py-10">{children}</main>
          <footer className="border-t border-line px-4 py-6 text-center text-[11.5px] text-ink-faint lg:px-10">
            MedMaster Notes · textbook + question-bank solutions + answer book + diagram atlas + revision system ·
            completeness &gt; brevity
          </footer>
        </div>
      </body>
    </html>
  );
}
