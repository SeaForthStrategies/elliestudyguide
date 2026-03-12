const STORAGE_KEY = "chem103-study-hub-state";

const questionCards = [
  // Page 1 (Q1–13)
  { page: "Page 1 • Q1", prompt: "Which compound above is a monoamine?", answer: "Use the page-1 A/B/C structures and identify the molecule with one amine functionality." },
  { page: "Page 1 • Q2", prompt: "Which compound above is an amine salt?", answer: "Look for protonated amine form with a counterion (salt form)." },
  { page: "Page 1 • Q3", prompt: "Which compound above is an ester?", answer: "Identify structure containing C(=O)-O linkage." },
  { page: "Page 1 • Q4", prompt: "Which compound above is trisubstituted amine?", answer: "Find amine nitrogen attached to three carbon groups." },
  { page: "Page 1 • Q5", prompt: "Which compound above is a neurotransmitter?", answer: "Acetylcholine is the neurotransmitter in the set." },
  { page: "Page 1 • Q6", prompt: "Benadryl (typical antihistamine): stimulant, sedative, or neither?", answer: "Classify from course notes (A/B/C coding)." },
  { page: "Page 1 • Q7", prompt: "Nicotine: stimulant, sedative, or neither?", answer: "Classify from course notes (A/B/C coding)." },
  { page: "Page 1 • Q8", prompt: "Seconal/Luminal/Nembutal (barbiturates): stimulant, sedative, or neither?", answer: "Classify from course notes (A/B/C coding)." },
  { page: "Page 1 • Q9", prompt: "Aspirin: stimulant, sedative, or neither?", answer: "Classify from course notes (A/B/C coding)." },
  { page: "Page 1 • Q10", prompt: "Pseudoephedrine (decongestant): stimulant, sedative, or neither?", answer: "Classify from course notes (A/B/C coding)." },
  { page: "Page 1 • Q11", prompt: "Caffeine: stimulant, sedative, or neither?", answer: "Classify from course notes (A/B/C coding)." },
  { page: "Page 1 • Q12", prompt: "Cocaine: stimulant, sedative, or neither?", answer: "Classify from course notes (A/B/C coding)." },
  { page: "Page 1 • Q13", prompt: "Amphetamines: stimulant, sedative, or neither?", answer: "Classify from course notes (A/B/C coding)." },

  // Page 2 (Q14–29)
  { page: "Page 2 • Q14", prompt: "Which is NOT an amphetamine?", answer: "Caffeine." },
  { page: "Page 2 • Q15", prompt: "Which is NOT a narcotic pain killer?", answer: "Advil." },
  { page: "Page 2 • Q16", prompt: "Which compounds shown are amides?", answer: "Use amide rule: carbonyl directly attached to nitrogen." },
  { page: "Page 2 • Q17", prompt: "Patients with Parkinson’s disease have too little ____.", answer: "Dopamine." },
  { page: "Page 2 • Q18", prompt: "It reduces anxiety by inhibiting dopamine neurons.", answer: "Use neurotransmitter matching answer bank from exam sheet." },
  { page: "Page 2 • Q19", prompt: "Anti-acids like Zantac and Tagamet affect this neurotransmitter.", answer: "Histamine." },
  { page: "Page 2 • Q20", prompt: "Cocaine affects re-uptake of this neurotransmitter.", answer: "Dopamine (course framing)." },
  { page: "Page 2 • Q21", prompt: "Alzheimer treatment can inhibit enzyme degrading this neurotransmitter.", answer: "Acetylcholine (course framing)." },
  { page: "Page 2 • Q22", prompt: "Current theory relates schizophrenia to excess of which neurotransmitter?", answer: "Dopamine (course framing)." },
  { page: "Page 2 • Q23", prompt: "Over time cocaine addicts have fewer receptor sites for this NT.", answer: "Dopamine (course framing)." },
  { page: "Page 2 • Q24", prompt: "Prozac, Zoloft and Paxil affect this neurotransmitter.", answer: "Serotonin." },
  { page: "Page 2 • Q25", prompt: "Nicotine is an agonist to this neurotransmitter.", answer: "Acetylcholine." },
  { page: "Page 2 • Q26", prompt: "Valium/Xanax affect which NT?", answer: "GABA." },
  { page: "Page 2 • Q27", prompt: "Produced by body in response to allergic reaction.", answer: "Histamine." },
  { page: "Page 2 • Q28", prompt: "Involved in mood, sleep, appetite and body temperature.", answer: "Serotonin." },
  { page: "Page 2 • Q29", prompt: "Anti-anxiety drugs increase activity of this NT.", answer: "GABA." },

  // Page 3 (Q30–43)
  { page: "Page 3 • Q30-35", prompt: "How many chiral carbons in each shown compound?", answer: "Count stereocenters for each structure using chiral-carbon criteria." },
  { page: "Page 3 • Q36-43", prompt: "Relationship between shown pairs: same, structural isomers, enantiomers, diastereomers, no relationship.", answer: "Compare connectivity and stereochemistry for each pair." },

  // Page 4 (Q44–58)
  { page: "Page 4 • Q44", prompt: "Which of the following is a racemic mixture?", answer: "Look for equal moles of enantiomeric pair." },
  { page: "Page 4 • Q45-52", prompt: "Classify by optical activity: active, inactive(no chiral C), or inactive(meso).", answer: "Use chirality + symmetry/meso rules." },
  { page: "Page 4 • Q53-58", prompt: "Classify compounds as monosaccharide, disaccharide, or not sugar.", answer: "Identify carbohydrate size/type." },

  // Page 5 (Q59–70)
  { page: "Page 5 • Q59-68", prompt: "Which structures are soluble in water? (A soluble / B not)", answer: "Use polarity, ionic groups, H-bonding, and size." },
  { page: "Page 5 • Q69-70", prompt: "Identify glycosidic linkage type (α1-4, α1-6, β1-4, β1-6, or not given).", answer: "Read anomeric orientation and carbon positions." },

  // Page 6 (Q71–77)
  { page: "Page 6 • Q71", prompt: "For compound II, what is true if compound I melts at 103°C and rotates +92°?", answer: "Apply enantiomer/diastereomer property rules from stereochemistry." },
  { page: "Page 6 • Q72", prompt: "For compound III, what is true if compound I melts at 103°C and rotates +92°?", answer: "Apply enantiomer/diastereomer property rules from stereochemistry." },
  { page: "Page 6 • Q73", prompt: "Which compounds react with Benedict’s or Tollens reagent?", answer: "Reducing sugars/free hemiacetal forms react." },
  { page: "Page 6 • Q74", prompt: "Which of the following is a reducing sugar?", answer: "Lactose and maltose are reducing; sucrose is not." },
  { page: "Page 6 • Q75", prompt: "Which can pass through cell membranes?", answer: "Monosaccharides are the primary expected answer in this exam context." },
  { page: "Page 6 • Q76", prompt: "Which smells the best?", answer: "Esters." },
  { page: "Page 6 • Q77", prompt: "Which smells the worst?", answer: "Amines." },

  // Page 7 (Q78–105)
  { page: "Page 7 • Q78", prompt: "What is blood sugar?", answer: "Glucose." },
  { page: "Page 7 • Q79", prompt: "Which sugar is found in RNA?", answer: "Ribose." },
  { page: "Page 7 • Q80", prompt: "What is dextrose?", answer: "Glucose (D-glucose)." },
  { page: "Page 7 • Q81", prompt: "Which sugar is the sweetest?", answer: "Fructose." },
  { page: "Page 7 • Q82", prompt: "Which is an aldotriose?", answer: "Glyceraldehyde." },
  { page: "Page 7 • Q83", prompt: "Which is a ketose?", answer: "Fructose." },
  { page: "Page 7 • Q84", prompt: "Which is an aldopentose?", answer: "Ribose." },
  { page: "Page 7 • Q85", prompt: "Beside glucose, what monosaccharide is in table sugar?", answer: "Fructose." },
  { page: "Page 7 • Q86", prompt: "Beside glucose, what monosaccharide is in milk sugar?", answer: "Galactose." },
  { page: "Page 7 • Q87-105", prompt: "True/False set (87–105): drugs, stereochemistry, sugars, and photosynthesis statements.", answer: "Review each statement against course notes/textbook emphasis." },

  // Page 8
  { page: "Page 8 • Q1", prompt: "What are starting materials for photosynthesis by a green plant?", answer: "Carbon dioxide and water (with light energy)." },
  { page: "Page 8 • Q2", prompt: "How many different aldohexoses are there?", answer: "16 total (8 D + 8 L)." },
  { page: "Page 8 • Q3", prompt: "How many different D-aldotetroses are there?", answer: "2." },
  { page: "Page 8 • Q4", prompt: "Draw the alpha form using provided template.", answer: "Use Haworth projection conversion and alpha-anomer rule." },
  { page: "Page 8 • Q5", prompt: "What two compounds react in body to produce shown product?", answer: "Identify acid + alcohol precursors consistent with shown ester/ketone context." },

  // Page 9
  { page: "Page 9 • Q1", prompt: "Common names of shown monosaccharides (a–d).", answer: "Identify each sugar from Fischer/Haworth pattern." },
  { page: "Page 9 • Q2", prompt: "Draw structure: acetamide.", answer: "CH3CONH2." },
  { page: "Page 9 • Q3", prompt: "Draw structure: isopropyl butanoate.", answer: "Butanoate esterified with isopropyl group." },
  { page: "Page 9 • Q4", prompt: "Draw structure: ammonium benzoate.", answer: "Ionic pair of benzoate and ammonium." },

  // Page 10
  { page: "Page 10 • a-e", prompt: "Name the shown compounds (common or IUPAC; one asks common only).", answer: "Apply aldehyde/amine/amide/aromatic ester/carboxylate naming rules." },

  // Page 11
  { page: "Page 11 • a", prompt: "Organic product of carboxylic acid + 1-propanol (with catalyst).", answer: "Fischer esterification product (propyl ester) + water." },
  { page: "Page 11 • b", prompt: "Organic product of sugar + NADH/enzyme.", answer: "Reduction product in carbohydrate context." },
  { page: "Page 11 • c", prompt: "Organic product with HCl(aq) for amine-containing compound.", answer: "Amine salt (ammonium chloride form)." },
  { page: "Page 11 • d", prompt: "Organic product with Tollens reagent.", answer: "Oxidized aldehyde/aldose to carboxylate/acid equivalent." },
  { page: "Page 11 • e", prompt: "Organic product under basic hydrolysis (NaOH).", answer: "Ester cleavage/saponification products." },

  // Extra credit
  { page: "Extra Credit • 1", prompt: "Draw final product of maltose + maltase, then NADH/enzyme.", answer: "Hydrolyze maltose first, then apply reduction step to product as directed." },
  { page: "Extra Credit • 2", prompt: "Draw product when D-deoxyribose reacts with Tollens reagent.", answer: "Oxidation of aldehyde functionality to acid/carboxylate form." },
  { page: "Extra Credit • 3", prompt: "How many stereoisomers are possible for shown structure?", answer: "Use 2^n adjusted for symmetry if present." },
  { page: "Extra Credit • 4a", prompt: "Drug name for children with ADHD.", answer: "Course examples include stimulant ADHD medications." },
  { page: "Extra Credit • 4b", prompt: "Amphetamine sold OTC as a ‘natural product’.", answer: "Ephedra/ephedrine context from class." },
  { page: "Extra Credit • 4c", prompt: "Local anesthetic used by dentists (injected).", answer: "Class example: novocaine/lidocaine context." },
  { page: "Extra Credit • 4d", prompt: "Name of an antipsychotic drug.", answer: "Use class examples provided by instructor." },
  { page: "Extra Credit • 5a", prompt: "Which compound gives positive Tollens test (A–D set)?", answer: "Identify aldehyde/reactive reducing functional group." },
  { page: "Extra Credit • 5b", prompt: "Which can react with HCl to form a salt (A–D set)?", answer: "Amine-containing structure forms HCl salt." },
  { page: "Extra Credit • 5c", prompt: "Which can be reduced with NADH/enzyme but not oxidized with Fehling’s reagent?", answer: "Evaluate reagent selectivity by functional groups." }
];

