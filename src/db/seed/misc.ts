// Viva questions, atlas entries and the 7-day study plan.

export interface VivaSeed {
  topicSlug: string | null;
  question: string;
  answer: string;
}

export const VIVA_SEEDS: VivaSeed[] = [
  {
    topicSlug: "bacterial-cell-envelope",
    question: "What is the single structure that distinguishes a Gram-negative from a Gram-positive envelope?",
    answer:
      "The OUTER MEMBRANE (with LPS/lipid A and porins) — present only in Gram-negatives.",
  },
  {
    topicSlug: "bacterial-cell-envelope",
    question: "Which part of LPS is toxic, and which part is used for serotyping?",
    answer: "Lipid A is the toxic moiety (endotoxin); the O-specific polysaccharide is used for serotyping.",
  },
  {
    topicSlug: "bacterial-cell-envelope",
    question: "What is the critical step of Gram staining and why?",
    answer:
      "Decolorization with alcohol/acetone — it removes the crystal violet–iodine complex from Gram-negatives only. Over-decolorizing makes Gram-positives look falsely negative.",
  },
  {
    topicSlug: "bacterial-cell-envelope",
    question: "Name the bacterium without a cell wall. What are the two consequences?",
    answer: "Mycoplasma — it does not Gram-stain and β-lactam antibiotics are ineffective against it.",
  },
  {
    topicSlug: "bacterial-growth-culture-media",
    question: "In which growth phase are bacteria most susceptible to penicillin and why?",
    answer: "The log phase — penicillins act only while new peptidoglycan is being synthesized.",
  },
  {
    topicSlug: "bacterial-growth-culture-media",
    question: "Classify MacConkey's medium.",
    answer: "It is BOTH selective (bile salts inhibit Gram-positives) and differential/indicator (lactose fermentation turns colonies pink).",
  },
  {
    topicSlug: "sterilization-disinfection",
    question: "Give the complete parameters of autoclaving.",
    answer: "121 °C at 15 psi for a 15-minute holding time, after complete air displacement.",
  },
  {
    topicSlug: "sterilization-disinfection",
    question: "What is the biological indicator of autoclaving?",
    answer: "Spores of Geobacillus stearothermophilus — failure to grow after the cycle proves sterility.",
  },
  {
    topicSlug: "immunoglobulins",
    question: "Which immunoglobulin crosses the placenta, and what does that give the newborn?",
    answer: "IgG only — natural passive immunity for the first months of life.",
  },
  {
    topicSlug: "immunoglobulins",
    question: "A neonate has raised IgM. Why is that significant?",
    answer:
      "IgM does not cross the placenta, so fetal IgM must be produced by the fetus itself — evidence of intrauterine infection.",
  },
  {
    topicSlug: "immunoglobulins",
    question: "What do papain and pepsin cleavage of IgG produce?",
    answer: "Papain → 2 Fab + 1 Fc; pepsin → one bivalent F(ab′)2 fragment + pFc′.",
  },
  {
    topicSlug: "complement-system",
    question: "Write the classical pathway C3 and C5 convertases.",
    answer: "C3 convertase = C4b2a; C5 convertase = C4b2a3b. (Alternative pathway: C3bBb.)",
  },
  {
    topicSlug: "complement-system",
    question: "Recurrent meningococcal infections should make you suspect deficiency of which complement components?",
    answer: "The terminal components C5–C9 (the membrane attack complex).",
  },
  {
    topicSlug: "hypersensitivity",
    question: "Which hypersensitivity types are antibody-mediated and which is cell-mediated?",
    answer: "Types I, II and III are antibody-mediated; Type IV is T-cell mediated and is the only delayed type (24–72 h).",
  },
  {
    topicSlug: "hypersensitivity",
    question: "How do you distinguish Type II from Type III reactions?",
    answer: "In Type II the antigen is FIXED on a cell or matrix; in Type III the immune complexes are CIRCULATING and then deposit.",
  },
  {
    topicSlug: "plasmodium-vivax",
    question: "Name the infective and diagnostic stages of malaria.",
    answer: "Infective = sporozoite (inoculated by Anopheles); diagnostic = intra-erythrocytic parasites on a stained blood film.",
  },
  {
    topicSlug: "plasmodium-vivax",
    question: "Why do we add primaquine after chloroquine in P. vivax malaria?",
    answer:
      "Chloroquine clears blood stages only; primaquine kills the hepatic hypnozoites that cause relapses (radical cure). G6PD must be checked first.",
  },
  {
    topicSlug: "plasmodium-vivax",
    question: "What is the difference in purpose between the thick and the thin blood film?",
    answer: "Thick film concentrates parasites for DETECTION; thin film preserves RBC morphology for SPECIES identification and parasitaemia counting.",
  },
  {
    topicSlug: "entamoeba-histolytica",
    question: "What microscopic finding is pathognomonic of E. histolytica?",
    answer: "Erythrophagocytosis — ingested red cells inside the trophozoite.",
  },
  {
    topicSlug: "entamoeba-histolytica",
    question: "Why is metronidazole followed by diloxanide furoate in amoebiasis?",
    answer:
      "Metronidazole is a tissue amoebicide; a luminal agent is required afterwards to eradicate residual cysts and prevent relapse/transmission.",
  },
  {
    topicSlug: "ascaris-lumbricoides",
    question: "Trace the route of Ascaris larval migration after the egg is swallowed.",
    answer:
      "Intestine (hatch) → portal circulation → liver → lungs → alveoli → trachea → pharynx → swallowed → adult worm in small intestine.",
  },
  {
    topicSlug: "ascaris-lumbricoides",
    question: "What syndrome occurs during the lung phase of ascariasis?",
    answer: "Loeffler syndrome — eosinophilic pneumonitis with cough and fleeting pulmonary infiltrates.",
  },
  {
    topicSlug: "cell-injury-necrosis-apoptosis",
    question: "What is the first visible change of reversible cell injury?",
    answer: "Cellular swelling (hydropic change) due to Na+/K+ pump failure from ATP depletion.",
  },
  {
    topicSlug: "cell-injury-necrosis-apoptosis",
    question: "Which type of necrosis do you expect in a brain infarct and why?",
    answer:
      "Liquefactive — the brain is rich in lytic enzymes and lipids with little supporting stroma, so enzymatic digestion dominates.",
  },
  {
    topicSlug: "acute-inflammation",
    question: "Name three chemotactic factors.",
    answer: "C5a, IL-8 and LTB4 (plus bacterial peptides such as fMLP).",
  },
  {
    topicSlug: "acute-inflammation",
    question: "What are the opsonins and what do they do?",
    answer: "IgG-Fc and C3b — they coat microbes and bridge them to phagocyte receptors, enabling efficient ingestion.",
  },
  {
    topicSlug: "neoplasia",
    question: "What is the single most reliable criterion of malignancy?",
    answer: "Metastasis — benign tumours never metastasize.",
  },
  {
    topicSlug: "neoplasia",
    question: "A gastric carcinoma deposits in the ovary — what is the eponym?",
    answer: "Krukenberg tumour — mucin-secreting signet-ring cells, usually from the stomach.",
  },
  {
    topicSlug: "penicillins",
    question: "Why are penicillins harmless to human cells but lethal to bacteria?",
    answer: "Human cells lack peptidoglycan and PBPs — the drug's target simply does not exist in the host.",
  },
  {
    topicSlug: "penicillins",
    question: "How does MRSA resist penicillins?",
    answer: "By acquiring mecA, which encodes PBP2a — a penicillin-binding protein with very low β-lactam affinity (NOT by β-lactamase).",
  },
  {
    topicSlug: "nsaids-aspirin",
    question: "Why does aspirin but not ibuprofen give lasting antiplatelet effect?",
    answer:
      "Aspirin irreversibly acetylates COX-1; platelets have no nucleus and cannot synthesize fresh enzyme, so TXA2 stays suppressed for the platelet's 8–10-day life.",
  },
  {
    topicSlug: "nsaids-aspirin",
    question: "A child took paracetamol overdose. What is the toxic metabolite and the antidote?",
    answer: "NAPQI (CYP-generated) — treat with N-acetylcysteine, which restores glutathione.",
  },
];

