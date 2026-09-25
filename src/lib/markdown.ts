import { marked } from "marked";

export interface FigurePayload {
  slug: string;
  title: string;
  caption: string;
  svg: string;
  number: number;
}

const KIND_META: Record<string, string> = {
  definition: "Definition",
  exam: "Exam Framework",
  highyield: "High Yield",
  clinical: "Clinical Correlation",
  why: "WHY?",
  mnemonic: "Mnemonic",
  warning: "Warning",
  source: "Source Note",
  "figure-note": "Diagram",
};

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

const admonition = {
  name: "admonition",
  level: "block" as const,
  start(src: string) {
    return src.indexOf(":::");
  },
  tokenizer(src: string) {
    const m = src.match(/^:::([a-z-]+)[ \t]*([^\n]*)\n([\s\S]*?)\n:::[ \t]*(?:\n|$)/);
    if (m) {
      return {
        type: "admonition",
        raw: m[0],
        kind: m[1],
        title: m[2].trim(),
        body: m[3],
      };
    }
    return undefined;
  },
  renderer(token: { kind: string; title: string; body: string }) {
    const inner = marked.parse(token.body, { async: false }) as string;
    const label = KIND_META[token.kind] ?? token.kind.toUpperCase();
    return `<aside class="callout callout-${token.kind}"><div class="callout-head"><span class="callout-badge">${label}</span>${
      token.title ? `<span class="callout-title">${token.title}</span>` : ""
    }</div><div class="callout-body">${inner}</div></aside>`;
  },
};

marked.use({ extensions: [admonition], gfm: true, breaks: false });

function renderFlow(codeHtml: string): string {
  const raw = decodeEntities(codeHtml);
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  const parts: string[] = [];
  for (const line of lines) {
    if (/^[↓→←↑]+$/.test(line)) {
      parts.push(`<div class="flow-arrow">${line}</div>`);
    } else {
      const inner = marked.parseInline(line) as string;
      parts.push(`<div class="flow-box">${inner}</div>`);
    }
  }
  return `<div class="flowchart" role="figure">${parts.join("")}</div>`;
}

export interface RenderResult {
  html: string;
  toc: { id: string; text: string }[];
}

export function renderMarkdown(md: string, figuresBySlug: Map<string, FigurePayload>): RenderResult {
  // Replace figure directives with placeholders before parsing.
  const used: FigurePayload[] = [];
  let source = md.replace(/^{{figure:([a-z0-9-]+)}}[ \t]*$/gm, (_all, slug: string) => {
    const f = figuresBySlug.get(slug);
    if (f && !used.some((u) => u.slug === slug)) used.push(f);
    return f ? `FIGUREPLACEHOLDER${f.slug}END` : `[Figure missing: ${slug}]`;
  });

  let html = marked.parse(source, { async: false }) as string;

  // Flowchart fenced blocks.
  html = html.replace(/<pre><code class="language-flow">([\s\S]*?)<\/code><\/pre>/g, (_m, code: string) =>
    renderFlow(code)
  );

  // Table wrapper.
  html = html.replaceAll("<table>", '<div class="table-wrap"><table>').replaceAll("</table>", "</table></div>");

  // Figures.
  for (const f of used) {
    const block = `<figure class="figure-card" id="fig-${f.slug}"><div class="figure-svg">${f.svg}</div><figcaption><span class="figure-tag">FIGURE ${f.number}</span><span class="figure-title">${f.title}</span><p class="figure-caption">${f.caption}</p></figcaption></figure>`;
    html = html.replace(
      new RegExp(`<p>FIGUREPLACEHOLDER${f.slug}END</p>`, "g"),
      block
    );
  }

  // Heading ids + TOC (h2 only in TOC; ids on h2 and h3).
  const toc: { id: string; text: string }[] = [];
  const seen = new Map<string, number>();
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, level: string, inner: string) => {
    const text = inner.replace(/<[^>]*>/g, "").trim();
    let id = slugify(text);
    const n = seen.get(id) ?? 0;
    seen.set(id, n + 1);
    if (n > 0) id = `${id}-${n + 1}`;
    if (level === "2") toc.push({ id, text });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  return { html, toc };
}

export function emphasisLabel(e: string): string {
  switch (e) {
    case "ultra-high":
      return "ULTRA-HIGH EMPHASIS";
    case "very-high":
      return "VERY HIGH EMPHASIS";
    case "high":
      return "HIGH EMPHASIS";
    default:
      return "STANDARD";
  }
}