const practiceTest = [
  { page: "Page 1", question: "Which compound above is a neurotransmitter?", options: ["A) compound A", "B) compound B", "C) compound C", "D) B and C", "E) no answer is correct"], answer: "A) compound A", explain: "Compound A is acetylcholine in this set." },
  { page: "Page 2", question: "Which is NOT an amphetamine?", options: ["A) Meth", "B) Caffeine", "C) Adderall", "D) Ritalin", "E) Ephedra"], answer: "B) Caffeine", explain: "Caffeine is a stimulant but not an amphetamine." },
  { page: "Page 2", question: "Which is NOT a narcotic pain killer?", options: ["A) Morphine", "B) Demerol", "C) Percocet", "D) Advil", "E) Oxycontin"], answer: "D) Advil", explain: "Advil is NSAID, not narcotic opioid." },
  { page: "Page 2", question: "Patients with Parkinson’s disease have too little ____.", options: ["A) Acetylcholine", "B) Dopamine", "C) GABA", "D) Histamine", "E) Serotonin"], answer: "B) Dopamine", explain: "Low dopamine is linked to Parkinson’s symptoms." },
  { page: "Page 2", question: "Anti-acids like Zantac and Tagamet affect which neurotransmitter?", options: ["A) Histamine", "B) Dopamine", "C) GABA", "D) Acetylcholine"], answer: "A) Histamine", explain: "They act in histamine-related pathways." },
  { page: "Page 2", question: "Prozac, Zoloft and Paxil affect which neurotransmitter?", options: ["A) Histamine", "B) GABA", "C) Serotonin", "D) Dopamine"], answer: "C) Serotonin", explain: "These are SSRIs associated with serotonin signaling." },
  { page: "Page 6", question: "Which smells the best?", options: ["A) Amines", "B) Esters", "C) Alcohols", "D) Amides"], answer: "B) Esters", explain: "Esters are commonly fruity/sweet smelling." },
  { page: "Page 6", question: "Which smells the worst?", options: ["A) Amines", "B) Esters", "C) Alcohols", "D) Amides"], answer: "A) Amines", explain: "Amines are often pungent/fishy." },
  { page: "Page 6", question: "Which are reducing sugars in this list?", options: ["A) Lactose only", "B) Maltose only", "C) Lactose and maltose", "D) Sucrose"], answer: "C) Lactose and maltose", explain: "Lactose and maltose reduce; sucrose does not." },
  { page: "Page 7", question: "Which sugar is found in RNA?", options: ["A) Glucose", "B) Ribose", "C) Fructose", "D) Galactose"], answer: "B) Ribose", explain: "RNA uses ribose." },
  { page: "Page 7", question: "Blood sugar (dextrose) is:", options: ["A) Fructose", "B) Ribose", "C) Glucose", "D) Maltose"], answer: "C) Glucose", explain: "Dextrose refers to D-glucose." },
  { page: "Page 7", question: "Which sugar is typically the sweetest?", options: ["A) Glucose", "B) Ribose", "C) Fructose", "D) Galactose"], answer: "C) Fructose", explain: "Fructose is generally sweetest among common monosaccharides." },
  { page: "Page 8", question: "Starting materials for photosynthesis include:", options: ["A) O2 + glucose", "B) CO2 + H2O + light", "C) H2 + O2", "D) ATP only"], answer: "B) CO2 + H2O + light", explain: "Photosynthesis uses carbon dioxide + water with light input." },
  { page: "Page 8", question: "How many different D-aldotetroses are there?", options: ["A) 1", "B) 2", "C) 4", "D) 8"], answer: "B) 2", explain: "Two D-aldotetroses exist." },
  { page: "Page 8", question: "How many different aldohexoses are there total?", options: ["A) 8", "B) 12", "C) 16", "D) 32"], answer: "C) 16", explain: "8 D and 8 L gives 16 total aldohexoses." }
];