export interface AtlasSeed {
  kind: "classification" | "comparison" | "labdx" | "lifecycle" | "mechanism";
  title: string;
  topicSlug: string | null;
  summary: string;
  important: boolean;
}

export const ATLAS_SEEDS: AtlasSeed[] = [
  // classifications
  { kind: "classification", title: "Bacterial cell structures — essential vs accessory", topicSlug: "bacterial-cell-envelope", summary: "Essential: wall, membrane, cytoplasm, nucleoid, ribosomes. Accessory: capsule, flagella, pili, plasmids, spores.", important: true },
  { kind: "classification", title: "Culture media (consistency + function)", topicSlug: "bacterial-growth-culture-media", summary: "Liquid/semi-solid/solid; basal, enriched, selective, indicator, enrichment, transport, anaerobic — with examples.", important: true },
  { kind: "classification", title: "Sterilization methods", topicSlug: "sterilization-disinfection", summary: "Physical (moist heat, dry heat, radiation, filtration) and chemical (gaseous, liquid).", important: false },
  { kind: "classification", title: "Immunoglobulin classes", topicSlug: "immunoglobulins", summary: "IgG, IgM, IgA, IgD, IgE — heavy chains GAMED with one signature property each.", important: true },
  { kind: "classification", title: "Gell & Coombs hypersensitivity types I–IV", topicSlug: "hypersensitivity", summary: "I anaphylactic (IgE), II cytotoxic (IgG/IgM), III immune-complex, IV delayed (T cell).", important: true },
  { kind: "classification", title: "Types of necrosis", topicSlug: "cell-injury-necrosis-apoptosis", summary: "Coagulative, liquefactive, caseous, fat, fibrinoid, gangrenous — each with mechanism and site.", important: true },
  { kind: "classification", title: "Penicillins", topicSlug: "penicillins", summary: "Natural, penicillinase-resistant, aminopenicillins, antipseudomonal.", important: true },
  { kind: "classification", title: "NSAIDs", topicSlug: "nsaids-aspirin", summary: "Salicylates, propionic acids, acetic acids, oxicams, fenamates, COX-2 selective; paracetamol contrasted.", important: true },
  { kind: "classification", title: "Human Plasmodium species", topicSlug: "plasmodium-vivax", summary: "vivax/falciparum/malariae/ovale/knowlesi with fever periodicity and special features.", important: true },
  { kind: "classification", title: "Oxygen requirement classes of bacteria", topicSlug: "bacterial-growth-culture-media", summary: "Obligate aerobes, obligate anaerobes, facultative, microaerophiles, capnophiles.", important: false },

  // comparisons
  { kind: "comparison", title: "Gram-positive vs Gram-negative cell wall", topicSlug: "bacterial-cell-envelope", summary: "Eleven-feature table: PG thickness, teichoic acid, outer membrane, LPS, staining colour, drug susceptibility.", important: true },
  { kind: "comparison", title: "Primary vs secondary immune response", topicSlug: "immunoglobulins", summary: "Lag, titre, class (IgM→IgG), affinity, duration; memory-cell basis.", important: false },
  { kind: "comparison", title: "Classical vs alternative complement pathway", topicSlug: "complement-system", summary: "Initiation, components, C3 convertase (C4b2a vs C3bBb), speed, stabilizer.", important: true },
  { kind: "comparison", title: "E. histolytica cyst vs trophozoite", topicSlug: "entamoeba-histolytica", summary: "Size, nuclei, motility, habitat, role — cyst infective, trophozoite pathogenic.", important: true },
  { kind: "comparison", title: "Transudate vs exudate", topicSlug: "acute-inflammation", summary: "Protein, specific gravity, cells, mechanism, examples.", important: false },
  { kind: "comparison", title: "Benign vs malignant tumours", topicSlug: "neoplasia", summary: "Differentiation, growth rate, invasion, metastasis (defining), systemic effects.", important: true },
  { kind: "comparison", title: "Necrosis vs apoptosis", topicSlug: "cell-injury-necrosis-apoptosis", summary: "Seven-feature table — inflammation present vs absent is the examiner's line.", important: true },
  { kind: "comparison", title: "Aspirin vs paracetamol", topicSlug: "nsaids-aspirin", summary: "Anti-inflammatory and antiplatelet effects, GI toxicity, paediatric use, overdose patterns.", important: true },
  { kind: "comparison", title: "Benzylpenicillin vs amoxicillin", topicSlug: "penicillins", summary: "Route, spectrum, β-lactamase stability, classic uses, EBV rash.", important: false },
  { kind: "comparison", title: "P. vivax vs P. falciparum", topicSlug: "plasmodium-vivax", summary: "Severity, RBC preference, hypnozoites vs cytoadherence, smear morphology.", important: true },

  // labdx
  { kind: "labdx", title: "Laboratory diagnosis of malaria", topicSlug: "plasmodium-vivax", summary: "Thick + thin film (Giemsa), RDT (HRP-2/pLDH), QBC, PCR; complete algorithm with specimen timing.", important: true },
  { kind: "labdx", title: "Laboratory diagnosis of amoebiasis", topicSlug: "entamoeba-histolytica", summary: "Fresh stool microscopy (erythrophagocytosis), concentration, antigen ELISA, serology for liver abscess.", important: true },
  { kind: "labdx", title: "Laboratory diagnosis of ascariasis", topicSlug: "ascaris-lumbricoides", summary: "Mamillated eggs in stool; Kato–Katz quantification; imaging for complications.", important: false },
  { kind: "labdx", title: "Gram staining technique", topicSlug: "bacterial-cell-envelope", summary: "Four reagents, CV–I complex principle, interpretation and error analysis.", important: true },
  { kind: "labdx", title: "Complement assessment (CH50, C3/C4)", topicSlug: "complement-system", summary: "CH50/AH50 functional assays; low C3+C4 vs isolated low C3 pattern reading.", important: false },

  // lifecycles
  { kind: "lifecycle", title: "Plasmodium vivax life cycle", topicSlug: "plasmodium-vivax", summary: "Two-host cycle — hepatic + erythrocytic schizogony in man; sporogony in Anopheles. Sporozoite infective.", important: true },
  { kind: "lifecycle", title: "Ascaris lumbricoides life cycle", topicSlug: "ascaris-lumbricoides", summary: "Monoxenous with obligatory lung migration; embryonated egg infective.", important: true },
  { kind: "lifecycle", title: "Entamoeba histolytica cycle", topicSlug: "entamoeba-histolytica", summary: "Cyst–trophozoite–cyst, faeco-oral, no vector; 4-nucleate cyst infective.", important: false },

  // mechanisms
  { kind: "mechanism", title: "Classical complement cascade", topicSlug: "complement-system", summary: "C1 → C4b2a → C3 → C4b2a3b → MAC, with anaphylatoxin and opsonin branches.", important: true },
  { kind: "mechanism", title: "Type I hypersensitivity (mast-cell degranulation)", topicSlug: "hypersensitivity", summary: "Sensitization → IgE cross-linking → immediate histamine + late leukotriene waves.", important: true },
  { kind: "mechanism", title: "Acute inflammation — vascular & cellular events", topicSlug: "acute-inflammation", summary: "Vasodilatation → permeability → exudate; margination → rolling → adhesion → diapedesis → chemotaxis → phagocytosis.", important: true },
  { kind: "mechanism", title: "Cell injury — ATP depletion pathway", topicSlug: "cell-injury-necrosis-apoptosis", summary: "ATP loss → pump failure → swelling → calcium influx → membrane/mitochondrial failure = point of no return.", important: true },
  { kind: "mechanism", title: "Penicillin mechanism (PBP → lysis)", topicSlug: "penicillins", summary: "D-Ala–D-Ala mimicry → PBP acylation → transpeptidation block → autolysin lysis.", important: true },
  { kind: "mechanism", title: "NSAID mechanism (COX inhibition)", topicSlug: "nsaids-aspirin", summary: "Arachidonate pathway; COX-1/COX-2; aspirin's irreversible acetylation and its clinical consequences.", important: true },
  { kind: "mechanism", title: "Metastatic invasion sequence", topicSlug: "neoplasia", summary: "Loosening (↓E-cadherin) → attachment → ECM degradation (MMPs) → migration.", important: false },
  { kind: "mechanism", title: "Autoclave sterilization", topicSlug: "sterilization-disinfection", summary: "Steam under pressure; latent-heat protein denaturation kills spores at 121 °C.", important: false },
];

