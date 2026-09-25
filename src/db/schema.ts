import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  pgEnum,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const qTypeEnum = pgEnum("q_type", ["laq", "sn", "saq"]);
export const emphasisEnum = pgEnum("emphasis", [
  "ultra-high",
  "very-high",
  "high",
  "standard",
]);
export const atlasKindEnum = pgEnum("atlas_kind", [
  "classification",
  "comparison",
  "labdx",
  "lifecycle",
  "mechanism",
]);
export const entityEnum = pgEnum("entity_type", ["topic", "question"]);

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
});

export const papers = pgTable("papers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  subjectId: integer("subject_id")
    .notNull()
    .references(() => subjects.id),
  scope: text("scope").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const systems = pgTable("systems", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  paperId: integer("paper_id")
    .notNull()
    .references(() => papers.id),
  name: text("name").notNull(),
  unitLabel: text("unit_label").notNull().default(""),
  intro: text("intro").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  systemId: integer("system_id")
    .notNull()
    .references(() => systems.id),
  title: text("title").notNull(),
  emphasis: emphasisEnum("emphasis").notNull().default("standard"),
  body: text("body").notNull(),
  oneMinute: text("one_minute").notNull().default(""),
  examKeywords: text("exam_keywords").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  systemId: integer("system_id")
    .notNull()
    .references(() => systems.id),
  topicId: integer("topic_id").references(() => topics.id),
  qtype: qTypeEnum("qtype").notNull(),
  text: text("text").notNull(),
  stars: integer("stars").notNull().default(0),
  timesAsked: integer("times_asked").notNull().default(1),
  needsDiagram: boolean("needs_diagram").notNull().default(false),
  needsLabDx: boolean("needs_labdx").notNull().default(false),
  needsMechanism: boolean("needs_mechanism").notNull().default(false),
  needsLifeCycle: boolean("needs_life_cycle").notNull().default(false),
  needsComparison: boolean("needs_comparison").notNull().default(false),
  needsClassification: boolean("needs_classification").notNull().default(false),
  keyPoints: text("key_points").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const figures = pgTable("figures", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  systemId: integer("system_id").references(() => systems.id),
  title: text("title").notNull(),
  caption: text("caption").notNull().default(""),
  labels: text("labels").notNull().default(""),
  examTip: text("exam_tip").notNull().default(""),
  drawingSteps: text("drawing_steps").notNull().default(""),
  svg: text("svg").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const atlasEntries = pgTable("atlas_entries", {
  id: serial("id").primaryKey(),
  kind: atlasKindEnum("kind").notNull(),
  title: text("title").notNull(),
  topicId: integer("topic_id").references(() => topics.id),
  summary: text("summary").notNull().default(""),
  important: boolean("important").notNull().default(false),
});

export const vivaQuestions = pgTable("viva_questions", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id").references(() => topics.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
});

export const revisionDocs = pgTable("revision_docs", {
  id: serial("id").primaryKey(),
  kind: text("kind").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const progress = pgTable(
  "progress",
  {
    id: serial("id").primaryKey(),
    entityType: entityEnum("entity_type").notNull(),
    entityId: integer("entity_id").notNull(),
    done: boolean("done").notNull().default(true),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [unique("progress_entity_uniq").on(t.entityType, t.entityId)]
);