const roadmap = [
  { title: "Pages 1-2", bullets: ["Compounds A/B/C functional groups", "Drug classification A/B/C", "Neurotransmitter matching Q17–29"] },
  { title: "Pages 3-4", bullets: ["Chiral carbon counting", "Isomer relationship identification", "Racemic/optical activity", "Sugar class categorization"] },
  { title: "Pages 5-7", bullets: ["Water solubility decisions", "Disaccharide linkage types", "Reducing sugar chemistry", "Large true/false bank (87–105)"] },
  { title: "Pages 8-11 + Extra", bullets: ["Photosynthesis + stereochemistry counts", "Naming and drawing structures", "Reaction product prediction", "Extra-credit reagent logic"] }
];

const nursTopics = [
  {
    title: "Chapter 1: Lifespan Principles and Theories",
    bullets: [
      "Define growth/development from lifespan perspective with examples",
      "Bioecological model with micro/meso/exo/macro/chronosystem examples",
      "Nature vs nurture debate with examples",
      "Critical period vs sensitive period",
      "Major theories: psychoanalytic, behaviorism, cognitive, social learning, humanism, Maslow",
      "Theorists + focus: Freud, Erikson, Piaget, Information Processing, Skinner, Bandura, Maslow"
    ]
  },
  {
    title: "Chapter 2: Genetics",
    bullets: [
      "What is the genome?",
      "Purpose of genetic counseling and who benefits most"
    ]
  },
  {
    title: "Chapter 2: Prenatal Development",
    bullets: [
      "Normal pregnancy length",
      "Trimester timeline and months",
      "Age of viability",
      "Teratogens with examples",
      "Threshold effect",
      "Adequate prenatal care and outcomes"
    ]
  },
  {
    title: "Chapter 2: Birth",
    bullets: [
      "Stages of labor and timing",
      "Definitions: effacement, dilation, cervix, fundus, presentation",
      "C-section prevalence and risks",
      "APGAR score and five measured characteristics",
      "Skin-to-skin: what/why/who/how",
      "Kangaroo care impact",
      "Postpartum depression vs severe postpartum psychological reaction",
      "Low birth weight definition and consequences"
    ]
  },
  {
    title: "Breastfeeding",
    bullets: [
      "Practices that encourage or interfere with establishing breastfeeding",
      "Benefits of breastfeeding for mother and baby"
    ]
  },
  {
    title: "Chapters 3 & 4: First Two Years of Life",
    bullets: [
      "Newborn reflexes",
      "Gross/fine motor skills and milestones (social smile, sitting, standing, crawling, walking, grasping, pincer grasp)",
      "Piaget sensorimotor intelligence",
      "Object permanence and when it develops",
      "First word timing, holophrase, vocabulary explosion",
      "Secure vs insecure attachment",
      "Stranger anxiety/wariness and separation anxiety",
      "Synchrony development",
      "Social referencing",
      "Infancy stages in Erikson and Freud",
      "SIDS and safe sleep environment",
      "Sense of self and red-rouge experiment timing"
    ]
  },
  {
    title: "Chapters 5 & 6: Early Childhood",
    bullets: [
      "Emotional regulation",
      "Benefits of play",
      "Types of play",
      "Piaget pre-operational thinking",
      "Injury prevention levels: primary/secondary/tertiary with examples",
      "Language development: vocabulary explosion, fast-mapping, overregularization"
    ]
  }
];

