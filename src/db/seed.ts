import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  subjects,
  papers,
  systems,
  topics,
  questions,
  figures,
  atlasEntries,
  vivaQuestions,
  revisionDocs,
  progress,
} from "./schema";
import { SUBJECT_SEEDS, PAPER_SEEDS, SYSTEM_SEEDS, QUESTION_SEEDS } from "./seed/questions";
import { TOPIC_META } from "./seed/topics-meta";
import { FIGURE_SEEDS } from "./seed/figures";
import { VIVA_SEEDS, ATLAS_SEEDS, SEVEN_DAY_PLAN } from "./seed/misc";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error("DATABASE_URL missing");

const db = drizzle(new Pool({ connectionString: dbUrl }));

const emphasisRank: Record<string, number> = {
  "ultra-high": 0,
  "very-high": 1,
  high: 2,
  standard: 3,
};

async function main() {
  console.log("Clearing existing data…");
  await db.delete(progress);
  await db.delete(vivaQuestions);
  await db.delete(atlasEntries);
  await db.delete(figures);
  await db.delete(questions);
  await db.delete(revisionDocs);
  await db.delete(topics);
  await db.delete(systems);
  await db.delete(papers);
  await db.delete(subjects);

  console.log("Inserting subjects, papers, systems…");
  const subjectRows = SUBJECT_SEEDS.map((s) => ({ ...s }));
  await db.insert(subjects).values(subjectRows);
  const subjectIdByCode = new Map(
    (await db.select().from(subjects)).map((s) => [s.code, s.id])
  );

  const paperRows = PAPER_SEEDS.map((p) => ({
    name: p.name,
    subjectId: subjectIdByCode.get(p.subjectCode)!,
    scope: p.scope,
    sortOrder: p.sortOrder,
  }));
  await db.insert(papers).values(paperRows);
  const paperIdByName = new Map((await db.select().from(papers)).map((p) => [p.name, p.id]));

  const systemRows = SYSTEM_SEEDS.map((s) => ({
    slug: s.slug,
    paperId: paperIdByName.get(s.paperName)!,
    name: s.name,
    unitLabel: s.unitLabel,
    intro: s.intro,
    sortOrder: s.sortOrder,
  }));
  await db.insert(systems).values(systemRows);
  const systemIdBySlug = new Map((await db.select().from(systems)).map((s) => [s.slug, s.id]));

  console.log("Inserting master topics (reading .md bodies)…");
  const contentDir = path.join(__dirname, "seed", "content");
  const topicRows = TOPIC_META.map((t) => ({
    slug: t.slug,
    systemId: systemIdBySlug.get(t.systemSlug)!,
    title: t.title,
    emphasis: t.emphasis,
    body: fs.readFileSync(path.join(contentDir, t.file), "utf8"),
    oneMinute: t.oneMinute,
    examKeywords: t.examKeywords,
    sortOrder: t.sortOrder,
  }));
  await db.insert(topics).values(topicRows);
  const topicIdBySlug = new Map((await db.select().from(topics)).map((t) => [t.slug, t.id]));
  const topicBySlug = new Map((await db.select().from(topics)).map((t) => [t.slug, t]));

  console.log("Inserting source question bank…");
  const questionRows = QUESTION_SEEDS.map((q, i) => ({
    systemId: systemIdBySlug.get(q.systemSlug)!,
    topicId: q.topicSlug ? topicIdBySlug.get(q.topicSlug) ?? null : null,
    qtype: q.qtype,
    text: q.text,
    stars: q.stars,
    timesAsked: q.timesAsked,
    needsDiagram: q.needsDiagram ?? false,
    needsLabDx: q.needsLabDx ?? false,
    needsMechanism: q.needsMechanism ?? false,
    needsLifeCycle: q.needsLifeCycle ?? false,
    needsComparison: q.needsComparison ?? false,
    needsClassification: q.needsClassification ?? false,
    keyPoints: q.keyPoints,
    sortOrder: i + 1,
  }));
  await db.insert(questions).values(questionRows);
  const orphan = QUESTION_SEEDS.filter((q) => q.topicSlug && !topicIdBySlug.get(q.topicSlug));
  if (orphan.length) {
    console.error("UNMAPPED QUESTIONS:", orphan.map((o) => o.text));
    process.exit(1);
  }

  console.log("Inserting figures…");
  const figureRows = FIGURE_SEEDS.map((f, i) => ({
    slug: f.slug,
    systemId: systemIdBySlug.get(f.systemSlug) ?? null,
    title: f.title,
    caption: f.caption,
    labels: f.labels.join(" · "),
    examTip: f.examTip,
    drawingSteps: f.drawingSteps.map((s, j) => `${j + 1}. ${s}`).join("\n"),
    svg: f.svg,
    sortOrder: i + 1,
  }));
  await db.insert(figures).values(figureRows);

  console.log("Inserting atlas entries…");
  const atlasRows = ATLAS_SEEDS.map((a) => ({
    kind: a.kind,
    title: a.title,
    topicId: a.topicSlug ? topicIdBySlug.get(a.topicSlug) ?? null : null,
    summary: a.summary,
    important: a.important,
  }));
  await db.insert(atlasEntries).values(atlasRows);

  console.log("Inserting viva questions…");
  const vivaRows = VIVA_SEEDS.map((v) => ({
    topicId: v.topicSlug ? topicIdBySlug.get(v.topicSlug) ?? null : null,
    question: v.question,
    answer: v.answer,
  }));
  await db.insert(vivaQuestions).values(vivaRows);

  console.log("Assembling revision master documents…");
  const allQuestions = await db.select().from(questions);
  const systemById = new Map((await db.select().from(systems)).map((s) => [s.id, s]));
  const paperById = new Map((await db.select().from(papers)).map((p) => [p.id, p]));
  const star = (n: number) => "★".repeat(n);

  const typeLabel: Record<string, string> = { laq: "LAQ", sn: "SN", saq: "SAQ" };

  // Paper revision masters
  const revisionRows: { kind: string; title: string; body: string; sortOrder: number }[] = [];
  for (const paper of [...paperById.values()].sort((a, b) => a.sortOrder - b.sortOrder)) {
    const paperSystems = [...systemById.values()]
      .filter((s) => s.paperId === paper.id)
      .sort((a, b) => a.sortOrder - b.sortOrder);
    const parts: string[] = [
      `This is the **${paper.name} Revision Master** (${paper.scope}). Every entry below points to the master topic that answers it. Priority badges come from the source stars and repetition only.`,
    ];
    for (const sys of paperSystems) {
      parts.push(`## ${sys.unitLabel} — ${sys.name}`);
      for (const qtype of ["laq", "sn", "saq"] as const) {
        const list = allQuestions
          .filter((q) => q.systemId === sys.id && q.qtype === qtype)
          .sort((a, b) => b.stars - a.stars || b.timesAsked - a.timesAsked);
        if (!list.length) continue;
        parts.push(`### ${typeLabel[qtype]} master list`);
        parts.push(
          `| Priority | Source question | Master topic |`
        );
        parts.push(`| --- | --- | --- |`);
        for (const q of list) {
          const t = q.topicId ? topicBySlug.get([...topicIdBySlug.entries()].find(([, id]) => id === q.topicId)?.[0] ?? "") : null;
          parts.push(
            `| ${star(q.stars)}${q.timesAsked > 1 ? ` ×${q.timesAsked}` : ""} | ${q.text} | ${t ? t.title : "—"} |`
          );
        }
        parts.push("");
      }
    }
    revisionRows.push({
      kind: "paper",
      title: `${paper.name} Revision Master`,
      body: parts.join("\n"),
      sortOrder: paper.sortOrder,
    });
  }

  // Last-24-hour revision (built from topic one-minute layers, priority order)
  const orderedTopics = [...topicBySlug.values()].sort(
    (a, b) =>
      emphasisRank[a.emphasis] - emphasisRank[b.emphasis] || a.systemId - b.systemId || a.sortOrder - b.sortOrder
  );
  const last24: string[] = [
    `This is the **additional final revision layer** — the one-minute core of every master topic, ordered by source emphasis (ultra-high first). Read top to bottom twice, then redraw the starred diagrams from the Master Diagram Atlas.`,
  ];
  for (const t of orderedTopics) {
    last24.push(`## ${t.title}`);
    last24.push(`**Emphasis:** ${t.emphasis.toUpperCase()}`);
    last24.push(t.oneMinute);
    last24.push(`**Keywords:** ${t.examKeywords}\n`);
  }
  revisionRows.push({
    kind: "last24",
    title: "Last 24-Hour Revision",
    body: last24.join("\n"),
    sortOrder: 10,
  });

  revisionRows.push({
    kind: "plan",
    title: "7-Day Revision Plan",
    body: SEVEN_DAY_PLAN,
    sortOrder: 11,
  });

  await db.insert(revisionDocs).values(revisionRows);

  const counts = {
    subjects: subjectRows.length,
    papers: paperRows.length,
    systems: systemRows.length,
    topics: topicRows.length,
    questions: questionRows.length,
    figures: figureRows.length,
    atlas: atlasRows.length,
    viva: vivaRows.length,
    revisionDocs: revisionRows.length,
  };
  console.log("Seed complete:", counts);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
