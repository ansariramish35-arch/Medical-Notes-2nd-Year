// Topic metadata — bodies live in ./content/*.md and are read at seed time.

export interface TopicMeta {
  slug: string;
  systemSlug: string;
  title: string;
  emphasis: "ultra-high" | "very-high" | "high" | "standard";
  file: string;
  oneMinute: string;
  examKeywords: string;
  sortOrder: number;
}

export const TOPIC_META: TopicMeta[] = [
  {
    slug: "bacterial-cell-envelope",
    systemSlug: "general-microbiology",
    title: "The Bacterial Cell: Structure, Cell Envelope and Gram Staining",
    emphasis: "ultra-high",
    file: "01-bacterial-cell-envelope.md",
    examKeywords:
      "peptidoglycan · NAG-NAM · teichoic acid · outer membrane · LPS · lipid A · endotoxin · periplasm · capsule · flagella · pili · spore · crystal violet · Gram's iodine · decolorizer · safranin",
    oneMinute: `Bacteria are prokaryotes: single circular dsDNA nucleoid, 70S ribosomes, no mitochondria. Essential structures: cell wall, plasma membrane, cytoplasm, nucleoid, ribosomes. Accessory: capsule, flagella, pili, plasmids, spores. Peptidoglycan = NAG + NAM + peptide cross-links; target of β-lactams and lysozyme. Gram-positive: thick multilayer PG (20–80 nm) + teichoic acids; NO outer membrane. Gram-negative: thin PG (2–3 nm) + periplasm + OUTER MEMBRANE with LPS (lipid A = endotoxin) and porins. Gram stain: crystal violet → Gram's iodine → alcohol (critical step) → safranin. G+ purple, G− pink. Capsule = antiphagocytic; flagella = motility; pili = adhesion/conjugation; spore = survival, NOT reproduction.`,
    sortOrder: 1,
  },
  {
    slug: "bacterial-growth-culture-media",
    systemSlug: "general-microbiology",
    title: "Bacterial Growth: Growth Curve, Culture Media and Oxygen Requirements",
    emphasis: "high",
    file: "02-bacterial-growth-culture-media.md",
    examKeywords:
      "binary fission · generation time · lag phase · log phase · stationary phase · decline phase · enrichment media · selective media · indicator media · transport media · MacConkey · blood agar · chocolate agar · Lowenstein–Jensen",
    oneMinute: `Binary fission; generation time = doubling time (E. coli ~20 min, M. tuberculosis 18–24 h). Batch growth curve: lag → log (antibiotics most active) → stationary (growth = death) → decline. Media by consistency: liquid/semi-solid (motility)/solid. By function: basal, enriched (blood, chocolate), selective (MacConkey, LJ, TCBS), indicator, enrichment (selenite F), transport (Stuart's), anaerobic (RCM). Oxygen classes: obligate aerobes, obligate anaerobes (lack catalase/SOD), facultative, microaerophiles, capnophiles. MacConkey = selective + differential. Pasteurization ≠ sterilization.`,
    sortOrder: 2,
  },
  {
    slug: "sterilization-disinfection",
    systemSlug: "general-microbiology",
    title: "Sterilization, Disinfection and Asepsis — Methods and the Autoclave",
    emphasis: "high",
    file: "03-sterilization-disinfection.md",
    examKeywords:
      "sterilization · disinfection · antisepsis · asepsis · autoclave · 121 °C · 15 psi · holding time · hot air oven · pasteurization · filtration · glutaraldehyde · ethylene oxide",
    oneMinute: `Sterilization = ALL life incl. spores; disinfection = pathogens only; antisepsis = living tissue; asepsis = prevention of entry. Autoclave: moist heat 121 °C, 15 psi, 15 min holding — expel air first; biological indicator = G. stearothermophilus spores. Hot air oven 160 °C × 2 h (glassware, powders). Pasteurization: holder 63 °C/30 min, HTST 72 °C/15 s. Filtration (0.22 µm) for heat-labile fluids; ethylene oxide for plastics; glutaraldehyde 2% for endoscopes. 70% alcohol > absolute alcohol.`,
    sortOrder: 3,
  },
  {
    slug: "immunoglobulins",
    systemSlug: "immunology",
    title: "Immunoglobulins: Structure, Classes and Functions",
    emphasis: "ultra-high",
    file: "04-immunoglobulins.md",
    examKeywords:
      "H2L2 · heavy chain · light chain · Fab · Fc · papain · pepsin · hinge · IgG · IgM · IgA · IgE · opsonization · ADCC · primary response · secondary response",
    oneMinute: `Antibody = H2L2 glycoprotein from plasma cells. Heavy chain decides class (GAMED). Fab = antigen binding; Fc = all effector functions (complement, Fc receptors, placenta, half-life). Papain → 2Fab + Fc; pepsin → F(ab′)2. IgG: most abundant, crosses placenta, opsonin, 23-day half-life. IgM: pentamer, first in primary response, best complement fixer, ABO antibodies. IgA: dimer + secretory piece = mucosal immunity. IgE: mast cells, anaphylaxis, parasites. Functions: neutralization, opsonization, complement, ADCC, agglutination, mucosal immunity, passive immunity. Secondary response: faster, higher, IgG, affinity-matured — basis of vaccination.`,
    sortOrder: 1,
  },
  {
    slug: "complement-system",
    systemSlug: "immunology",
    title: "Complement System: Classical Pathway and Functions",
    emphasis: "very-high",
    file: "05-complement-system.md",
    examKeywords:
      "C1q · C3 convertase C4b2a · alternative C3bBb · C3b opsonin · anaphylatoxins C3a C5a · MAC C5b–9 · CH50 · C1 inhibitor · Neisseria",
    oneMinute: `Complement = ~30 heat-labile serum proteins; inactivated 56 °C/30 min. Three pathways converge at C3: classical (Ag–Ab; C3 convertase C4b2a), alternative (microbial surfaces; C3bBb), lectin (MBL). Classical sequence: Ag–Ab → C1 → C4+C2 → C4b2a → C3 → C3a+C3b → C4b2a3b (C5 convertase) → C5b–9 MAC → osmotic lysis. C3b = opsonin; C3a/C5a = anaphylatoxins; C5a = best chemotaxin. Functions: lysis, opsonization, inflammation, chemotaxis, complex clearance. Deficiencies: C1-INH → angioedema; C3 → pyogenic infections; C5–C9 → Neisseria.`,
    sortOrder: 2,
  },
  {
    slug: "hypersensitivity",
    systemSlug: "immunology",
    title: "Hypersensitivity: Gell & Coombs Types I–IV",
    emphasis: "ultra-high",
    file: "06-hypersensitivity.md",
    examKeywords:
      "Gell and Coombs · IgE · mast cell · histamine · leukotrienes · cytotoxic · immune complex · Arthus · serum sickness · delayed-type · tuberculin · granuloma",
    oneMinute: `Gell & Coombs: I = IgE/mast cell (minutes: anaphylaxis, asthma); II = IgG/IgM vs cell-surface (transfusion, HDN, Goodpasture); III = circulating immune complexes (serum sickness, SLE, Arthus); IV = T-cell delayed 24–72 h (Mantoux, contact dermatitis, graft rejection). Types I–III antibody-mediated; IV cell-mediated and the ONLY delayed type. Type I: sensitization → cross-linking → histamine (immediate) + leukotrienes/late phase. Adrenaline reverses anaphylaxis. Type II: antigen FIXED on cell; Type III: complexes CIRCULATE then deposit. Type IV subtypes: tuberculin, contact, granulomatous, CD8 cytotoxic.`,
    sortOrder: 3,
  },
  {
    slug: "plasmodium-vivax",
    systemSlug: "parasitology",
    title: "Plasmodium vivax and Malaria: Life Cycle, Pathogenesis and Laboratory Diagnosis",
    emphasis: "ultra-high",
    file: "07-plasmodium-vivax.md",
    examKeywords:
      "sporozoite · infective stage · exo-erythrocytic schizogony · hypnozoite · relapse · merozoite · gametocyte · sporogony · oocyst · Anopheles · thick smear · thin smear · HRP-2 · radical cure · primaquine",
    oneMinute: `Hosts: man = intermediate (asexual), female Anopheles = definitive (sexual). Infective stage: sporozoite. Life cycle: sporozoite → liver schizogony (hypnozoites in vivax = relapse) → merozoites → RBC cycle (ring → trophozoite → schizont → rupture = fever every 48 h) → gametocytes → mosquito (zygote → ookinete → oocyst → sporozoites). Diagnosis: thick film (detect) + thin film (species), RDT (HRP-2/pLDH), QBC, PCR. Treatment: chloroquine (clinical cure) + primaquine (radical cure — kills hypnozoites; check G6PD). Fever paroxysm: cold → hot → sweating.`,
    sortOrder: 1,
  },
  {
    slug: "entamoeba-histolytica",
    systemSlug: "parasitology",
    title: "Entamoeba histolytica and Amoebiasis",
    emphasis: "high",
    file: "08-entamoeba-histolytica.md",
    examKeywords:
      "pseudopodia · bull's-eye nucleus · chromatoid bodies · erythrophagocytosis · flask-shaped ulcer · anchovy sauce pus · metronidazole · luminal amoebicide",
    oneMinute: `Habitat: large intestine. Trophozoite = pathogenic form (15–30 µm, bull's-eye nucleus, ingested RBCs = pathognomonic); cyst = infective form (4 nuclei, chromatoid bodies). Cycle: 4-nucleus cyst ingested → excystation → colon → flask-shaped ulcer → dysentery; cysts in formed stool. Liver abscess: right lobe, anchovy-sauce pus, serology positive. Diagnosis: fresh stool microscopy (trophozoites with RBCs), antigen ELISA, serology for abscess. Treat invasive with metronidazole THEN luminal agent (diloxanide) to kill cysts.`,
    sortOrder: 2,
  },
  {
    slug: "ascaris-lumbricoides",
    systemSlug: "parasitology",
    title: "Ascaris lumbricoides (Round Worm) and Ascariasis",
    emphasis: "high",
    file: "09-ascaris-lumbricoides.md",
    examKeywords:
      "mamillated egg · embryonated egg · infective stage · lung migration · Loeffler syndrome · eosinophilia · intestinal obstruction · biliary ascariasis · albendazole",
    oneMinute: `Largest intestinal nematode (♀ 20–35 cm). Cycle: unembryonated egg in faeces → embryonated egg in soil (INFECTIVE, 2–3 weeks) → ingested → hatch → portal vein → liver → LUNGS (Loeffler syndrome + eosinophilia) → trachea → swallowed → adult in jejunum (≈6–8 weeks). Diagnosis: mamillated egg in stool; Kato–Katz for burden. Complications: intestinal obstruction in children, biliary ascariasis. Treatment: albendazole single dose; prevention = sanitation + deworming.`,
    sortOrder: 3,
  },
  {
    slug: "cell-injury-necrosis-apoptosis",
    systemSlug: "general-pathology",
    title: "Cell Injury: Mechanisms, Necrosis and Apoptosis",
    emphasis: "very-high",
    file: "10-cell-injury-necrosis-apoptosis.md",
    examKeywords:
      "hydropic change · point of no return · pyknosis · karyorrhexis · karyolysis · coagulative · liquefactive · caseous · gangrenous · caspases · apoptotic bodies · BCL-2 · p53",
    oneMinute: `Injury mechanisms: ATP depletion, mitochondrial damage, calcium influx, oxidative stress. First reversible change = cellular swelling. Point of no return = membrane + mitochondrial failure. Necrosis (always pathological + inflamed): nuclear sequence pyknosis → karyorrhexis → karyolysis. Types: coagulative (ischaemia, all except brain), liquefactive (brain, abscess), caseous (TB), fat necrosis (pancreatitis), fibrinoid (vessels), gangrenous. Apoptosis (programmed, NO inflammation): shrinkage, blebs, apoptotic bodies, caspases; intrinsic (p53/BAX/mitochondria) + extrinsic (Fas/TNF) pathways.`,
    sortOrder: 1,
  },
  {
    slug: "acute-inflammation",
    systemSlug: "general-pathology",
    title: "Acute Inflammation: Pathogenesis, Mediators and Outcomes",
    emphasis: "ultra-high",
    file: "11-acute-inflammation.md",
    examKeywords:
      "rubor · tumor · calor · dolor · vasodilatation · exudate · selectins · integrins · diapedesis · chemotaxis · opsonization · respiratory burst · MPO · resolution · suppuration · organization",
    oneMinute: `Cardinal signs: RUBOR, TUMOR, CALOR, DOLOR, FUNCTIO LAESA. Vascular events: transient vasoconstriction → vasodilatation (histamine, NO) → increased permeability → exudate → stasis/margination. Cellular events: margination → rolling (selectins) → firm adhesion (integrins) → transmigration (PECAM-1) → chemotaxis (C5a, IL-8, LTB4) → phagocytosis. Opsonins: IgG-Fc, C3b. Killing: H2O2–MPO–halide (respiratory burst). Outcomes: resolution, suppuration, organization, chronic, systemic spread. Acute = neutrophils.`,
    sortOrder: 2,
  },
  {
    slug: "neoplasia",
    systemSlug: "general-pathology",
    title: "Neoplasia: Definitions, Benign vs Malignant and Routes of Metastasis",
    emphasis: "ultra-high",
    file: "12-neoplasia.md",
    examKeywords:
      "Willis definition · anaplasia · dysplasia · metastasis · lymphatic spread · haematogenous spread · seeding · Virchow node · Krukenberg · oncogene · p53 · RB · tumour markers",
    oneMinute: `Willis: neoplasm = abnormal mass whose growth exceeds and persists after the stimulus stops. Benign: -oma, encapsulated, NEVER metastasizes. Malignant: invasive + metastasis (the defining criterion). Exceptions: melanoma, lymphoma, seminoma, hepatoma are malignant. Routes of metastasis: lymphatic (carcinomas → nodes), haematogenous (sarcomas → liver/lungs), seeding (Krukenberg). Carcinogenesis: oncogenes (gain, RAS/MYC), tumour suppressors (loss, p53/RB two-hit), DNA-repair genes. p53 = guardian of the genome. Markers: AFP, CEA, PSA, CA-125, β-hCG, calcitonin.`,
    sortOrder: 3,
  },
  {
    slug: "penicillins",
    systemSlug: "pharmacology",
    title: "Penicillins: Classification, Mechanism, Uses, Adverse Effects and Resistance",
    emphasis: "ultra-high",
    file: "13-penicillins.md",
    examKeywords:
      "β-lactam ring · PBPs · transpeptidation · D-Ala–D-Ala · autolysins · bactericidal · β-lactamase · clavulanic acid · PBP2a · MRSA · anaphylaxis · Jarisch–Herxheimer",
    oneMinute: `Classes: natural (G, V), penicillinase-resistant (cloxacillin), aminopenicillins (amoxicillin/ampicillin), antipseudomonal (piperacillin). MOA: β-lactam mimics D-Ala–D-Ala → binds PBPs → blocks transpeptidation → autolysin lysis; bactericidal, log-phase only. Resistance: β-lactamase (commonest), altered PBPs (MRSA = mecA/PBP2a), porin loss, efflux. Clavulanate/sulbactam/tazobactam are β-lactamase inhibitors. ADRs: hypersensitivity (commonest; anaphylaxis = serious one), diarrhoea, interstitial nephritis, seizures (high dose), Jarisch–Herxheimer in syphilis.`,
    sortOrder: 1,
  },
  {
    slug: "nsaids-aspirin",
    systemSlug: "pharmacology",
    title: "NSAIDs and Aspirin: Mechanism, Uses, Adverse Effects and Comparison with Paracetamol",
    emphasis: "very-high",
    file: "14-nsaids-aspirin.md",
    examKeywords:
      "cyclo-oxygenase · COX-1 · COX-2 · arachidonic acid · thromboxane A2 · prostacyclin · PGE2 · irreversible acetylation · Reye syndrome · NAPQI · N-acetylcysteine",
    oneMinute: `NSAIDs block COX → ↓ PGs/TXA2. Aspirin = IRREVERSIBLE acetylation; others reversible. COX-1 = housekeeping (gastric protection, platelets, kidney); COX-2 = inflammation. Steroids block PLA2 higher up. Low-dose aspirin → antiplatelet (platelets cannot remake COX → TXA2 suppressed 8–10 days). ADRs: GI ulcer/bleed (COX-1 block), renal, bronchospasm (LOX shunt), Reye syndrome in children. Paracetamol: analgesic/antipyretic, no anti-inflammatory effect, no antiplatelet; overdose → NAPQI → hepatic necrosis → N-acetylcysteine.`,
    sortOrder: 2,
  },
];
