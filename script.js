const STORAGE_KEY = "chem103-study-hub-state";

const questionCards = [
  { page: "Page 1", prompt: "Which compound above is a monoamine?", answer: "Use A/B/C structures on page 1 and identify one amino group." },
  { page: "Page 1", prompt: "Which compound above is an amine salt?", answer: "Look for protonated amine + counterion." },
  { page: "Page 1", prompt: "Which compound above is an ester?", answer: "Look for -COO- functional group." },
  { page: "Page 1", prompt: "Which compound above is trisubstituted amine?", answer: "Find N bonded to three carbon groups." },
  { page: "Page 1", prompt: "Which compound above is a neurotransmitter?", answer: "Acetylcholine (compound A in packet)." },
  { page: "Page 1", prompt: "Drug classification set: stimulant/sedative/neither for listed drugs.", answer: "Review Benadryl, nicotine, barbiturates, aspirin, pseudoephedrine, caffeine, cocaine, amphetamines." },
  { page: "Page 2", prompt: "Which is not an amphetamine?", answer: "Caffeine." },
  { page: "Page 2", prompt: "Which is not a narcotic pain killer?", answer: "Advil." },
  { page: "Page 2", prompt: "Which compounds are amides?", answer: "Use the amide functional group (C=O next to N)." },
  { page: "Page 2", prompt: "Patients with Parkinson's disease have too little ____.", answer: "Dopamine." },
  { page: "Page 2", prompt: "Anti-acids like Zantac and Tagamet affect this neurotransmitter.", answer: "Histamine." },
  { page: "Page 2", prompt: "Prozac, Zoloft and Paxil affect this neurotransmitter.", answer: "Serotonin." },
  { page: "Page 2", prompt: "Cocaine affects re-uptake of which neurotransmitter?", answer: "Dopamine (in this course context)." },
  { page: "Page 2", prompt: "Valium/Xanax affect which neurotransmitter?", answer: "GABA." },
  { page: "Page 2", prompt: "Nicotine is an agonist to which neurotransmitter?", answer: "Acetylcholine." },
  { page: "Page 3", prompt: "How many chiral carbons in each shown compound?", answer: "Use stereocenter counting rules for each structure 30–35." },
  { page: "Page 3", prompt: "Relationship between pairs: same, structural isomers, enantiomers, diastereomers, no relationship.", answer: "Apply stereochemistry comparison per pair 36–43." },
  { page: "Page 4", prompt: "Which choice is a racemic mixture?", answer: "Look for equal moles of enantiomeric pair." },
  { page: "Page 4", prompt: "Classify optical activity: active, inactive no chiral C, or inactive meso.", answer: "Evaluate each structure’s chirality and symmetry." },
  { page: "Page 4", prompt: "Classify as monosaccharide, disaccharide, or not a sugar.", answer: "Identify carbohydrate unit count and structure type." },
  { page: "Page 5", prompt: "Which compounds are soluble in water?", answer: "Use polarity/ionic character and hydrogen-bond potential." },
  { page: "Page 5", prompt: "Type of linkage in shown disaccharides (alpha/beta and 1-4/1-6).", answer: "Read anomeric carbon orientation and linkage positions." },
  { page: "Page 6", prompt: "If compound I melts at 103°C and rotates +92°, what is true for II and III?", answer: "Use enantiomer/diastereomer physical property rules." },
  { page: "Page 6", prompt: "Which react with Benedict’s or Tollens reagent?", answer: "Reducing sugars and free aldehyde/hemiketal forms react." },
  { page: "Page 6", prompt: "Which is a reducing sugar?", answer: "Lactose and maltose are reducing; sucrose is not." },
  { page: "Page 6", prompt: "Which can pass through cell membranes?", answer: "Monosaccharides (smallest) in this exam framing." },
  { page: "Page 6", prompt: "Which smells best?", answer: "Esters." },
  { page: "Page 6", prompt: "Which smells worst?", answer: "Amines." },
  { page: "Page 7", prompt: "Question set 78–86 with answers: glucose, ribose, glyceraldehyde, fructose, galactose.", answer: "Know blood sugar, dextrose, RNA sugar, sweetest sugar, keto/aldo types." },
  { page: "Page 7", prompt: "True/False section 87–105 (drugs, stereochemistry, sugars, photosynthesis).", answer: "Review each statement from packet; use class definitions." },
  { page: "Page 8", prompt: "Starting materials for photosynthesis by green plants.", answer: "CO2 + H2O + light." },
  { page: "Page 8", prompt: "How many different aldohexoses are there?", answer: "8 D + 8 L = 16 total aldohexoses." },
  { page: "Page 8", prompt: "How many different D-aldotetroses are there?", answer: "2." },
  { page: "Page 8", prompt: "Draw alpha form from provided Fischer projection.", answer: "Use Haworth conversion rules for alpha anomer." },
  { page: "Page 8", prompt: "What two compounds react in the body to produce shown ester product?", answer: "Identify corresponding acid + alcohol components." },
  { page: "Page 9", prompt: "Common names of shown monosaccharides.", answer: "Identify each by aldose/ketose and stereochemistry pattern." },
  { page: "Page 9", prompt: "Draw structures: acetamide, isopropyl butanoate, ammonium benzoate.", answer: "Use naming rules for amide, ester, and ammonium carboxylate salt." },
  { page: "Page 10", prompt: "Name each shown compound (common or IUPAC as requested).", answer: "Apply naming hierarchy and substituent numbering." },
  { page: "Page 11", prompt: "Draw products: esterification with catalyst.", answer: "Carboxylic acid + alcohol → ester + water." },
  { page: "Page 11", prompt: "Draw product with NADH/enzyme reduction.", answer: "Carbonyl reduction to alcohol in carbohydrate context." },
  { page: "Page 11", prompt: "Draw HCl(aq) product for amine-containing compound.", answer: "Amine protonation → ammonium chloride salt." },
  { page: "Page 11", prompt: "Draw Tollens reagent oxidation product.", answer: "Aldehyde/aldose oxidized to carboxylate/acid form." },
  { page: "Page 11", prompt: "Draw product of basic hydrolysis (NaOH).", answer: "Ester cleavage to carboxylate + alcohol." },
  { page: "Extra Credit", prompt: "Final product of maltose + maltase, then NADH/enzyme.", answer: "Hydrolysis to glucose units then reduction step as directed." },
  { page: "Extra Credit", prompt: "Product when D-deoxyribose reacts with Tollens reagent.", answer: "Oxidized sugar form (aldehyde to acid/carboxylate)." },
  { page: "Extra Credit", prompt: "How many stereoisomers are possible for shown structure?", answer: "Use 2^n rule adjusted for symmetry." },
  { page: "Extra Credit", prompt: "Drug name fill-ins (ADHD drug, OTC amphetamine, dentist local anesthetic, antipsychotic).", answer: "Review course examples: e.g., Adderall/Ritalin, Ephedra, Novocaine/Lidocaine, etc." },
  { page: "Extra Credit", prompt: "Which compounds react with Tollens/HCl/NADH-enzyme conditions in final extra-credit set?", answer: "Apply reagent reactivity patterns to A–D structures." }
];