export const SEVEN_DAY_PLAN = `
This plan covers the ENTIRE supplied bank in logical sequence, prioritizing ultra-high and repeated material first while guaranteeing that every unit is visited. Each day lists the topics, the question types to practise and the atlas material to redraw.

## Day 1 — Paper I · Unit I (General Bacteriology)

- Master topics: **bacterial cell envelope & Gram stain**, growth curve & culture media, sterilization & disinfection.
- LAQ practice: bacterial cell + Gram wall question; culture media classification; autoclave.
- SN practice: capsule, spore, growth curve, Gram stain procedure, transport media, pasteurization.
- SAQ sprint: all 8 SAQs of Unit I.
- Redraw: Figure 1.1 (bacterial cell) and Figure 1.2 (Gram walls).

## Day 2 — Paper I · Unit II (Immunology, part 1)

- Master topics: **immunoglobulins**, **complement system**.
- LAQ practice: Ig structure + five classes; classical pathway + functions.
- SN practice: IgM, secretory IgA, immune responses, antigen–antibody reactions, complement functions.
- SAQ sprint: definitions, Ig enumeration, MAC, opsonization.
- Redraw: IgG molecule; classical pathway cascade.

## Day 3 — Paper I · Unit II (Immunology, part 2) + Unit III start

- Master topics: **hypersensitivity (all four types)**; begin **Plasmodium vivax**.
- LAQ practice: Gell & Coombs with Type I expansion.
- Redraw: four-type hypersensitivity panel; start malaria life cycle.
- Evening: viva questions on immunology.

## Day 4 — Paper I · Unit III (Parasitology)

- Master topics: **P. vivax (complete)**, **E. histolytica**, **Ascaris lumbricoides**.
- LAQ practice: malaria life cycle; malaria lab diagnosis; E. histolytica morphology + pathogenesis + lab dx.
- SN/SAQ practice: Ascaris cycle, cyst/trophozoite, radical cure, all SAQs.
- Redraw: malaria life cycle; Ascaris lung loop.

## Day 5 — Paper II · Unit IV (General Pathology)

- Master topics: **cell injury, necrosis & apoptosis**, **acute inflammation**, **neoplasia**.
- LAQ practice: necrosis types + necrosis vs apoptosis; acute inflammation pathogenesis; benign vs malignant + metastasis.
- SN practice: mediators, phagocytosis, outcomes, anaplasia, routes of metastasis.
- Redraw: inflammation events; metastasis routes; necrosis vs apoptosis panels.

## Day 6 — Paper II · Unit V (Pharmacology) + cross-paper revision

- Master topics: **penicillins**, **NSAIDs/aspirin**.
- LAQ practice: penicillin classification + MOA + uses + ADR; NSAID classification + aspirin + paracetamol comparison.
- SN practice: resistance mechanisms, COX-1 vs COX-2, clavulanate logic, low-dose aspirin.
- Redraw: arachidonic acid pathway; penicillin MOA.
- Evening: re-run the LAQ master list of Paper I from memory.

## Day 7 — Full revision sweep

- Morning: **Last 24-Hour Revision** section (all one-minute revisions in sequence).
- Midday: redraw every diagram in the Master Diagram Atlas from memory, self-mark against labels.
- Afternoon: self-test section — LAQ frameworks, then SAQ rapid-fire; verify against the answer key.
- Evening: viva questions end-to-end; check the Coverage Audit page — confirm zero unmapped source items.

> Rule of the week: every day ends by redrawing at least one diagram from memory and reciting one LAQ framework aloud.
`;