const state = loadState();
let rapidIndex = 0;
let rapidStart = Date.now();
let rapidTimer = null;
let examTimer = null;
let examSecondsLeft = 900;
let filteredCardIndexes = questionCards.map((_, i) => i);
let flashPosition = 0;
let flashRevealed = false;

function loadState() {
  const base = { cardStatus: {}, testAnswers: {}, examAnswers: {}, roadmapChecks: {}, nursChecks: {}, streak: 1, darkMode: false, examBest: 0, lastDay: "" };
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return parsed ? { ...base, ...parsed } : base;
  } catch {
    return base;
  }
}

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function setDailyStreak() {
  const today = new Date().toISOString().slice(0, 10);
  if (!state.lastDay) state.streak = 1;
  else if (state.lastDay !== today) {
    const diff = Math.round((new Date(today) - new Date(state.lastDay)) / 86400000);
    state.streak = diff === 1 ? state.streak + 1 : 1;
  }
  state.lastDay = today;
  saveState();
}

function resetProgress() { localStorage.removeItem(STORAGE_KEY); window.location.reload(); }

function getModeFromHash() {
  const value = (window.location.hash || "#cards").replace("#", "").toLowerCase();
  return ["cards", "test", "exam", "rapid", "roadmap", "nurs"].includes(value) ? value : "cards";
}