const practiceTest = [
  { page: "Page 1", question: "Which compound above is a neurotransmitter?", options: ["A) compound A", "B) compound B", "C) compound C", "D) B and C", "E) no answer is correct"], answer: "A) compound A", explain: "Compound A is acetylcholine, a neurotransmitter." },
  { page: "Page 2", question: "Which is NOT an amphetamine?", options: ["A) Meth", "B) Caffeine", "C) Adderall", "D) Ritalin", "E) Ephedra"], answer: "B) Caffeine", explain: "Caffeine is a stimulant but not an amphetamine." },
  { page: "Page 2", question: "Which is NOT a narcotic pain killer?", options: ["A) Morphine", "B) Demerol", "C) Percocet", "D) Advil", "E) Oxycontin"], answer: "D) Advil", explain: "Advil is an NSAID, not an opioid narcotic." },
  { page: "Page 2", question: "Patients with Parkinson's disease have too little ____.", options: ["A) Acetylcholine", "B) Dopamine", "C) GABA", "D) Histamine", "E) Serotonin"], answer: "B) Dopamine", explain: "Parkinson's is linked to dopamine deficiency." },
  { page: "Page 2", question: "Anti-acids like Zantac and Tagamet affect which neurotransmitter?", options: ["A) Histamine", "B) Dopamine", "C) GABA", "D) Acetylcholine"], answer: "A) Histamine", explain: "These are histamine receptor-related drugs." },
  { page: "Page 2", question: "Prozac, Zoloft and Paxil affect which neurotransmitter?", options: ["A) Histamine", "B) GABA", "C) Serotonin", "D) Dopamine"], answer: "C) Serotonin", explain: "They are SSRIs tied to serotonin signaling." },
  { page: "Page 6", question: "Which smells the best?", options: ["A) Amines", "B) Esters", "C) Alcohols", "D) Amides"], answer: "B) Esters", explain: "Esters are typically fruity/sweet." },
  { page: "Page 6", question: "Which smells the worst?", options: ["A) Amines", "B) Esters", "C) Alcohols", "D) Amides"], answer: "A) Amines", explain: "Amines are often fishy/pungent." },
  { page: "Page 6", question: "Which is a reducing sugar group?", options: ["A) Lactose only", "B) Maltose only", "C) Lactose and maltose", "D) Sucrose"], answer: "C) Lactose and maltose", explain: "Lactose and maltose are reducing; sucrose is non-reducing." },
  { page: "Page 7", question: "Which sugar is in RNA?", options: ["A) Glucose", "B) Ribose", "C) Fructose", "D) Galactose"], answer: "B) Ribose", explain: "RNA contains ribose." },
  { page: "Page 7", question: "Blood sugar (dextrose) is:", options: ["A) Fructose", "B) Ribose", "C) Glucose", "D) Maltose"], answer: "C) Glucose", explain: "Dextrose is D-glucose." },
  { page: "Page 7", question: "Which sugar is generally the sweetest?", options: ["A) Glucose", "B) Ribose", "C) Fructose", "D) Galactose"], answer: "C) Fructose", explain: "Fructose is typically sweetest." },
  { page: "Page 8", question: "Starting materials for photosynthesis include:", options: ["A) O2 + glucose", "B) CO2 + H2O + light", "C) H2 + O2", "D) ATP only"], answer: "B) CO2 + H2O + light", explain: "Photosynthesis uses CO2 and water with light energy." },
  { page: "Page 8", question: "How many different D-aldotetroses are there?", options: ["A) 1", "B) 2", "C) 4", "D) 8"], answer: "B) 2", explain: "D-aldotetroses total 2." }
];

