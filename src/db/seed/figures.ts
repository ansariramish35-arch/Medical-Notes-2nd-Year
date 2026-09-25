// Hand-crafted, exam-reproducible SVG figures (schematic, labelled).
// Shared palette: ink #24312c · teal #14655c · crimson #a3243b · amber #b26a00 · paper #fffdf8

const INK = "#24312c";
const TEAL = "#14655c";
const CRIM = "#a3243b";
const AMBER = "#b26a00";

export interface FigureSeed {
  slug: string;
  systemSlug: string;
  title: string;
  caption: string;
  labels: string[];
  examTip: string;
  drawingSteps: string[];
  svg: string;
}

const box = (x: number, y: number, w: number, h: number, fill: string, stroke: string) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>`;

const label = (x: number, y: number, t: string, size = 11.5, weight = "normal", fill = INK, anchor = "start") =>
  `<text x="${x}" y="${y}" font-family="Verdana, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${t}</text>`;

const arrow = (x1: number, y1: number, x2: number, y2: number, color = INK) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.8" marker-end="url(#arw)"/>`;

const defs = `<defs><marker id="arw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${INK}"/></marker></defs>`;

export const FIGURE_SEEDS: FigureSeed[] = [
  {
    slug: "bacterial-cell",
    systemSlug: "general-microbiology",
    title: "Ultrastructure of a Typical Bacterial Cell",
    caption:
      "A Gram-negative bacillus showing the cell envelope (capsule, cell wall, plasma membrane) and cytoplasmic structures (nucleoid, plasmids, ribosomes) with surface appendages (flagella, pili).",
    labels: [
      "Capsule",
      "Cell wall",
      "Plasma membrane",
      "Nucleoid (single circular DNA)",
      "Plasmid",
      "Ribosomes (70S)",
      "Flagellum",
      "Pili / fimbriae",
      "Mesosome (artifact/invagination)",
    ],
    examTip:
      "Draw a rod-shaped cell FIRST, then add the envelope as double outline, then appendages, then internal structures. Every label must have a leader line that does not cross other lines.",
    drawingSteps: [
      "Draw an elongated oval (bacillus) horizontally.",
      "Add an outer faint halo = capsule; double contour = wall + membrane.",
      "Draw a tangled skein in the centre = nucleoid; small circles = plasmids; dots = ribosomes.",
      "Add 2–3 long wavy flagella at one pole and short straight pili all around.",
      "Label with straight, non-crossing leader lines.",
    ],
    svg: `<svg viewBox="0 0 920 560" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="920" height="560" fill="#fffdf8"/>
${label(460, 34, "FIGURE 1.1 — ULTRASTRUCTURE OF A TYPICAL BACTERIAL CELL", 14, "bold", INK, "middle")}
<ellipse cx="430" cy="300" rx="250" ry="130" fill="#eef3f0" stroke="#9db4a9" stroke-width="2" stroke-dasharray="7 5"/>
<ellipse cx="430" cy="300" rx="222" ry="112" fill="#fdf6e7" stroke="${INK}" stroke-width="3"/>
<ellipse cx="430" cy="300" rx="204" ry="98" fill="#f6efdc" stroke="${INK}" stroke-width="1.6"/>
<path d="M340,300 c18,-34 60,-40 74,-8 c12,28 -22,48 8,62 c30,13 66,-8 58,-42" fill="none" stroke="${TEAL}" stroke-width="4" stroke-linecap="round"/>
<circle cx="300" cy="260" r="26" fill="none" stroke="${CRIM}" stroke-width="2.4"/>
<circle cx="560" cy="270" r="18" fill="none" stroke="${CRIM}" stroke-width="2.4"/>
${[...Array(26)].map((_, i) => `<circle cx="${280 + (i % 9) * 34}" cy="${228 + Math.floor(i / 9) * 26 + (i % 3) * 5}" r="2.6" fill="${INK}"/>`).join("")}
<path d="M208,300 c-60,-26 -92,10 -120,-18 c-22,-22 -14,-52 -36,-66" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>
<path d="M220,352 c-46,30 -84,16 -118,40" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>
<path d="M640,246 c40,-34 74,-20 100,-48" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>
${[[258, 236], [286, 222], [330, 210], [380, 202], [430, 198], [480, 202], [530, 212]].map(([x, y]) => `<line x1="${x}" y1="${y}" x2="${x - 14}" y2="${y - 24}" stroke="${INK}" stroke-width="1.6"/>`).join("")}
<path d="M540,220 a46,40 0 0 1 60,26 l-6,10 a40,34 0 0 0 -52,-22 z" fill="#dfe9e4" stroke="${INK}" stroke-width="1.4"/>
<line x1="178" y1="188" x2="238" y2="222" stroke="${INK}" stroke-width="1.1"/>
<line x1="120" y1="322" x2="212" y2="318" stroke="${INK}" stroke-width="1.1"/>
<line x1="150" y1="428" x2="236" y2="368" stroke="${INK}" stroke-width="1.1"/>
<line x1="420" y1="486" x2="428" y2="402" stroke="${INK}" stroke-width="1.1"/>
<line x1="648" y1="428" x2="566" y2="356" stroke="${INK}" stroke-width="1.1"/>
<line x1="744" y1="282" x2="648" y2="300" stroke="${INK}" stroke-width="1.1"/>
<line x1="672" y1="150" x2="596" y2="216" stroke="${INK}" stroke-width="1.1"/>
<line x1="770" y1="452" x2="600" y2="240" stroke="${INK}" stroke-width="1.1"/>
<line x1="86" y1="200" x2="176" y2="246" stroke="${INK}" stroke-width="1.1"/>
${label(96, 180, "Capsule (slimy,", 12)}${label(96, 196, "antiphagocytic)", 12)}
${label(26, 316, "Flagellum —", 12)}${label(26, 332, "motility", 12)}
${label(70, 434, "Pili / fimbriae —", 12)}${label(70, 450, "adhesion", 12)}
${label(330, 508, "Nucleoid — single circular dsDNA, no nuclear membrane", 12)}
${label(560, 442, "Plasmid — extrachromosomal DNA", 12)}
${label(700, 292, "Ribosomes (70S)", 12)}
${label(560, 142, "Mesosome", 12)}
${label(742, 470, "Cell wall + plasma membrane", 12)}
${label(460, 534, "Prokaryote: NO mitochondria, NO Golgi, NO mitotic division.", 11.5, "bold", CRIM, "middle")}
</svg>`,
  },
  {
    slug: "gram-cell-wall",
    systemSlug: "general-microbiology",
    title: "Gram-positive vs Gram-negative Cell Envelope",
    caption:
      "Layered comparison: Gram-positive organisms possess a thick multilayer peptidoglycan with teichoic acids and NO outer membrane; Gram-negative organisms possess a thin peptidoglycan, a periplasmic space and an outer membrane bearing lipopolysaccharide (endotoxin).",
    labels: [
      "Thick peptidoglycan (many layers)",
      "Teichoic / lipoteichoic acid",
      "Plasma membrane",
      "Thin peptidoglycan (1–2 layers)",
      "Periplasmic space",
      "Outer membrane",
      "Lipopolysaccharide (LPS = endotoxin)",
      "Porins",
    ],
    examTip:
      "Draw BOTH walls side by side sharing one plasma membrane label. The thickness difference of the peptidoglycan band is the single most-marked feature.",
    drawingSteps: [
      "Draw two vertical stacks side by side.",
      "Left (Gram +): thick hatched band (20–80 nm PG) + small rods as teichoic acids + single membrane below.",
      "Right (Gram −): outer membrane with lollipop LPS, thin PG line, periplasm, inner membrane.",
      "Label both and add a thickness note.",
    ],
    svg: `<svg viewBox="0 0 940 600" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="940" height="600" fill="#fffdf8"/>
${label(470, 34, "FIGURE 1.2 — GRAM-POSITIVE vs GRAM-NEGATIVE CELL ENVELOPE", 14, "bold", INK, "middle")}
${label(235, 72, "GRAM-POSITIVE", 13, "bold", TEAL, "middle")}
<rect x="120" y="90" width="230" height="150" fill="#e3efec" stroke="${TEAL}" stroke-width="2.5"/>
${[...Array(6)].map((_, r) => `<line x1="120" y1="${105 + r * 22}" x2="350" y2="${118 + r * 22}" stroke="${TEAL}" stroke-width="1.2"/>`).join("")}
${[...Array(7)].map((_, i) => `<rect x="${135 + i * 30}" y="${82}" width="7" height="34" rx="3" fill="${AMBER}" transform="rotate(${(i % 2 ? 12 : -10)} ${138 + i * 30} 100)"/>`).join("")}
<rect x="120" y="246" width="230" height="26" fill="#fdf0d9" stroke="${INK}" stroke-width="2"/>
<rect x="120" y="272" width="230" height="16" fill="#f3d9a8" stroke="${INK}" stroke-width="1.4"/>
${label(235, 262, "", 10)}
${label(235, 312, "Plasma membrane", 11.5, "bold", INK, "middle")}
<line x1="352" y1="160" x2="430" y2="150" stroke="${INK}" stroke-width="1.1"/>
${label(434, 146, "Thick peptidoglycan", 12)}${label(434, 162, "(20–80 nm, multilayer)", 12)}
<line x1="196" y1="88" x2="120" y2="60" stroke="${INK}" stroke-width="0"/>
<line x1="330" y1="92" x2="430" y2="100" stroke="${INK}" stroke-width="1.1"/>
${label(434, 104, "Teichoic / lipoteichoic acid", 12)}
<line x1="235" y1="252" x2="110" y2="222" stroke="${INK}" stroke-width="0"/>
${label(235, 348, "NO outer membrane · NO LPS", 11.5, "bold", TEAL, "middle")}
${label(235, 366, "Retains crystal violet → PURPLE", 11.5, "bold", TEAL, "middle")}
${label(705, 72, "GRAM-NEGATIVE", 13, "bold", CRIM, "middle")}
<rect x="560" y="92" width="290" height="30" fill="#f4dfe2" stroke="${CRIM}" stroke-width="2.2"/>
${[...Array(8)].map((_, i) => `<line x1="${576 + i * 36}" y1="92" x2="${576 + i * 36}" y2="70" stroke="${CRIM}" stroke-width="2"/><circle cx="${576 + i * 36}" cy="66" r="4.5" fill="${CRIM}"/>`).join("")}
${[...Array(4)].map((_, i) => `<rect x="${600 + i * 66}" y="94" width="14" height="26" rx="4" fill="#fffdf8" stroke="${CRIM}" stroke-width="1.4"/>`).join("")}
<rect x="560" y="130" width="290" height="34" fill="#fdf6e7" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 3"/>
${label(705, 152, "PERIPLASMIC SPACE", 10.5, "bold", AMBER, "middle")}
<rect x="560" y="168" width="290" height="16" fill="#e3efec" stroke="${TEAL}" stroke-width="2"/>
<rect x="560" y="196" width="290" height="26" fill="#fdf0d9" stroke="${INK}" stroke-width="2"/>
<rect x="560" y="222" width="290" height="16" fill="#f3d9a8" stroke="${INK}" stroke-width="1.4"/>
<line x1="850" y1="80" x2="896" y2="60" stroke="${INK}" stroke-width="0"/>
<line x1="836" y1="70" x2="884" y2="112" stroke="${INK}" stroke-width="0"/>
${label(868, 130, "Outer membrane", 12)}
${label(868, 148, "with LPS (lipid A =", 11)}${label(868, 164, "endotoxin) + porins", 11)}
<line x1="852" y1="176" x2="886" y2="176" stroke="${INK}" stroke-width="1.1"/>
${label(868, 196, "Thin PG (2–3 nm)", 12)}
<line x1="705" y1="238" x2="705" y2="262" stroke="${INK}" stroke-width="1.1"/>
${label(705, 280, "Plasma membrane", 11.5, "bold", INK, "middle")}
${label(705, 316, "Decolorized → takes safranin → PINK/RED", 11.5, "bold", CRIM, "middle")}
<line x1="470" y1="60" x2="470" y2="380" stroke="#d9d2bf" stroke-width="1.4" stroke-dasharray="5 5"/>
${label(470, 418, "Peptidoglycan is the target of LYSCOZYME and BETA-LACTAM antibiotics in both groups.", 12, "bold", INK, "middle")}
${label(470, 442, "Endotoxin (LPS lipid A) is present ONLY in the Gram-negative outer membrane.", 12, "bold", INK, "middle")}
${box(60, 470, 820, 96, "#eef3f0", INK)}
${label(470, 498, "GRAM STAIN SEQUENCE", 12.5, "bold", TEAL, "middle")}
${label(470, 524, "Crystal violet (primary) → Gram's iodine (mordant, fixes CV-I complex) → Alcohol/acetone (decolorizer) → Safranin (counterstain)", 11.5, INK, "middle")}
${label(470, 548, "Thick PG traps CV-I in Gram-positives; thin PG + dissolved outer membrane lets it escape in Gram-negatives.", 11, "italic" as never, INK, "middle")}
</svg>`,
  },
  {
    slug: "growth-curve",
    systemSlug: "general-microbiology",
    title: "Bacterial Growth Curve (Batch Culture)",
    caption:
      "Sigmoid growth curve of bacteria in a closed (batch) system plotted as log10 viable count against time, showing the four phases: lag, log (exponential), stationary and decline (death) phase.",
    labels: [
      "Lag phase — adaptation, no division",
      "Log (exponential) phase — constant binary fission",
      "Stationary phase — growth = death",
      "Decline / death phase",
      "Generation time measured in log phase",
    ],
    examTip:
      "Plot log viable count on Y (not total count). Mark all four phases on the curve and note that antibiotics acting on cell-wall synthesis work best in the LOG phase.",
    drawingSteps: [
      "Draw X = time, Y = log10 viable cells.",
      "Sketch a flat start (lag), steep rise (log), plateau (stationary), gentle fall (decline).",
      "Label each phase with a vertical dashed separator.",
    ],
    svg: `<svg viewBox="0 0 880 520" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="880" height="520" fill="#fffdf8"/>
${label(440, 32, "FIGURE 1.3 — BACTERIAL GROWTH CURVE (BATCH CULTURE)", 14, "bold", INK, "middle")}
<line x1="80" y1="420" x2="840" y2="420" stroke="${INK}" stroke-width="2" marker-end="url(#arw)"/>
<line x1="80" y1="420" x2="80" y2="60" stroke="${INK}" stroke-width="2" marker-end="url(#arw)"/>
${label(460, 456, "Time of incubation", 12.5, "bold", INK, "middle")}
${label(46, 240, "Log10 viable count", 12.5, "bold", INK, "middle")}
<path d="M80,398 L230,395 C300,392 320,330 380,250 C430,180 470,130 540,120 L680,118 C740,124 790,180 830,250" fill="none" stroke="${TEAL}" stroke-width="4" stroke-linecap="round"/>
<line x1="230" y1="420" x2="230" y2="110" stroke="#c9c2ae" stroke-width="1.4" stroke-dasharray="6 5"/>
<line x1="540" y1="420" x2="540" y2="110" stroke="#c9c2ae" stroke-width="1.4" stroke-dasharray="6 5"/>
<line x1="680" y1="420" x2="680" y2="110" stroke="#c9c2ae" stroke-width="1.4" stroke-dasharray="6 5"/>
${label(150, 486, "LAG PHASE", 12.5, "bold", AMBER, "middle")}
${label(150, 504, "metabolic activity ↑, no division", 10.5, INK, "middle")}
${label(380, 486, "LOG (EXPONENTIAL) PHASE", 12.5, "bold", TEAL, "middle")}
${label(380, 504, "constant binary fission · generation time here", 10.5, INK, "middle")}
${label(610, 486, "STATIONARY PHASE", 12.5, "bold", CRIM, "middle")}
${label(610, 504, "nutrients ↓, toxic products ↑, growth = death", 10.5, INK, "middle")}
${label(760, 486, "DECLINE /", 12.5, "bold", INK, "middle")}${label(760, 504, "DEATH PHASE", 12.5, "bold", INK, "middle")}
${box(560, 160, 280, 84, "#f6efdc", AMBER)}
${label(700, 186, "Spores & antibiotics sensitivity:", 11, "bold", INK, "middle")}
${label(700, 206, "β-lactams most active in LOG phase;", 11, INK, "middle")}
${label(700, 224, "spores form in adverse (stationary) phase.", 11, INK, "middle")}
<circle cx="380" cy="250" r="5" fill="${TEAL}"/>
<circle cx="540" cy="120" r="5" fill="${CRIM}"/>
</svg>`,
  },
  {
    slug: "immunoglobulin-structure",
    systemSlug: "immunology",
    title: "Structure of Immunoglobulin G (IgG)",
    caption:
      "The basic immunoglobulin unit: two identical heavy (γ) chains and two identical light chains joined by disulfide bonds. Papain cleavage yields 2 Fab (antigen-binding) + 1 Fc (crystallizable) fragment; the hinge region lies between Fab and Fc.",
    labels: [
      "Light chain (κ or λ)",
      "Heavy chain (γ in IgG)",
      "Fab fragment — antigen binding (2 sites)",
      "Fc fragment — effector functions (complement, Fc receptors, placental transfer)",
      "Hinge region",
      "Disulfide bonds",
      "Variable (V) + Constant (C) domains",
    ],
    examTip:
      "A symmetrical Y-shaped figure with BOTH arms open at ~120° earns the diagram marks. Always mark the antigen-binding sites as small notches at the tips and show the hinge.",
    drawingSteps: [
      "Draw a Y: two arms and one stem, each as double-rail tracks (two chains).",
      "Mark tips of arms = Fab with notches (antigen-binding sites).",
      "Stem = Fc; junction = hinge; small bridges = disulfide bonds.",
      "Add papain cut line above hinge → 2 Fab + 1 Fc.",
    ],
    svg: `<svg viewBox="0 0 820 640" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="820" height="640" fill="#fffdf8"/>
${label(410, 34, "FIGURE 2.1 — STRUCTURE OF IMMUNOGLOBULIN G (IgG)", 14, "bold", INK, "middle")}
<g stroke="${TEAL}" stroke-width="9" fill="none" stroke-linecap="round">
<path d="M410,320 L300,150"/>
<path d="M410,320 L520,150"/>
<path d="M410,320 L410,500"/>
</g>
<g stroke="#e9e2d0" stroke-width="2.5" fill="none">
<path d="M410,320 L300,150"/><path d="M410,320 L520,150"/><path d="M410,320 L410,500"/>
</g>
<g stroke="${CRIM}" stroke-width="8" fill="none" stroke-linecap="round">
<path d="M288,168 L382,314"/>
<path d="M532,168 L438,314"/>
</g>
<circle cx="295" cy="140" r="16" fill="#fffdf8" stroke="${INK}" stroke-width="2.4"/>
<circle cx="525" cy="140" r="16" fill="#fffdf8" stroke="${INK}" stroke-width="2.4"/>
<line x1="352" y1="238" x2="332" y2="228" stroke="${AMBER}" stroke-width="3"/>
<line x1="468" y1="238" x2="488" y2="228" stroke="${AMBER}" stroke-width="3"/>
<line x1="402" y1="360" x2="418" y2="360" stroke="${AMBER}" stroke-width="3"/>
<line x1="402" y1="420" x2="418" y2="420" stroke="${AMBER}" stroke-width="3"/>
<path d="M360,254 q50,26 100,0" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 4"/>
${label(410, 300, "hinge", 11, "bold", AMBER, "middle")}
<path d="M250,90 l30,30" stroke="${INK}" stroke-width="0"/>
<path d="M270,105 a30,30 0 0 1 50,0" fill="none" stroke="${INK}" stroke-width="2"/>
${label(295, 84, "Antigen", 11, "bold", INK, "middle")}
<path d="M495,105 a30,30 0 0 1 50,0" fill="none" stroke="${INK}" stroke-width="2"/>
${label(525, 84, "Antigen", 11, "bold", INK, "middle")}
<line x1="230" y1="150" x2="282" y2="148" stroke="${INK}" stroke-width="1.1"/>
${label(222, 146, "Fab × 2", 12, "bold", TEAL, "end")}
${label(222, 162, "(antigen binding)", 10.5, INK, "end")}
<line x1="470" y1="540" x2="430" y2="470" stroke="${INK}" stroke-width="1.1"/>
${label(478, 552, "Fc fragment", 12, "bold", CRIM)}
${label(478, 568, "complement activation · Fc receptors", 10.5, INK)}
${label(478, 584, "placental transfer · half-life", 10.5, INK)}
<line x1="560" y1="200" x2="522" y2="176" stroke="${INK}" stroke-width="1.1"/>
${label(566, 200, "Heavy chain (γ)", 12)}
<line x1="300" y1="220" x2="336" y2="236" stroke="${INK}" stroke-width="0"/>
<line x1="250" y1="236" x2="326" y2="224" stroke="${INK}" stroke-width="1.1"/>
${label(242, 240, "Light chain (κ/λ)", 12, "normal", INK, "end")}
<line x1="600" y1="380" x2="430" y2="382" stroke="${INK}" stroke-width="1.1"/>
${label(606, 384, "Disulfide bonds", 12)}
${box(90, 470, 300, 130, "#eef3f0", INK)}
${label(240, 498, "PAPAIN CLEAVAGE", 12, "bold", TEAL, "middle")}
${label(240, 522, "IgG → 2 Fab + 1 Fc", 11.5, INK, "middle")}
${label(240, 544, "PEPSIN CLEAVAGE", 12, "bold", TEAL, "middle")}
${label(240, 566, "IgG → F(ab′)2 + pFc′", 11.5, INK, "middle")}
${label(240, 586, "(bivalent binding retained)", 10.5, INK, "middle")}
${box(90, 60, 300, 0, "none", "none")}
${label(410, 620, "Basic unit: H2L2 · each chain = Variable + Constant domains (IgG: γ2κ2 or γ2λ2)", 11.5, "bold", INK, "middle")}
</svg>`,
  },
  {
    slug: "complement-classical",
    systemSlug: "immunology",
    title: "Classical Complement Pathway",
    caption:
      "Antigen–antibody complexes activate C1, generating the C3 convertase (C4b2a), which cleaves C3 and drives the terminal C5b–C9 membrane attack complex. Branch products mediate opsonization (C3b), inflammation (C3a, C5a) and immune-complex clearance.",
    labels: [
      "Antigen–antibody complex (IgG/IgM)",
      "C1 (C1q·C1r·C1s)",
      "C4 + C2 → C3 convertase (C4b2a)",
      "C3 → C3a (anaphylatoxin) + C3b (opsonin)",
      "C5 convertase (C4b2a3b)",
      "C5b–C9 Membrane Attack Complex (lysis)",
    ],
    examTip:
      "Write the convertases exactly: classical C3 convertase = C4b2a; C5 convertase = C4b2a3b. Alternative pathway C3 convertase = C3bBb — examiners check this distinction.",
    drawingSteps: [
      "Central vertical chain: Ag–Ab → C1 → C4+C2 → C3 → C5 → MAC.",
      "Side branches: C3a → mast cell/histamine; C3b → opsonization; C3b joins C5 convertase.",
      "Box the two convertases — they are the most-asked items.",
    ],
    svg: `<svg viewBox="0 0 760 860" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="760" height="860" fill="#fffdf8"/>
${label(380, 32, "FIGURE 2.2 — CLASSICAL COMPLEMENT PATHWAY", 14, "bold", INK, "middle")}
${box(250, 56, 260, 52, "#f4dfe2", CRIM)}
${label(380, 78, "Antigen–antibody complex", 12, "bold", CRIM, "middle")}
${label(380, 96, "(IgG1/IgG3 or IgM bound to antigen)", 10.5, INK, "middle")}
${arrow(380, 108, 380, 136)}
${box(280, 138, 200, 44, "#e3efec", TEAL)}
${label(380, 158, "C1 activation", 12, "bold", TEAL, "middle")}
${label(380, 175, "C1q binds Fc → C1r → C1s", 10.5, INK, "middle")}
${arrow(380, 182, 380, 210)}
${box(262, 212, 236, 44, "#e3efec", TEAL)}
${label(380, 232, "C4 + C2 cleaved", 12, "bold", TEAL, "middle")}
${label(380, 249, "C4b2a forms on surface", 10.5, INK, "middle")}
${arrow(380, 256, 380, 284)}
${box(240, 286, 280, 48, "#f6efdc", AMBER)}
${label(380, 306, "C3 CONVERTASE = C4b2a", 12.5, "bold", AMBER, "middle")}
${label(380, 324, "(rate-limiting, central step)", 10.5, INK, "middle")}
${arrow(380, 334, 380, 362)}
${box(270, 364, 220, 44, "#e3efec", TEAL)}
${label(380, 384, "C3 → C3a + C3b", 12, "bold", TEAL, "middle")}
${label(380, 401, "massive amplification", 10.5, INK, "middle")}
<line x1="270" y1="386" x2="120" y2="386" stroke="${INK}" stroke-width="1.8" marker-end="url(#arw)"/>
${box(16, 360, 104, 52, "#f4dfe2", CRIM)}
${label(68, 380, "C3a", 12, "bold", CRIM, "middle")}
${label(68, 398, "anaphylatoxin", 10, INK, "middle")}
${label(68, 428, "mast-cell degranulation,", 10, INK, "middle")}${label(68, 442, "↑ vascular permeability", 10, INK, "middle")}
<line x1="490" y1="386" x2="640" y2="386" stroke="${INK}" stroke-width="1.8" marker-end="url(#arw)"/>
${box(642, 360, 104, 52, "#e3efec", TEAL)}
${label(694, 380, "C3b", 12, "bold", TEAL, "middle")}
${label(694, 398, "OPSONIN", 10, "bold", INK, "middle")}
${label(694, 428, "phagocytosis via", 10, INK, "middle")}${label(694, 442, "CR1 receptors", 10, INK, "middle")}
${arrow(380, 408, 380, 452)}
${box(236, 454, 288, 48, "#f6efdc", AMBER)}
${label(380, 474, "C5 CONVERTASE = C4b2a3b", 12.5, "bold", AMBER, "middle")}
${label(380, 492, "(C3b joins C4b2a)", 10.5, INK, "middle")}
${arrow(380, 502, 380, 530)}
${box(252, 532, 256, 44, "#e3efec", TEAL)}
${label(380, 552, "C5 → C5a + C5b", 12, "bold", TEAL, "middle")}
${label(380, 569, "C5a = strongest chemotaxin", 10.5, INK, "middle")}
${arrow(380, 576, 380, 604)}
${box(216, 606, 328, 52, "#f4dfe2", CRIM)}
${label(380, 626, "C5b + C6 + C7 + C8 + C9", 12.5, "bold", CRIM, "middle")}
${label(380, 644, "MEMBRANE ATTACK COMPLEX (MAC)", 11.5, "bold", INK, "middle")}
${arrow(380, 658, 380, 686)}
${box(232, 688, 296, 56, "#fdf0d9", INK)}
${label(380, 710, "Transmembrane pore → osmotic lysis", 12, "bold", INK, "middle")}
${label(380, 730, "(especially Neisseria — Gram-negative diplococci)", 10.5, INK, "middle")}
${box(96, 772, 568, 64, "#eef3f0", INK)}
${label(380, 798, "FUNCTIONS: opsonization (C3b) · lysis (MAC) · inflammation (C3a, C5a) ·", 11.5, "bold", INK, "middle")}
${label(380, 818, "chemotaxis (C5a) · immune-complex clearance (C3b)", 11.5, "bold", INK, "middle")}
</svg>`,
  },
  {
    slug: "hypersensitivity-types",
    systemSlug: "immunology",
    title: "Gell & Coombs Classification — The Four Types of Hypersensitivity",
    caption:
      "Type I (IgE–mast cell, immediate), Type II (antibody-mediated cytotoxic), Type III (immune-complex mediated) and Type IV (T-cell mediated, delayed). Types I–III are antibody-mediated and rapid; Type IV is cell-mediated and delayed (24–72 h).",
    labels: [
      "Type I: IgE, mast cell, histamine",
      "Type II: IgG/IgM against cell-surface antigen",
      "Type III: circulating immune complexes deposit in vessels",
      "Type IV: CD4+ Th1 / CD8+ T cells, macrophages",
    ],
    examTip:
      "Open every hypersensitivity answer with the Gell & Coombs table, then expand the asked type. Always state: Types I–III = antibody mediated; Type IV = cell mediated, delayed.",
    drawingSteps: [
      "Draw four panels in a 2×2 grid.",
      "Panel 1: IgE on mast cell + antigen bridging → granule release.",
      "Panel 2: Y-shaped IgG coating a cell + complement lysis.",
      "Panel 3: lattice complexes settling on a vessel wall.",
      "Panel 4: T cell contacting a macrophage with cytokine dots.",
    ],
    svg: `<svg viewBox="0 0 980 700" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="980" height="700" fill="#fffdf8"/>
${label(490, 32, "FIGURE 2.3 — GELL &amp; COOMBS TYPES OF HYPERSENSITIVITY", 14, "bold", INK, "middle")}
${box(30, 56, 450, 290, "#fdf6e7", AMBER)}
${label(52, 84, "TYPE I — ANAPHYLACTIC (IMMEDIATE)", 12.5, "bold", AMBER)}
<circle cx="130" cy="210" r="42" fill="#f3d9a8" stroke="${INK}" stroke-width="2"/>
${[...Array(7)].map((_, i) => { const a = -Math.PI / 2 + (i * Math.PI) / 4.5; return `<line x1="${130 + 40 * Math.cos(a)}" y1="${210 + 40 * Math.sin(a)}" x2="${130 + 58 * Math.cos(a)}" y2="${210 + 58 * Math.sin(a)}" stroke="${TEAL}" stroke-width="2.6"/>`; }).join("")}
<path d="M118,132 l6,-14 l6,14 z" fill="${CRIM}"/>
<path d="M148,128 l6,-14 l6,14 z" fill="${CRIM}"/>
<path d="M126,118 q8,-14 26,-2" fill="none" stroke="${INK}" stroke-width="1.8"/>
${label(130, 290, "IgE-coated mast cell;", 11, INK, "middle")}${label(130, 306, "antigen cross-links IgE →", 11, INK, "middle")}${label(130, 322, "histamine release", 11, "bold", INK, "middle")}
${label(330, 130, "Examples:", 11.5, "bold", INK)}
${label(330, 150, "· Anaphylaxis", 11, INK)}
${label(330, 168, "· Bronchial asthma", 11, INK)}
${label(330, 186, "· Allergic rhinitis", 11, INK)}
${label(330, 204, "· Urticaria", 11, INK)}
${label(330, 236, "Time: minutes", 11, "bold", CRIM)}
${label(330, 254, "Mediator: IgE", 11, "bold", INK)}
${label(330, 272, "Test: skin prick, IgE levels", 10.5, INK)}
${box(500, 56, 450, 290, "#f4dfe2", CRIM)}
${label(522, 84, "TYPE II — CYTOTOXIC", 12.5, "bold", CRIM)}
<circle cx="600" cy="200" r="40" fill="#fbe9eb" stroke="${INK}" stroke-width="2"/>
${[...Array(8)].map((_, i) => { const a = (i * Math.PI) / 4; return `<path d="M${600 + 40 * Math.cos(a)},${200 + 40 * Math.sin(a)} l${14 * Math.cos(a)},${14 * Math.sin(a)}" stroke="${CRIM}" stroke-width="3"/>`; }).join("")}
<path d="M664,176 l40,-26 M664,224 l40,26" stroke="${INK}" stroke-width="1.6" stroke-dasharray="4 3"/>
${label(718, 150, "Ab + complement", 10.5, INK)}
${label(718, 258, "opsonization / lysis", 10.5, INK)}
${label(600, 282, "IgG/IgM against cell-surface", 11, INK, "middle")}${label(600, 298, "or matrix antigen", 11, INK, "middle")}
${label(820, 130, "Examples:", 11.5, "bold", INK)}
${label(820, 150, "· Transfusion reactions", 11, INK)}
${label(820, 168, "· HDN (Rh)", 11, INK)}
${label(820, 186, "· Autoimmune haemolytic", 11, INK)}
${label(820, 204, "  anaemia", 11, INK)}
${label(820, 222, "· Goodpasture syndrome", 11, INK)}
${label(820, 252, "Mediator: IgG / IgM", 11, "bold", INK)}
${box(30, 366, 450, 290, "#e3efec", TEAL)}
${label(52, 394, "TYPE III — IMMUNE COMPLEX", 12.5, "bold", TEAL)}
${[...Array(5)].map((_, i) => `<circle cx="${110 + i * 24}" cy="${470 - (i % 2) * 12}" r="9" fill="none" stroke="${CRIM}" stroke-width="2"/><circle cx="${122 + i * 24}" cy="${478 - (i % 2) * 12}" r="6" fill="${TEAL}"/>`).join("")}
<path d="M86,520 q100,40 200,0" fill="none" stroke="${INK}" stroke-width="3"/>
${label(186, 560, "complexes deposit in vessel wall →", 11, INK, "middle")}${label(186, 576, "neutrophils → vasculitis", 11, "bold", INK, "middle")}
${label(360, 440, "Examples:", 11.5, "bold", INK)}
${label(360, 460, "· Serum sickness", 11, INK)}
${label(360, 478, "· Arthus reaction", 11, INK)}
${label(360, 496, "· SLE, PAN", 11, INK)}
${label(360, 514, "· Post-streptococcal GN", 11, INK)}
${label(360, 544, "Time: hours (3–10 h)", 11, "bold", TEAL)}
${label(360, 562, "Mediator: IgG complexes", 11, "bold", INK)}
${box(500, 366, 450, 290, "#eef3f0", INK)}
${label(522, 394, "TYPE IV — DELAYED (CELL-MEDIATED)", 12.5, "bold", INK)}
<circle cx="600" cy="480" r="30" fill="#dfe9e4" stroke="${INK}" stroke-width="2"/>
${label(600, 484, "Th1", 11, "bold", INK, "middle")}
<circle cx="672" cy="480" r="26" fill="#f3d9a8" stroke="${INK}" stroke-width="2"/>
${label(672, 484, "MΦ", 11, "bold", INK, "middle")}
${[...Array(6)].map((_, i) => `<circle cx="${632 + (i % 3) * 6}" cy="${460 + i * 7}" r="2.4" fill="${CRIM}"/>`).join("")}
${label(620, 548, "cytokines activate macrophages →", 11, INK, "middle")}${label(620, 564, "granulomatous inflammation", 11, "bold", INK, "middle")}
${label(830, 440, "Examples:", 11.5, "bold", INK)}
${label(830, 460, "· Tuberculin (Mantoux)", 11, INK)}
${label(830, 478, "· Contact dermatitis", 11, INK)}
${label(830, 496, "· Graft rejection", 11, INK)}
${label(830, 514, "· Granulomas (TB)", 11, INK)}
${label(830, 544, "Time: 24–72 h", 11, "bold", CRIM)}
${label(830, 562, "Mediator: T cells (NO antibody)", 11, "bold", INK)}
${label(490, 684, "Types I, II, III = ANTIBODY-MEDIATED · Type IV = CELL-MEDIATED (the only delayed type)", 12, "bold", INK, "middle")}
</svg>`,
  },
  {
    slug: "malaria-life-cycle",
    systemSlug: "parasitology",
    title: "Life Cycle of Plasmodium vivax (Malaria)",
    caption:
      "Two-host cycle: asexual schizogony in man (exo-erythrocytic hepatic phase + erythrocytic phase producing fever paroxysms) and the sexual cycle (sporogony) in the female Anopheles mosquito, which transmits sporozoites.",
    labels: [
      "Infective stage: sporozoite (inoculated by mosquito bite)",
      "Exo-erythrocytic schizogony in hepatocytes (hypnozoites in P. vivax)",
      "Erythrocytic schizogony: ring → trophozoite → schizont → merozoites",
      "RBC rupture = fever paroxysm (48 h cycle in P. vivax — benign tertian)",
      "Gametocytes taken up by mosquito",
      "Sporogony in mosquito gut: zygote → ookinete → oocyst → sporozoites",
    ],
    examTip:
      "Draw two territories (MAN and MOSQUITO) with a bold dividing line; place asexual stages in man and sexual stages in the mosquito. Always mark the infective stage (sporozoite) and diagnostic stage (parasites in RBC smear).",
    drawingSteps: [
      "Draw the mosquito on the right, human zone on the left.",
      "Liver box with schizont; arrows to RBC cycle boxes (ring, trophozoite, schizont).",
      "Curved arrow from gametocytes to mosquito gut; oocyst on gut wall; sporozoites to salivary gland.",
      "Label infective and diagnostic stages.",
    ],
    svg: `<svg viewBox="0 0 980 720" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="980" height="720" fill="#fffdf8"/>
${label(490, 32, "FIGURE 3.1 — LIFE CYCLE OF PLASMODIUM VIVAX", 14, "bold", INK, "middle")}
<rect x="24" y="52" width="560" height="640" rx="14" fill="#f7faf7" stroke="${TEAL}" stroke-width="2" stroke-dasharray="8 6"/>
${label(64, 84, "MAN (intermediate host) — ASEXUAL CYCLE", 12.5, "bold", TEAL)}
<rect x="620" y="52" width="336" height="640" rx="14" fill="#fdf6e7" stroke="${AMBER}" stroke-width="2" stroke-dasharray="8 6"/>
${label(660, 84, "FEMALE ANOPHELES — SEXUAL CYCLE", 12.5, "bold", AMBER)}
${box(56, 116, 224, 64, "#e3efec", TEAL)}
${label(168, 140, "Sporozoites injected", 12, "bold", TEAL, "middle")}
${label(168, 158, "by mosquito bite", 11, INK, "middle")}
${arrow(168, 180, 168, 208)}
${box(40, 210, 256, 88, "#e3efec", TEAL)}
${label(168, 234, "EXO-ERYTHROCYTIC", 12, "bold", TEAL, "middle")}
${label(168, 252, "SCHIZOGONY (liver)", 12, "bold", TEAL, "middle")}
${label(168, 272, "schizont → thousands of", 10.5, INK, "middle")}${label(168, 286, "merozoites; HYPOZOITES = relapse", 10.5, "bold", CRIM, "middle")}
${arrow(296, 254, 348, 254)}
${box(350, 210, 216, 88, "#e3efec", TEAL)}
${label(458, 234, "ERYTHROCYTIC", 12, "bold", TEAL, "middle")}
${label(458, 252, "SCHIZOGONY", 12, "bold", TEAL, "middle")}
${label(458, 272, "ring → trophozoite →", 10.5, INK, "middle")}${label(458, 286, "schizont → merozoites", 10.5, INK, "middle")}
<path d="M458,298 L458,330" stroke="${INK}" stroke-width="1.8" marker-end="url(#arw)"/>
${box(336, 332, 244, 60, "#f4dfe2", CRIM)}
${label(458, 356, "RBC RUPTURE + merozoites", 12, "bold", CRIM, "middle")}
${label(458, 374, "→ FEVER PAROXYSM (every 48 h)", 11, INK, "middle")}
<path d="M336,362 L200,362 L200,298" stroke="${INK}" stroke-width="1.8" fill="none" marker-end="url(#arw)"/>
${label(196, 340, "re-infects", 10.5, INK, "end")}
${arrow(458, 392, 458, 420)}
${box(336, 422, 244, 60, "#e3efec", TEAL)}
${label(458, 446, "Some merozoites →", 11.5, "bold", TEAL, "middle")}
${label(458, 464, "GAMETOCYTES (♂ micro, ♀ macro)", 11, INK, "middle")}
${box(56, 540, 260, 84, "#f6efdc", AMBER)}
${label(186, 566, "DIAGNOSTIC STAGE", 12, "bold", AMBER, "middle")}
${label(186, 586, "parasites inside RBCs on", 11, INK, "middle")}${label(186, 604, "Giemsa-stained blood smear", 11, INK, "middle")}
<line x1="336" y1="452" x2="240" y2="540" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 3"/>
${box(56, 420, 244, 60, "#fffdf8", INK)}
${label(178, 444, "Clinical: chill → high fever →", 11, "bold", INK, "middle")}
${label(178, 462, "sweating; splenomegaly; anaemia", 11, INK, "middle")}
<path d="M580,452 C700,452 660,300 700,286" fill="none" stroke="${INK}" stroke-width="1.8" marker-end="url(#arw)"/>
${label(648, 420, "gametocytes", 10.5, INK)}
${label(648, 436, "ingested", 10.5, INK)}
${box(688, 236, 252, 60, "#fdf0d9", AMBER)}
${label(814, 258, "Gut: gametes → zygote", 11.5, "bold", AMBER, "middle")}
${label(814, 276, "→ motile OOKINETE", 11, INK, "middle")}
${arrow(814, 296, 814, 324)}
${box(688, 326, 252, 60, "#fdf0d9", AMBER)}
${label(814, 348, "OOCYST on gut wall", 11.5, "bold", AMBER, "middle")}
${label(814, 366, "thousands of sporozoites", 11, INK, "middle")}
${arrow(814, 386, 814, 414)}
${box(688, 416, 252, 60, "#fdf0d9", AMBER)}
${label(814, 438, "SPOROZOITES reach", 11.5, "bold", AMBER, "middle")}
${label(814, 456, "SALIVARY GLANDS", 11, INK, "middle")}
<path d="M688,446 C600,446 640,150 300,148" fill="none" stroke="${INK}" stroke-width="1.8" marker-end="url(#arw)"/>
${label(560, 120, "next bite infects man", 10.5, "bold", INK)}
${box(688, 540, 252, 84, "#fffdf8", INK)}
${label(814, 566, "INFECTIVE STAGE", 12, "bold", CRIM, "middle")}
${label(814, 586, "sporozoite (to man)", 11, INK, "middle")}
${label(814, 604, "Period: ~10–14 days in mosquito", 10.5, INK, "middle")}
${label(300, 660, "P. vivax: 48-h cycle = BENIGN TERTIAN malaria · relapses from hepatic hypnozoites (treat with primaquine)", 11.5, "bold", INK, "middle")}
</svg>`,
  },
  {
    slug: "ascaris-life-cycle",
    systemSlug: "parasitology",
    title: "Life Cycle of Ascaris lumbricoides (Round Worm)",
    caption:
      "Single-host (monoxenous) cycle with a mandatory lung migration: embryonated eggs are ingested, larvae hatch, penetrate the gut, travel via liver to lungs, ascend the trachea and are swallowed to mature into adults in the small intestine.",
    labels: [
      "Unembryonated egg passed in faeces",
      "Embryonated egg in soil = INFECTIVE STAGE",
      "Larvae hatch in small intestine",
      "Liver → lungs (Loeffler syndrome)",
      "Tracheal ascent, swallowed",
      "Adult worm in jejunum; egg in faeces = DIAGNOSTIC STAGE",
    ],
    examTip:
      "Trace the larval route as a loop: intestine → portal vein → liver → heart → lungs → trachea → oesophagus → intestine. Mark BOTH the infective stage (embryonated egg) and diagnostic stage (egg/adult in stool).",
    drawingSteps: [
      "Arrange boxes in a U-shaped circuit starting and ending at the small intestine.",
      "Add soil compartment at the start (egg embryonation, 2–3 weeks).",
      "Mark lungs with the clinical note (Loeffler syndrome, cough, eosinophilia).",
    ],
    svg: `<svg viewBox="0 0 980 560" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="980" height="560" fill="#fffdf8"/>
${label(490, 32, "FIGURE 3.2 — LIFE CYCLE OF ASCARIS LUMBRICOIDES", 14, "bold", INK, "middle")}
${box(30, 80, 210, 68, "#f6efdc", AMBER)}
${label(135, 106, "Unembryonated egg", 12, "bold", AMBER, "middle")}
${label(135, 124, "in FAECES", 11, INK, "middle")}
${label(135, 139, "(diagnostic stage)", 10, INK, "middle")}
${arrow(240, 114, 292, 114)}
${box(294, 80, 224, 68, "#f6efdc", AMBER)}
${label(406, 102, "EMBRYONATED EGG", 12, "bold", AMBER, "middle")}
${label(406, 120, "in soil (2–3 weeks)", 11, INK, "middle")}
${label(406, 136, "= INFECTIVE STAGE", 10.5, "bold", CRIM, "middle")}
${arrow(518, 114, 570, 114)}
${box(572, 80, 210, 68, "#e3efec", TEAL)}
${label(677, 106, "INGESTED with", 12, "bold", TEAL, "middle")}
${label(677, 124, "contaminated food/water", 11, INK, "middle")}
${arrow(782, 114, 834, 114)}
${box(836, 80, 120, 68, "#e3efec", TEAL)}
${label(896, 106, "Small", 12, "bold", TEAL, "middle")}
${label(896, 124, "intestine", 12, "bold", TEAL, "middle")}
<path d="M896,148 L896,190" stroke="${INK}" stroke-width="1.8" marker-end="url(#arw)"/>
${box(770, 192, 186, 60, "#fdf0d9", INK)}
${label(863, 216, "Larvae hatch, penetrate", 11.5, "bold", INK, "middle")}
${label(863, 234, "gut wall → portal blood", 11, INK, "middle")}
<path d="M770,222 L640,222" stroke="${INK}" stroke-width="1.8" marker-end="url(#arw)"/>
${box(470, 192, 168, 60, "#fdf0d9", INK)}
${label(554, 216, "LIVER", 12, "bold", INK, "middle")}
${label(554, 234, "(via portal vein)", 10.5, INK, "middle")}
<path d="M470,222 L348,222" stroke="${INK}" stroke-width="1.8" marker-end="url(#arw)"/>
${box(170, 192, 176, 60, "#f4dfe2", CRIM)}
${label(258, 216, "LUNGS (alveoli)", 12, "bold", CRIM, "middle")}
${label(258, 234, "Loeffler syndrome", 10.5, INK, "middle")}
<path d="M258,252 L258,296" stroke="${INK}" stroke-width="1.8" marker-end="url(#arw)"/>
${box(140, 298, 240, 60, "#fdf0d9", INK)}
${label(260, 322, "Ascend TRACHEA →", 11.5, "bold", INK, "middle")}
${label(260, 340, "pharynx → SWALLOWED", 11.5, INK, "middle")}
<path d="M380,328 L470,328" stroke="${INK}" stroke-width="1.8" marker-end="url(#arw)"/>
${box(472, 298, 240, 60, "#e3efec", TEAL)}
${label(592, 322, "ADULT WORM in jejunum", 12, "bold", TEAL, "middle")}
${label(592, 340, "(♀ 20–35 cm; ♂ 15–30 cm)", 10.5, INK, "middle")}
<path d="M592,358 L592,398" stroke="${INK}" stroke-width="1.8" marker-end="url(#arw)"/>
${box(452, 400, 280, 60, "#f6efdc", AMBER)}
${label(592, 424, "Fertilized eggs in stool", 12, "bold", AMBER, "middle")}
${label(592, 442, "(mamillated) → cycle repeats", 11, INK, "middle")}
${box(30, 298, 90, 60, "#fffdf8", INK)}
${label(75, 322, "cough,", 10.5, INK, "middle")}${label(75, 338, "eosinophilia", 10.5, "bold", CRIM, "middle")}
<line x1="120" y1="328" x2="140" y2="328" stroke="${INK}" stroke-width="1.2" stroke-dasharray="3 3"/>
${box(770, 298, 186, 92, "#fffdf8", INK)}
${label(863, 322, "Complications:", 11, "bold", INK, "middle")}
${label(863, 342, "intestinal obstruction", 10.5, INK, "middle")}
${label(863, 358, "(children, heavy load),", 10.5, INK, "middle")}
${label(863, 374, "biliary ascariasis,", 10.5, INK, "middle")}
${label(863, 388, "aberrant migration", 10.5, INK, "middle")}
${label(490, 512, "No secondary host · cycle: soil (embryonation) → gut → lung migration → gut. Treatment: albendazole.", 11.5, "bold", INK, "middle")}
</svg>`,
  },
  {
    slug: "inflammation-events",
    systemSlug: "general-pathology",
    title: "Acute Inflammation — Vascular and Cellular Events",
    caption:
      "The stereotyped sequence of acute inflammation: transient vasoconstriction followed by arteriolar vasodilatation, increased vascular permeability and exudation (vascular events), then margination, rolling, adhesion, transmigration, chemotaxis and phagocytosis (cellular events).",
    labels: [
      "Transient arteriolar vasoconstriction (seconds)",
      "Vasodilatation → heat and redness (rubor, calor)",
      "Increased permeability → exudate → swelling (tumor)",
      "Margination → rolling (selectins) → firm adhesion (integrins)",
      "Transmigration (diapedesis) and chemotaxis",
      "Phagocytosis: recognition → engulfment → killing",
    ],
    examTip:
      "Split the answer into VASCULAR and CELLULAR events as two flowcharts. Name the mediators beside each step (histamine, C3a/C5a, IL-8, LTB4) — this is where the marks are.",
    drawingSteps: [
      "Top row: four vascular boxes with arrows, note rubor/calor/tumor under each.",
      "Bottom row: six cellular boxes from margination to killing.",
      "Add a vertical link 'exudate dilutes toxin; fibrin walls off' between the rows.",
    ],
    svg: `<svg viewBox="0 0 1000 620" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="1000" height="620" fill="#fffdf8"/>
${label(500, 32, "FIGURE 4.1 — ACUTE INFLAMMATION: VASCULAR AND CELLULAR EVENTS", 14, "bold", INK, "middle")}
${label(60, 76, "VASCULAR EVENTS", 12.5, "bold", CRIM)}
${box(40, 92, 200, 78, "#f4dfe2", CRIM)}
${label(140, 118, "Transient", 12, "bold", CRIM, "middle")}
${label(140, 136, "vasoconstriction", 12, "bold", CRIM, "middle")}
${label(140, 156, "(seconds; neurally", 10, INK, "middle")}${label(140, 168, "mediated)", 10, INK, "middle")}
${arrow(240, 130, 272, 130)}
${box(274, 92, 210, 78, "#f4dfe2", CRIM)}
${label(379, 118, "Vasodilatation", 12, "bold", CRIM, "middle")}
${label(379, 138, "arterioles → ↑ flow", 10.5, INK, "middle")}
${label(379, 156, "histamine, NO, PGs", 10, "bold", AMBER, "middle")}
${arrow(484, 130, 516, 130)}
${box(518, 92, 210, 78, "#f4dfe2", CRIM)}
${label(623, 118, "↑ Permeability", 12, "bold", CRIM, "middle")}
${label(623, 138, "venular gaps →", 10.5, INK, "middle")}
${label(623, 156, "protein-rich EXUDATE", 10, "bold", AMBER, "middle")}
${arrow(728, 130, 760, 130)}
${box(762, 92, 200, 78, "#f4dfe2", CRIM)}
${label(862, 118, "Stasis +", 12, "bold", CRIM, "middle")}
${label(862, 136, "margination of", 12, "bold", CRIM, "middle")}
${label(862, 154, "leucocytes", 12, "bold", CRIM, "middle")}
${label(379, 192, "→ RUBOR and CALOR", 10.5, "bold", CRIM, "middle")}
${label(623, 192, "→ TUMOR (swelling) and DOLOR", 10.5, "bold", CRIM, "middle")}
${label(500, 240, "Exudate: dilutes toxin · brings antibodies · fibrin walls off the focus (dolor = prostaglandins + bradykinin)", 11, INK, "middle")}
${label(60, 286, "CELLULAR EVENTS (neutrophils first, then macrophages)", 12.5, "bold", TEAL)}
${box(24, 302, 140, 74, "#e3efec", TEAL)}
${label(94, 330, "MARGINATION", 11.5, "bold", TEAL, "middle")}
${label(94, 348, "cells move to", 9.5, INK, "middle")}${label(94, 360, "vessel wall", 9.5, INK, "middle")}
${arrow(164, 338, 188, 338)}
${box(190, 302, 140, 74, "#e3efec", TEAL)}
${label(260, 330, "ROLLING", 11.5, "bold", TEAL, "middle")}
${label(260, 348, "loose contact via", 9.5, INK, "middle")}${label(260, 360, "SELECTINS", 9.5, "bold", AMBER, "middle")}
${arrow(330, 338, 354, 338)}
${box(356, 302, 140, 74, "#e3efec", TEAL)}
${label(426, 330, "ADHESION", 11.5, "bold", TEAL, "middle")}
${label(426, 348, "firm, via", 9.5, INK, "middle")}${label(426, 360, "INTEGRINS (CD11/18)", 9.5, "bold", AMBER, "middle")}
${arrow(496, 338, 520, 338)}
${box(522, 302, 150, 74, "#e3efec", TEAL)}
${label(597, 330, "TRANSMIGRATION", 11.5, "bold", TEAL, "middle")}
${label(597, 348, "(diapedesis)", 9.5, INK, "middle")}
${label(597, 360, "PECAM-1", 9.5, "bold", AMBER, "middle")}
${arrow(672, 338, 696, 338)}
${box(698, 302, 140, 74, "#e3efec", TEAL)}
${label(768, 330, "CHEMOTAXIS", 11.5, "bold", TEAL, "middle")}
${label(768, 348, "C5a, IL-8, LTB4,", 9.5, INK, "middle")}${label(768, 360, "bacterial products", 9.5, INK, "middle")}
${arrow(838, 338, 862, 338)}
${box(864, 302, 116, 74, "#f6efdc", AMBER)}
${label(922, 330, "PHAGO-", 11.5, "bold", AMBER, "middle")}
${label(922, 346, "CYTOSIS", 11.5, "bold", AMBER, "middle")}
${box(60, 402, 880, 92, "#eef3f0", INK)}
${label(500, 428, "PHAGOCYTOSIS — THREE STEPS", 12, "bold", TEAL, "middle")}
${label(500, 452, "1. Recognition &amp; attachment (opsonins: IgG-Fc, C3b) → 2. Engulfment (pseudopods → phagosome → phagolysosome)", 11, INK, "middle")}
${label(500, 472, "3. Killing: O2-dependent (respiratory burst → H2O2–MPO–halide system = main killer) and O2-independent (lysozyme, lactoferrin, defensins)", 11, INK, "middle")}
${label(500, 530, "OUTCOMES: resolution · suppuration (abscess) · organization / fibrosis · chronic inflammation · systemic effects (fever, leucocytosis)", 12, "bold", INK, "middle")}
${label(500, 560, "Cardinal signs (Celsus): RUBOR · TUMOR · CALOR · DOLOR · FUNCTIO LAESA (Virchow)", 11.5, "bold", CRIM, "middle")}
</svg>`,
  },
  {
    slug: "metastasis-routes",
    systemSlug: "general-pathology",
    title: "Routes of Metastasis (Spread of Malignant Tumours)",
    caption:
      "The three principal routes of metastatic spread: lymphatic (carcinomas → regional lymph nodes), haematogenous (sarcomas and late carcinomas → liver and lungs), and direct seeding of body cavities.",
    labels: [
      "Primary malignant tumour",
      "Lymphatic spread → regional lymph nodes (carcinomas)",
      "Haematogenous spread → liver, lungs, bone, brain (sarcomas favour this route)",
      "Direct invasion / seeding of serous cavities (e.g. Krukenberg tumour)",
    ],
    examTip:
      "State the rule: carcinomas spread first by LYMPHATICS, sarcoms by BLOOD — then list the exceptions (renal cell carcinoma and hepatocellular carcinoma invade veins early; choriocarcinoma is haematogenous).",
    drawingSteps: [
      "Draw the primary tumour as an irregular mass in the centre.",
      "Three labelled arrows: to a bean-shaped node (lymphatic), to liver + lung shapes (haematogenous), to a peritoneal cavity line (seeding).",
      "Add the carcinomas/sarcomas rule below.",
    ],
    svg: `<svg viewBox="0 0 960 600" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="960" height="600" fill="#fffdf8"/>
${label(480, 32, "FIGURE 4.2 — ROUTES OF METASTASIS", 14, "bold", INK, "middle")}
<path d="M430,300 c-30,-50 20,-90 60,-70 c40,-20 90,10 80,50 c30,30 -10,80 -50,70 c-40,20 -90,-10 -90,-50 z" fill="#f4dfe2" stroke="${CRIM}" stroke-width="2.6"/>
${label(480, 296, "PRIMARY", 12.5, "bold", CRIM, "middle")}
${label(480, 314, "MALIGNANT", 12.5, "bold", CRIM, "middle")}
${label(480, 332, "TUMOUR", 12.5, "bold", CRIM, "middle")}
<path d="M420,262 L240,150" stroke="${INK}" stroke-width="2" marker-end="url(#arw)"/>
<path d="M242,148 c-16,-26 -52,-20 -56,6 c-18,10 -8,38 14,40 c10,18 44,14 52,-4 c20,-2 20,-32 -10,-42 z" fill="#e3efec" stroke="${TEAL}" stroke-width="2.2"/>
${label(200, 120, "1. LYMPHATIC SPREAD", 12.5, "bold", TEAL)}
${label(200, 138, "regional lymph nodes", 11, INK)}
${label(200, 236, "typical of CARCINOMAS", 11, "bold", TEAL)}
${label(200, 252, "e.g. breast → axillary nodes;", 10.5, INK)}
${label(200, 268, "stomach → supraclavicular", 10.5, INK)}
${label(200, 284, "(Virchow node)", 10.5, INK)}
<path d="M560,262 L730,140" stroke="${INK}" stroke-width="2" marker-end="url(#arw)"/>
<path d="M740,110 c20,-18 56,-8 58,14 c18,2 22,30 0,36 c-6,16 -44,14 -50,-2 c-20,-4 -22,-36 -8,-48 z" fill="#fdf0d9" stroke="${AMBER}" stroke-width="2.2"/>
<path d="M820,150 c14,-24 52,-16 54,6 c16,6 10,34 -10,34 c-6,12 -40,8 -46,-6 c-14,-8 -10,-26 2,-34 z" fill="#fdf0d9" stroke="${AMBER}" stroke-width="2.2"/>
${label(760, 104, "2. HAEMATOGENOUS SPREAD", 12.5, "bold", AMBER)}
${label(806, 214, "LIVER and LUNGS most common;", 11, "bold", AMBER)}
${label(806, 230, "also bone, brain, adrenals", 11, INK)}
${label(806, 246, "typical of SARCOMAS; also RCC,", 10.5, INK)}
${label(806, 262, "HCC, follicular thyroid Ca,", 10.5, INK)}
${label(806, 278, "choriocarcinoma", 10.5, INK)}
<path d="M470,360 L420,470" stroke="${INK}" stroke-width="2" marker-end="url(#arw)"/>
<path d="M240,480 q180,-30 380,0" fill="none" stroke="${INK}" stroke-width="2.4"/>
<circle cx="300" cy="470" r="9" fill="#f4dfe2" stroke="${CRIM}" stroke-width="2"/>
<circle cx="420" cy="462" r="9" fill="#f4dfe2" stroke="${CRIM}" stroke-width="2"/>
<circle cx="540" cy="470" r="9" fill="#f4dfe2" stroke="${CRIM}" stroke-width="2"/>
${label(420, 516, "3. SEEDING of BODY CAVITIES", 12.5, "bold", INK, "middle")}
${label(420, 534, "e.g. gastric carcinoma → ovary = KRUKENBERG TUMOUR; ovarian Ca → peritoneum", 11, INK, "middle")}
${box(640, 400, 290, 120, "#eef3f0", INK)}
${label(785, 428, "INVASION — THE PREREQUISITE", 11.5, "bold", TEAL, "middle")}
${label(785, 452, "1. Loosening (↓ E-cadherin)", 10.5, INK, "middle")}
${label(785, 470, "2. Attachment (laminin/fibronectin R)", 10.5, INK, "middle")}
${label(785, 488, "3. ECM degradation (MMPs, collagenases)", 10.5, INK, "middle")}
${label(785, 506, "4. Migration (autocrine motility factors)", 10.5, INK, "middle")}
${label(240, 340, "Metastasis ≠ anaplasia: benign tumours", 10.5, INK)}
${label(240, 356, "NEVER metastasise — this is the single", 10.5, INK)}
${label(240, 372, "most reliable criterion of malignancy.", 10.5, "bold", CRIM)}
</svg>`,
  },
  {
    slug: "cox-inhibition",
    systemSlug: "pharmacology",
    title: "Arachidonic Acid Pathway and Sites of NSAID Action",
    caption:
      "Membrane phospholipids yield arachidonic acid via phospholipase A2 (blocked by corticosteroids). Cyclo-oxygenase (COX-1/COX-2) converts it to prostaglandins and thromboxane — the step blocked by aspirin and other NSAIDs; the lipoxygenase pathway yields leukotrienes.",
    labels: [
      "Membrane phospholipids",
      "Phospholipase A2 (inhibited by corticosteroids)",
      "Arachidonic acid",
      "COX pathway (inhibited by NSAIDs/aspirin)",
      "TXA2 — platelet aggregation",
      "PGE2/PGI2 — pain, fever, inflammation, gastric protection",
      "LOX pathway — leukotrienes (bronchoconstriction)",
    ],
    examTip:
      "This single diagram answers: MOA of NSAIDs, why aspirin causes bleeding (TXA2 block), why it causes gastritis (PGE2 loss), why it precipitates asthma (shunting to LOX), and where steroids act.",
    drawingSteps: [
      "Top box: membrane phospholipids; downward arrow labelled phospholipase A2 with a T-bar for steroids.",
      "Split into left COX branch (blocked by NSAIDs — draw a T-bar) and right LOX branch.",
      "End products: TXA2, PGI2, PGE2 on the left; LTC4/LTD4 on the right; write one effect under each.",
    ],
    svg: `<svg viewBox="0 0 940 640" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="940" height="640" fill="#fffdf8"/>
${label(470, 32, "FIGURE 5.1 — ARACHIDONIC ACID PATHWAY &amp; NSAID SITES OF ACTION", 14, "bold", INK, "middle")}
${box(330, 56, 280, 48, "#e3efec", TEAL)}
${label(470, 84, "Membrane phospholipids", 12.5, "bold", TEAL, "middle")}
${arrow(470, 104, 470, 148)}
${label(486, 130, "Phospholipase A2", 11, "bold", INK)}
<line x1="540" y1="128" x2="596" y2="128" stroke="${INK}" stroke-width="1.6"/>
${box(598, 106, 200, 44, "#f6efdc", AMBER)}
${label(698, 124, "CORTICOSTEROIDS", 11.5, "bold", AMBER, "middle")}
${label(698, 141, "block PLA2 (lipocortin)", 10, INK, "middle")}
<line x1="598" y1="128" x2="560" y2="128" stroke="${CRIM}" stroke-width="3"/>
<line x1="560" y1="118" x2="560" y2="138" stroke="${CRIM}" stroke-width="3"/>
${box(330, 150, 280, 48, "#e3efec", TEAL)}
${label(470, 178, "ARACHIDONIC ACID", 12.5, "bold", TEAL, "middle")}
<path d="M420,198 L280,250" stroke="${INK}" stroke-width="1.8" marker-end="url(#arw)"/>
<path d="M520,198 L660,250" stroke="${INK}" stroke-width="1.8" marker-end="url(#arw)"/>
${box(150, 252, 260, 52, "#f4dfe2", CRIM)}
${label(280, 274, "CYCLO-OXYGENASE", 12.5, "bold", CRIM, "middle")}
${label(280, 292, "COX-1 (constitutive) · COX-2 (inducible)", 10, INK, "middle")}
${box(540, 252, 260, 52, "#e3efec", TEAL)}
${label(670, 274, "LIPOXYGENASE (LOX)", 12.5, "bold", TEAL, "middle")}
${label(670, 292, "5-LOX → leukotrienes", 10, INK, "middle")}
<line x1="420" y1="260" x2="470" y2="240" stroke="${CRIM}" stroke-width="0"/>
${box(414, 208, 112, 34, "none", "none")}
<line x1="470" y1="222" x2="470" y2="240" stroke="${CRIM}" stroke-width="3"/>
<line x1="450" y1="240" x2="490" y2="240" stroke="${CRIM}" stroke-width="3"/>
${label(470, 216, "ASPIRIN / NSAIDs", 11, "bold", CRIM, "middle")}
${label(470, 200, "block COX", 10, CRIM, "middle")}
${arrow(280, 304, 280, 348)}
${box(90, 350, 180, 46, "#fdf0d9", INK)}
${label(180, 370, "TXA2", 12, "bold", INK, "middle")}
${label(180, 387, "platelet aggregation", 10, INK, "middle")}
${box(290, 350, 180, 46, "#fdf0d9", INK)}
${label(380, 370, "PGE2 · PGD2", 12, "bold", INK, "middle")}
${label(380, 387, "pain · fever · inflammation", 10, INK, "middle")}
${box(490, 350, 180, 46, "#fdf0d9", INK)}
${label(580, 370, "PGI2", 12, "bold", INK, "middle")}
${label(580, 387, "cytoprotective, renal flow", 10, INK, "middle")}
<path d="M180,304 L180,350" stroke="${INK}" stroke-width="1.4"/>
<path d="M380,304 L380,350" stroke="${INK}" stroke-width="1.4"/>
<path d="M560,304 L580,350" stroke="${INK}" stroke-width="1.4"/>
${arrow(670, 304, 670, 348)}
${box(700, 350, 180, 46, "#e3efec", TEAL)}
${label(790, 370, "LTC4 · LTD4 · LTE4", 11.5, "bold", TEAL, "middle")}
${label(790, 387, "bronchoconstriction", 10, INK, "middle")}
${box(60, 430, 820, 170, "#eef3f0", INK)}
${label(470, 458, "WHY? — CLINICAL CONSEQUENCES OF COX BLOCKADE", 12, "bold", TEAL, "middle")}
${label(470, 484, "↓ TXA2 → antiplatelet effect (low-dose aspirin in MI/stroke prophylaxis) BUT ↑ bleeding tendency", 10.8, INK, "middle")}
${label(470, 504, "↓ PGE2 → analgesic, antipyretic, anti-inflammatory — but loss of gastric cytoprotection → gastritis, ulcer, GI bleed", 10.8, INK, "middle")}
${label(470, 524, "COX block shunts arachidonate to LOX → ↑ leukotrienes → bronchospasm (aspirin-induced asthma)", 10.8, INK, "middle")}
${label(470, 546, "↓ renal PGI2/PGE2 → Na+ &amp; water retention, renal impairment · COX-2 selective drugs spare COX-1 (less GI damage, but ↑ CV risk)", 10.8, INK, "middle")}
${label(470, 578, "Aspirin = IRREVERSIBLE acetylation of COX (platelets cannot regenerate the enzyme → effect lasts the platelet's life, 8–10 days)", 11, "bold", CRIM, "middle")}
</svg>`,
  },
  {
    slug: "necrosis-apoptosis",
    systemSlug: "general-pathology",
    title: "Necrosis vs Apoptosis — Morphological Comparison",
    caption:
      "Necrosis: cell swelling, membrane rupture, karyolysis/karyorrhexis/pyknosis with surrounding inflammation. Apoptosis: cell shrinkage, membrane blebbing into apoptotic bodies, chromatin condensation, no inflammation.",
    labels: [
      "Necrosis — swelling, membrane disruption, karyolysis, inflammation",
      "Apoptosis — shrinkage, blebs, apoptotic bodies, phagocytosis without inflammation",
      "Nuclear changes: pyknosis → karyorrhexis → karyolysis",
    ],
    examTip:
      "Draw the paired panels: one swollen, leaking cell with neutrophils; one shrunken cell fragmenting into neat bodies beside a macrophage. The 'inflammation: YES vs NO' line earns easy marks.",
    drawingSteps: [
      "Left: swollen cell with ruptured membrane + spilled contents + neutrophil dots.",
      "Nucleus sequence: pyknosis → karyorrhexis → karyolysis in three small circles.",
      "Right: shrunken cell with blebs breaking into apoptotic bodies + a macrophage engulfing one.",
    ],
    svg: `<svg viewBox="0 0 960 560" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="960" height="560" fill="#fffdf8"/>
${label(480, 32, "FIGURE 4.3 — NECROSIS vs APOPTOSIS (CELL DEATH)", 14, "bold", INK, "middle")}
${box(30, 56, 440, 440, "#f4dfe2", CRIM)}
${label(250, 84, "NECROSIS (pathological)", 12.5, "bold", CRIM, "middle")}
<ellipse cx="180" cy="220" rx="98" ry="84" fill="#fbe9eb" stroke="${CRIM}" stroke-width="2.4"/>
<path d="M258,180 l26,-14 M270,230 l30,6 M252,272 l22,22" stroke="${CRIM}" stroke-width="2.6"/>
<circle cx="180" cy="216" r="34" fill="none" stroke="${INK}" stroke-width="1.6" stroke-dasharray="5 4"/>
${label(180, 220, "ghost", 10, INK, "middle")}${label(180, 234, "nucleus", 10, INK, "middle")}
${[...Array(10)].map((_, i) => `<circle cx="${300 + (i % 5) * 26}" cy="${150 + Math.floor(i / 5) * 130 + (i % 3) * 8}" r="6" fill="none" stroke="${AMBER}" stroke-width="1.6"/>`).join("")}
${label(356, 130, "enzymes leak →", 10.5, INK)}
${label(356, 300, "neutrophilic", 10.5, INK)}
${label(356, 316, "inflammation", 10.5, "bold", CRIM)}
${box(56, 330, 388, 62, "#fffdf8", CRIM)}
${label(250, 352, "Nuclear changes: PYKNOSIS (shrinkage)", 11, "bold", INK, "middle")}
${label(250, 370, "→ KARYORRHEXIS (fragmentation) → KARYOLYSIS (fading)", 11, "bold", INK, "middle")}
${label(250, 416, "Cell SWELLING · membrane RUPTURE", 11, "bold", CRIM, "middle")}
${label(250, 436, "Inflammation: ALWAYS PRESENT", 11.5, "bold", CRIM, "middle")}
${label(250, 462, "ATP depletion · always pathological", 10.5, INK, "middle")}
${box(490, 56, 440, 440, "#e3efec", TEAL)}
${label(710, 84, "APOPTOSIS (programmed)", 12.5, "bold", TEAL, "middle")}
<circle cx="650" cy="200" r="58" fill="#dfe9e4" stroke="${TEAL}" stroke-width="2.4"/>
<path d="M700,166 q26,-10 24,12 q20,6 8,24" fill="#dfe9e4" stroke="${TEAL}" stroke-width="2.2"/>
<circle cx="650" cy="200" r="26" fill="${TEAL}" opacity="0.35"/>
<circle cx="768" cy="170" r="13" fill="#dfe9e4" stroke="${TEAL}" stroke-width="2"/>
<circle cx="786" cy="216" r="10" fill="#dfe9e4" stroke="${TEAL}" stroke-width="2"/>
<circle cx="760" cy="256" r="12" fill="#dfe9e4" stroke="${TEAL}" stroke-width="2"/>
${label(820, 160, "apoptotic", 10.5, INK)}${label(820, 174, "bodies", 10.5, INK)}
<ellipse cx="700" cy="330" rx="64" ry="42" fill="#f3d9a8" stroke="${INK}" stroke-width="2.2"/>
<path d="M660,318 q-16,-18 4,-24 M742,318 q18,-16 -2,-24" stroke="${INK}" stroke-width="1.8" fill="none"/>
${label(700, 334, "macrophage", 10.5, "bold", INK, "middle")}
<line x1="760" y1="262" x2="724" y2="300" stroke="${INK}" stroke-width="1.6" marker-end="url(#arw)"/>
${label(820, 300, "engulfed, NO", 10.5, INK)}
${label(820, 316, "inflammation", 10.5, "bold", TEAL)}
${label(710, 416, "Cell SHRINKAGE · membrane BLEBS (intact)", 11, "bold", TEAL, "middle")}
${label(710, 436, "Inflammation: ABSENT", 11.5, "bold", TEAL, "middle")}
${label(710, 462, "Caspase cascade · can be physiological or pathological", 10.5, INK, "middle")}
${label(480, 534, "Apoptosis = single-cell 'suicide' with tidy packaging; necrosis = messy 'accident' that recruits neutrophils.", 11.5, "bold", INK, "middle")}
</svg>`,
  },
  {
    slug: "penicillin-moa",
    systemSlug: "pharmacology",
    title: "Mechanism of Action of Penicillins (β-Lactams)",
    caption:
      "Penicillins bind penicillin-binding proteins (PBPs), inhibiting the transpeptidation step of peptidoglycan synthesis; autolysins then degrade the weakened wall and the bacterium undergoes osmotic lysis. Effect is time-dependent and maximal in the log phase.",
    labels: [
      "β-lactam ring (essential for activity)",
      "Penicillin-binding proteins (PBPs = transpeptidases)",
      "Transpeptidation (cross-linking) blocked",
      "Autolysins continue → wall weakening",
      "Osmotic lysis (bactericidal)",
    ],
    examTip:
      "Always mention the β-lactam ring, PBPs and autolysin-mediated lysis. Add that β-lactamases hydrolyse the ring — the commonest resistance mechanism.",
    drawingSteps: [
      "Draw the wall as a brick band (NAG–NAM strands) with cross-links.",
      "Show a drug molecule capping a PBP; cross-links absent beyond that point.",
      "End with a bursting cell (lysis).",
    ],
    svg: `<svg viewBox="0 0 940 560" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="940" height="560" fill="#fffdf8"/>
${label(470, 32, "FIGURE 5.2 — MECHANISM OF ACTION OF PENICILLINS", 14, "bold", INK, "middle")}
<rect x="70" y="120" width="330" height="86" fill="#e3efec" stroke="${TEAL}" stroke-width="2.4"/>
${[...Array(5)].map((_, r) => `<line x1="70" y1="${134 + r * 14}" x2="400" y2="${134 + r * 14}" stroke="${TEAL}" stroke-width="1.1"/>`).join("")}
${[...Array(6)].map((_, c) => `<line x1="${96 + c * 52}" y1="120" x2="${96 + c * 52}" y2="206" stroke="${TEAL}" stroke-width="1.1"/>`).join("")}
${label(235, 232, "Normal peptidoglycan:", 11.5, "bold", TEAL, "middle")}
${label(235, 250, "NAG–NAM strands CROSS-LINKED by transpeptidase (PBP)", 10.5, INK, "middle")}
<path d="M560,120 a46,46 0 1 1 -2,92 a34,34 0 1 0 2,-92 z" fill="#f4dfe2" stroke="${CRIM}" stroke-width="2.4"/>
${label(600, 172, "β-lactam", 11, "bold", CRIM, "middle")}
${arrow(560, 214, 480, 250)}
${label(560, 244, "binds PBP", 11, "bold", INK)}
${box(300, 262, 360, 66, "#f6efdc", AMBER)}
${label(480, 288, "TRANSPEPTIDATION BLOCKED", 12.5, "bold", AMBER, "middle")}
${label(480, 308, "no cross-links → weak wall", 11, INK, "middle")}
${arrow(480, 328, 480, 362)}
${box(280, 364, 400, 56, "#e3efec", TEAL)}
${label(480, 388, "AUTOLYSINS continue to cut", 12, "bold", TEAL, "middle")}
${label(480, 406, "existing peptidoglycan", 10.5, INK, "middle")}
${arrow(480, 420, 480, 450)}
${box(300, 452, 360, 56, "#f4dfe2", CRIM)}
${label(480, 476, "OSMOTIC LYSIS — BACTERICIDAL", 12.5, "bold", CRIM, "middle")}
${label(480, 494, "(maximal in actively dividing log-phase cells)", 10.5, INK, "middle")}
${box(30, 320, 200, 130, "#fffdf8", INK)}
${label(130, 348, "RESISTANCE", 12, "bold", CRIM, "middle")}
${label(130, 372, "1. β-lactamase", 10.5, INK, "middle")}
${label(130, 390, "2. Altered PBP", 10.5, INK, "middle")}
${label(130, 406, "(MRSA: mecA → PBP2a)", 10, INK, "middle")}
${label(130, 424, "3. ↓ permeability", 10.5, INK, "middle")}
${label(130, 440, "4. Efflux pumps", 10.5, INK, "middle")}
${box(720, 320, 190, 130, "#fffdf8", INK)}
${label(815, 348, "PROTECT THE RING", 11.5, "bold", TEAL, "middle")}
${label(815, 372, "β-lactamase inhibitors:", 10.5, INK, "middle")}
${label(815, 390, "clavulanic acid,", 10.5, INK, "middle")}
${label(815, 406, "sulbactam, tazobactam", 10.5, INK, "middle")}
${label(815, 430, "e.g. amoxicillin +", 10.5, INK, "middle")}
${label(815, 446, "clavulanate", 10.5, "bold", INK, "middle")}
</svg>`,
  },
  {
    slug: "labdx-malaria",
    systemSlug: "parasitology",
    title: "Laboratory Diagnosis of Malaria — Diagnostic Algorithm",
    caption:
      "Peripheral blood smear (thick film for detection, thin film for species identification) remains the gold standard; rapid antigen tests (HRP-2/pLDH) support field diagnosis; PCR is the reference method for low parasitaemia.",
    labels: [
      "Thick smear — concentration, detection",
      "Thin smear — species and stage identification (Giemsa)",
      "RDT — HRP-2 (P. falciparum), pLDH/aldolase (pan-Plasmodium)",
      "QBC — quantitative buffy coat (fluorescent)",
      "PCR — most sensitive",
    ],
    examTip:
      "State specimen timing (during fever/rigors, before antimalarials), thick vs thin film roles, and one line on each RDT antigen. End with the algorithm arrow-line.",
    drawingSteps: [
      "Vertical chain: clinical suspicion → thick + thin smear → positive: species + parasitaemia.",
      "Side box: RDT (if smear not possible).",
      "Bottom: PCR/QBC as special methods.",
    ],
    svg: `<svg viewBox="0 0 780 760" role="img" xmlns="http://www.w3.org/2000/svg">
${defs}
<rect x="0" y="0" width="780" height="760" fill="#fffdf8"/>
${label(390, 32, "FIGURE 3.3 — LABORATORY DIAGNOSIS OF MALARIA", 14, "bold", INK, "middle")}
${box(250, 56, 280, 52, "#f4dfe2", CRIM)}
${label(390, 78, "Clinical suspicion", 12, "bold", CRIM, "middle")}
${label(390, 96, "fever with chills &amp; rigors, splenomegaly", 10, INK, "middle")}
${arrow(390, 108, 390, 136)}
${box(226, 138, 328, 52, "#e3efec", TEAL)}
${label(390, 158, "Blood specimen", 12, "bold", TEAL, "middle")}
${label(390, 177, "during fever, BEFORE antimalarials", 10.5, INK, "middle")}
${arrow(390, 190, 300, 222)}
${arrow(390, 190, 480, 222)}
${box(150, 224, 290, 78, "#fdf6e7", AMBER)}
${label(295, 248, "THICK SMEAR", 12, "bold", AMBER, "middle")}
${label(295, 268, "lysed RBCs, concentrated —", 10.5, INK, "middle")}
${label(295, 284, "DETECTION (gold standard screen)", 10.5, "bold", INK, "middle")}
${box(340, 224, 290, 78, "#fdf6e7", AMBER)}
${label(485, 248, "THIN SMEAR", 12, "bold", AMBER, "middle")}
${label(485, 268, "intact RBCs, Giemsa —", 10.5, INK, "middle")}
${label(485, 284, "SPECIES ID + parasitaemia %", 10.5, "bold", INK, "middle")}
${arrow(390, 302, 390, 332)}
${box(226, 334, 328, 60, "#e3efec", TEAL)}
${label(390, 356, "P. vivax: ring + Schüffner's dots,", 11, "bold", TEAL, "middle")}
${label(390, 374, "enlarged RBCs · P. falciparum: multiple", 11, "bold", TEAL, "middle")}
${label(390, 390, "rings, appliqué forms, banana gametocyte", 10.5, INK, "middle")}
<path d="M554,364 L640,364" stroke="${INK}" stroke-width="0"/>
${box(46, 420, 320, 96, "#fffdf8", INK)}
${label(206, 446, "RAPID DIAGNOSTIC TEST (RDT)", 12, "bold", INK, "middle")}
${label(206, 468, "HRP-2 → P. falciparum", 10.8, INK, "middle")}
${label(206, 486, "pLDH / aldolase → pan-species", 10.8, INK, "middle")}
${label(206, 502, "field use; result in 15 min", 10.5, INK, "middle")}
${box(414, 420, 320, 96, "#fffdf8", INK)}
${label(574, 446, "SPECIAL METHODS", 12, "bold", INK, "middle")}
${label(574, 468, "QBC — acridine orange, fluorescent", 10.8, INK, "middle")}
${label(574, 486, "PCR — most sensitive, species confirm", 10.8, INK, "middle")}
${label(574, 502, "Serology — epidemiological surveys only", 10.5, INK, "middle")}
${arrow(390, 394, 206, 420)}
${arrow(390, 394, 574, 420)}
${arrow(390, 516, 390, 560)}
<path d="M206,516 L206,540 L388,540" stroke="${INK}" stroke-width="0" fill="none"/>
<path d="M574,516 L574,540 L392,540" stroke="${INK}" stroke-width="0" fill="none"/>
${box(210, 562, 360, 56, "#f6efdc", AMBER)}
${label(390, 584, "INTERPRETATION", 12, "bold", AMBER, "middle")}
${label(390, 602, "parasites on smear = confirmed malaria", 11, INK, "middle")}
${arrow(390, 618, 390, 648)}
${box(190, 650, 400, 78, "#eef3f0", INK)}
${label(390, 676, "Report: species + stage + parasitaemia", 11.5, "bold", INK, "middle")}
${label(390, 696, "→ guides therapy (vivax: add primaquine for", 10.8, INK, "middle")}
${label(390, 712, "hypnozoites after G6PD check)", 10.8, INK, "middle")}
</svg>`,
  },
];