function switchMode(mode) {
  document.querySelectorAll(".mode").forEach((modeEl) => { modeEl.classList.add("hidden"); modeEl.classList.remove("active-mode"); });
  document.querySelectorAll(".tab").forEach((tab) => { tab.classList.remove("active"); tab.removeAttribute("aria-current"); });
  document.getElementById(`${mode}Mode`)?.classList.remove("hidden");
  document.getElementById(`${mode}Mode`)?.classList.add("active-mode");
  const tab = document.querySelector(`.tab[data-mode='${mode}']`);
  tab?.classList.add("active");
  tab?.setAttribute("aria-current", "page");
}

function updateProgress() {
  const reviewed = Object.keys(state.cardStatus).length;
  const confident = Object.values(state.cardStatus).filter((v) => v === "confident").length;
  const answered = Object.values(state.testAnswers).filter(Boolean).length;
  const correct = practiceTest.filter((q, i) => state.testAnswers[i] === q.answer).length;
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0;
  const roadmapChecked = Object.values(state.roadmapChecks).filter(Boolean).length;
  const nursChecked = Object.values(state.nursChecks).filter(Boolean).length;

  document.getElementById("reviewedCount").textContent = String(reviewed);
  document.getElementById("confidentCount").textContent = String(confident);
  document.getElementById("answeredCount").textContent = String(answered);
  document.getElementById("accuracyCount").textContent = `${accuracy}%`;
  document.getElementById("roadmapCheckedCount").textContent = String(roadmapChecked);
  document.getElementById("nursCheckedCount").textContent = String(nursChecked);
  document.getElementById("examBestCount").textContent = `${state.examBest}%`;
  document.getElementById("streakCount").textContent = `${state.streak} 🔥`;
}