const roadmap = [
  { title: "Pages 1-2", bullets: ["Compounds A/B/C functional groups", "Drug class classification", "Neurotransmitter matching (17–29)"] },
  { title: "Pages 3-4", bullets: ["Chiral carbon counts", "Enantiomer/diastereomer relationships", "Racemic + optical activity", "Sugar class ID"] },
  { title: "Pages 5-7", bullets: ["Water solubility set", "Disaccharide linkage types", "Reducing sugars + Benedict/Tollens", "Big T/F section 87–105"] },
  { title: "Pages 8-11 + Extra", bullets: ["Photosynthesis + stereochemistry counts", "Name/draw structures", "Reaction products", "Extra credit reagent set"] }
];

const nursTopics = [
  {
    title: "Chapter 1: Lifespan Principles & Theories",
    bullets: [
      "Lifespan perspective: multi-directional, multi-contextual, multi-cultural, plasticity",
      "Bioecological model: micro/meso/exo/macro/chronosystems",
      "Nature vs nurture debate",
      "Critical period vs sensitive period",
      "Major theories: psychoanalytic, behaviorism, cognitive, social learning, humanism, Maslow",
      "Theorists focus: Freud, Erikson, Piaget, Information Processing, Skinner, Bandura, Maslow"
    ]
  },
  {
    title: "Chapter 2: Genetics + Prenatal Development + Birth",
    bullets: [
      "Genome and genetic counseling",
      "Trimester timelines + viability",
      "Teratogens + threshold effect",
      "Adequate prenatal care",
      "Stages of labor",
      "Effacement/dilation/cervix/fundus/presentation",
      "C-section rates and risks",
      "APGAR score (5 components)",
      "Skin-to-skin + kangaroo care",
      "Postpartum depression vs postpartum psychosis",
      "Low birth weight definition and outcomes"
    ]
  },
  {
    title: "Breastfeeding",
    bullets: [
      "Practices that encourage or interfere with breastfeeding",
      "Benefits for mother and baby"
    ]
  },
  {
    title: "Chapters 3 & 4: First Two Years of Life",
    bullets: [
      "Newborn reflexes",
      "Gross/fine motor milestones (sitting, walking, pincer grasp, etc.)",
      "Piaget sensorimotor intelligence",
      "Object permanence timeline",
      "First words, holophrase, vocabulary explosion",
      "Secure vs insecure attachment",
      "Stranger anxiety + separation anxiety",
      "Synchrony and social referencing",
      "Erikson/Freud infancy stages",
      "SIDS + safe sleep",
      "Sense of self + rouge test timing"
    ]
  },
  {
    title: "Chapters 5 & 6: Early Childhood",
    bullets: [
      "Emotional regulation",
      "Benefits and types of play",
      "Piaget pre-operational thinking",
      "Injury prevention levels: primary/secondary/tertiary",
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
