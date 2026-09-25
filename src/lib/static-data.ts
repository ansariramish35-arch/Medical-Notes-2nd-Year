import fs from "node:fs";
import path from "node:path";
import { SUBJECT_SEEDS, PAPER_SEEDS, SYSTEM_SEEDS, QUESTION_SEEDS } from "@/db/seed/questions";
import { TOPIC_META } from "@/db/seed/topics-meta";
import { FIGURE_SEEDS } from "@/db/seed/figures";
import { VIVA_SEEDS, ATLAS_SEEDS, SEVEN_DAY_PLAN } from "@/db/seed/misc";

const emphasisRank: Record<string, number> = {
  "ultra-high": 0,
  "very-high": 1,
  high: 2,
  standard: 3,
};

function readTopicBody(fileName: string): string {
  const contentDir = path.join(process.cwd(), "src", "db", "seed", "content");
  const fullPath = path.join(contentDir, fileName);
  if (fs.existsSync(fullPath)) return fs.readFileSync(fullPath, "utf8");
  return `# Content for ${fileName}\n\nContent will be loaded from seed.`;
}

export const subjects = SUBJECT_SEEDS.map((s, i) => ({ ...s, id: i + 1 }));
export const papers = PAPER_SEEDS.map((p, i) => ({
  id: i + 1,
  name: p.name,
  subjectId: subjects.find((s) => s.code === p.subjectCode)?.id ?? 1,
  scope: p.scope,
  sortOrder: p.sortOrder,
}));
export const systems = SYSTEM_SEEDS.map((s, i) => ({
  id: i + 1,
  slug: s.slug,
  paperId: papers.find((p) => p.name === s.paperName)?.id ?? 1,
  name: s.name,
  unitLabel: s.unitLabel,
  intro: s.intro,
  sortOrder: s.sortOrder,
}));
export const topics = TOPIC_META.map((t, i) => ({
  id: i + 1,
  slug: t.slug,
  systemId: systems.find((s) => s.slug === t.systemSlug)?.id ?? 1,
  title: t.title,
  emphasis: t.emphasis,
  body: readTopicBody(t.file),
  oneMinute: t.oneMinute,
  examKeywords: t.examKeywords,
  sortOrder: t.sortOrder,
}));
export const questions = QUESTION_SEEDS.map((q, i) => ({
  id: i + 1,
  systemId: systems.find((s) => s.slug === q.systemSlug)?.id ?? 1,
  topicId: q.topicSlug ? topics.find((t) => t.slug === q.topicSlug)?.id ?? null : null,
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
export const figures = FIGURE_SEEDS.map((f, i) => ({
  id: i + 1,
  slug: f.slug,
  systemId: f.systemSlug ? systems.find((s) => s.slug === f.systemSlug)?.id ?? null : null,
  title: f.title,
  caption: f.caption,
  labels: f.labels.join(" · "),
  examTip: f.examTip,
  drawingSteps: f.drawingSteps.map((s, j) => `${j + 1}. ${s}`).join("\n"),
  svg: f.svg,
  sortOrder: i + 1,
}));
export const atlasEntries = ATLAS_SEEDS.map((a, i) => ({
  id: i + 1,
  kind: a.kind,
  title: a.title,
  topicId: a.topicSlug ? topics.find((t) => t.slug === a.topicSlug)?.id ?? null : null,
  summary: a.summary,
  important: a.important,
}));
export const vivaQuestions = VIVA_SEEDS.map((v, i) => ({
  id: i + 1,
  topicId: v.topicSlug ? topics.find((t) => t.slug === v.topicSlug)?.id ?? null : null,
  question: v.question,
  answer: v.answer,
}));

function buildPaperRevision(paper: (typeof papers)[number]) {
  const paperSystems = systems.filter((s) => s.paperId === paper.id).sort((a, b) => a.sortOrder - b.sortOrder);
  const parts: string[] = [
    `This is the **${paper.name} Revision Master** (${paper.scope}). Every entry below points to the master topic that answers it. Priority badges come from the source stars and repetition only.`,
  ];
  const star = (n: number) => "★".repeat(n);
  const typeLabel: Record<string, string> = { laq: "LAQ", sn: "SN", saq: "SAQ" };
  for (const sys of paperSystems) {
    parts.push(`## ${sys.unitLabel} — ${sys.name}`);
    for (const qtype of ["laq", "sn", "saq"] as const) {
      const list = questions.filter((q) => q.systemId === sys.id && q.qtype === qtype).sort((a, b) => b.stars - a.stars || b.timesAsked - a.timesAsked);
      if (!list.length) continue;
      parts.push(`### ${typeLabel[qtype]} master list`);
      parts.push("| Priority | Source question | Master topic |");
      parts.push("| --- | --- | --- |");
      for (const q of list) {
        const t = q.topicId ? topics.find((topic) => topic.id === q.topicId) : null;
        parts.push(`| ${star(q.stars)}${q.timesAsked > 1 ? ` ×${q.timesAsked}` : ""} | ${q.text} | ${t ? t.title : "—"} |`);
      }
      parts.push("");
    }
  }
  return parts.join("\n");
}

const orderedTopics = [...topics].sort((a, b) =>
  emphasisRank[a.emphasis] - emphasisRank[b.emphasis] || a.systemId - b.systemId || a.sortOrder - b.sortOrder
);
const last24Parts: string[] = [
  "This is the **additional final revision layer** — the one-minute core of every master topic, ordered by source emphasis (ultra-high first). Read top to bottom twice, then redraw the starred diagrams from the Master Diagram Atlas.",
];
for (const t of orderedTopics) {
  last24Parts.push(`## ${t.title}`);
  last24Parts.push(`**Emphasis:** ${t.emphasis.toUpperCase()}`);
  last24Parts.push(t.oneMinute);
  last24Parts.push(`**Keywords:** ${t.examKeywords}\n`);
}

export const revisionDocs = [
  ...papers.map((p) => ({ kind: "paper", title: `${p.name} Revision Master`, body: buildPaperRevision(p), sortOrder: p.sortOrder })),
  { kind: "last24", title: "Last 24-Hour Revision", body: last24Parts.join("\n"), sortOrder: 10 },
  { kind: "plan", title: "7-Day Revision Plan", body: SEVEN_DAY_PLAN, sortOrder: 11 },
].map((d, i) => ({ ...d, id: i + 1 }));

export const sourceRows = questions.map((q) => {
  const sys = systems.find((s) => s.id === q.systemId);
  const paper = sys ? papers.find((p) => p.id === sys.paperId) : undefined;
  const topic = q.topicId ? topics.find((t) => t.id === q.topicId) : undefined;
  return {
    id: q.id, qtype: q.qtype, text: q.text, stars: q.stars, timesAsked: q.timesAsked,
    paperName: paper?.name ?? "", systemName: sys?.name ?? "", unitLabel: sys?.unitLabel ?? "",
    topicTitle: topic?.title ?? null, topicId: q.topicId,
    needsDiagram: q.needsDiagram, needsLabDx: q.needsLabDx, needsMechanism: q.needsMechanism,
    needsLifeCycle: q.needsLifeCycle, needsComparison: q.needsComparison, needsClassification: q.needsClassification,
  };
});