function updateFlashCard() {
  const counter = document.getElementById("flashCounter");
  const page = document.getElementById("flashPage");
  const front = document.getElementById("flashFront");
  const back = document.getElementById("flashBack");
  const status = document.getElementById("flashStatus");

  if (!filteredCardIndexes.length) {
    counter.textContent = "0 / 0";
    page.textContent = "";
    front.textContent = "No cards match this search.";
    back.textContent = "";
    status.textContent = "";
    return;
  }

  const cardIndex = filteredCardIndexes[flashPosition];
  const card = questionCards[cardIndex];
  counter.textContent = `${flashPosition + 1} / ${filteredCardIndexes.length}`;
  page.textContent = card.page;
  front.textContent = card.prompt;
  back.textContent = `Answer: ${card.answer}`;

  front.classList.toggle("hidden", flashRevealed);
  back.classList.toggle("hidden", !flashRevealed);

  if (state.cardStatus[cardIndex] === "confident") {
    status.className = "status learned";
    status.textContent = "Confident";
  } else if (state.cardStatus[cardIndex] === "review") {
    status.className = "status review";
    status.textContent = "Needs Review";
  } else {
    status.className = "status";
    status.textContent = "Not marked";
  }
}

function applyCardSearch(query = "") {
  const needle = query.trim().toLowerCase();
  filteredCardIndexes = questionCards
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => `${card.page} ${card.prompt} ${card.answer}`.toLowerCase().includes(needle))
    .map(({ index }) => index);
  flashPosition = 0;
  flashRevealed = false;
  updateFlashCard();
}

function cycleFlash(delta) {
  if (!filteredCardIndexes.length) return;
  flashPosition = (flashPosition + delta + filteredCardIndexes.length) % filteredCardIndexes.length;
  flashRevealed = false;
  updateFlashCard();
}

function markFlash(status) {
  if (!filteredCardIndexes.length) return;
  const idx = filteredCardIndexes[flashPosition];
  state.cardStatus[idx] = status;
  saveState();
  updateProgress();
  updateFlashCard();
}

function shuffleFlash() {
  for (let i = filteredCardIndexes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [filteredCardIndexes[i], filteredCardIndexes[j]] = [filteredCardIndexes[j], filteredCardIndexes[i]];
  }
  flashPosition = 0;
  flashRevealed = false;
  updateFlashCard();
}

function renderPracticeTest() {
  const root = document.getElementById("testList");
  root.innerHTML = "";
  practiceTest.forEach((q, i) => {
    const box = document.createElement("article");
    box.className = "item";
    box.innerHTML = `<h3>${q.page}: ${q.question}</h3>`;
    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.type = "button";
      btn.textContent = opt;
      if (state.testAnswers[i] === opt) {
        btn.classList.add("selected");
        btn.classList.add(opt === q.answer ? "correct" : "wrong");
      }
      btn.addEventListener("click", () => { state.testAnswers[i] = opt; saveState(); renderPracticeTest(); updateProgress(); });
      box.appendChild(btn);
    });
    if (state.testAnswers[i]) {
      const isCorrect = state.testAnswers[i] === q.answer;
      const result = document.createElement("p");
      result.className = `status ${isCorrect ? "learned" : "review"}`;
      result.textContent = isCorrect ? `Correct: ${q.answer}` : `Correct answer: ${q.answer}`;
      box.appendChild(result);
      const explain = document.createElement("p");
      explain.className = "sub";
      explain.textContent = q.explain;
      box.appendChild(explain);
    }
    root.appendChild(box);
  });
}

function formatExamTime() {
  const min = String(Math.floor(examSecondsLeft / 60)).padStart(2, "0");
  const sec = String(examSecondsLeft % 60).padStart(2, "0");
  document.getElementById("examTimer").textContent = `${min}:${sec}`;
}

function renderExamMode(showResults = false) {
  const root = document.getElementById("examList");
  root.innerHTML = "";
  practiceTest.forEach((q, i) => {
    const box = document.createElement("article");
    box.className = "item";
    box.innerHTML = `<h3>Q${i + 1}. ${q.question}</h3>`;
    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.type = "button";
      btn.textContent = opt;
      const chosen = state.examAnswers[i] === opt;
      if (chosen) btn.classList.add("selected");
      if (showResults && opt === q.answer) btn.classList.add("correct");
      if (showResults && chosen && opt !== q.answer) btn.classList.add("wrong");
      btn.addEventListener("click", () => {
        if (showResults) return;
        state.examAnswers[i] = opt;
        saveState();
        renderExamMode(false);
      });
      box.appendChild(btn);
    });
    if (showResults) {
      const result = document.createElement("p");
      const isCorrect = state.examAnswers[i] === q.answer;
      result.className = `status ${isCorrect ? "learned" : "review"}`;
      result.textContent = isCorrect ? "Correct" : `Correct answer: ${q.answer}`;
      box.appendChild(result);
    }
    root.appendChild(box);
  });
}

function startExam() {
  clearInterval(examTimer);
  examSecondsLeft = 900;
  state.examAnswers = {};
  saveState();
  formatExamTime();
  renderExamMode(false);
  document.getElementById("examStatus").textContent = "Exam started. Submit anytime.";
  examTimer = setInterval(() => {
    examSecondsLeft -= 1;
    formatExamTime();
    if (examSecondsLeft <= 0) submitExam();
  }, 1000);
}

function submitExam() {
  clearInterval(examTimer);
  const total = practiceTest.length;
  const correct = practiceTest.filter((q, i) => state.examAnswers[i] === q.answer).length;
  const score = Math.round((correct / total) * 100);
  document.getElementById("examStatus").textContent = `Submitted. Score: ${correct}/${total} (${score}%).`;
  if (score > state.examBest) {
    state.examBest = score;
    saveState();
  }
  renderExamMode(true);
  updateProgress();
}

function renderRoadmap() {
  const root = document.getElementById("roadmap");
  root.innerHTML = "";
  roadmap.forEach((group, groupIndex) => {
    const wrapper = document.createElement("article");
    wrapper.className = "roadmap-group";
    const items = group.bullets
      .map((bullet, bulletIndex) => {
        const key = `${groupIndex}-${bulletIndex}`;
        const checked = state.roadmapChecks[key] ? "checked" : "";
        return `<label><input type="checkbox" data-roadmap-key="${key}" ${checked}> ${bullet}</label>`;
      })
      .join("");
    wrapper.innerHTML = `<h3>${group.title}</h3><div class="roadmap-items">${items}</div>`;
    root.appendChild(wrapper);
  });
  root.querySelectorAll("input[data-roadmap-key]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      state.roadmapChecks[checkbox.dataset.roadmapKey] = checkbox.checked;
      saveState();
      updateProgress();
    });
  });
}

function renderNursTopics(query = "") {
  const root = document.getElementById("nursTopics");
  root.innerHTML = "";
  const needle = query.trim().toLowerCase();

  nursTopics.forEach((group, groupIndex) => {
    const filteredBullets = group.bullets.filter((b) => (`${group.title} ${b}`).toLowerCase().includes(needle));
    if (!filteredBullets.length) return;

    const wrapper = document.createElement("article");
    wrapper.className = "roadmap-group";
    const items = filteredBullets
      .map((bullet, bulletIndex) => {
        const key = `nurs-${groupIndex}-${bulletIndex}`;
        const checked = state.nursChecks[key] ? "checked" : "";
        return `<label><input type="checkbox" data-nurs-key="${key}" ${checked}> ${bullet}</label>`;
      })
      .join("");
    wrapper.innerHTML = `<h3>${group.title}</h3><div class="roadmap-items">${items}</div>`;
    root.appendChild(wrapper);
  });

  root.querySelectorAll("input[data-nurs-key]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      state.nursChecks[checkbox.dataset.nursKey] = checkbox.checked;
      saveState();
      updateProgress();
    });
  });
}

function updateRapidPrompt() {
  const card = questionCards[rapidIndex % questionCards.length];
  document.getElementById("rapidPage").textContent = card.page;
  document.getElementById("rapidPrompt").textContent = card.prompt;
  document.getElementById("rapidAnswer").textContent = `Answer: ${card.answer}`;
  document.getElementById("rapidAnswer").classList.add("hidden");
}

function startRapidTimer() {
  clearInterval(rapidTimer);
  rapidStart = Date.now();
  rapidTimer = setInterval(() => {
    const sec = ((Date.now() - rapidStart) / 1000).toFixed(1);
    document.getElementById("rapidTimer").textContent = `${sec}s`;
  }, 100);
}

function setupUI() {
  document.body.classList.toggle("dark", !!state.darkMode);
  document.getElementById("themeToggle").addEventListener("click", () => {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle("dark", state.darkMode);
    saveState();
  });
  document.getElementById("resetProgress").addEventListener("click", resetProgress);

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      const mode = tab.dataset.mode;
      window.location.hash = mode;
      switchMode(mode);
    });
  });
  window.addEventListener("hashchange", () => switchMode(getModeFromHash()));

  document.getElementById("searchInput").addEventListener("input", (event) => applyCardSearch(event.target.value));
  document.getElementById("nursSearchInput").addEventListener("input", (event) => renderNursTopics(event.target.value));

  document.getElementById("flashFlip").addEventListener("click", () => { flashRevealed = !flashRevealed; updateFlashCard(); });
  document.getElementById("flashCard").addEventListener("click", () => { flashRevealed = !flashRevealed; updateFlashCard(); });
  document.getElementById("flashPrev").addEventListener("click", (event) => { event.stopPropagation(); cycleFlash(-1); });
  document.getElementById("flashNext").addEventListener("click", (event) => { event.stopPropagation(); cycleFlash(1); });
  document.getElementById("flashShuffle").addEventListener("click", (event) => { event.stopPropagation(); shuffleFlash(); });
  document.getElementById("markConfident").addEventListener("click", (event) => { event.stopPropagation(); markFlash("confident"); });
  document.getElementById("markReview").addEventListener("click", (event) => { event.stopPropagation(); markFlash("review"); });

  document.getElementById("nextRapid").addEventListener("click", () => { rapidIndex += 1; updateRapidPrompt(); });
  document.getElementById("revealRapid").addEventListener("click", () => document.getElementById("rapidAnswer").classList.toggle("hidden"));
  document.getElementById("startExam").addEventListener("click", startExam);
  document.getElementById("submitExam").addEventListener("click", submitExam);
}

setDailyStreak();
setupUI();
applyCardSearch("");
renderPracticeTest();
renderExamMode(false);
renderRoadmap();
renderNursTopics("");
updateRapidPrompt();
startRapidTimer();
formatExamTime();
switchMode(getModeFromHash());
updateProgress();
