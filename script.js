const STORAGE_KEY = "chem103-study-hub-state";

// NOTE: Prompts below are copied/paraphrased tightly from the uploaded exam pages.
// No correctness key is embedded because no answer key was provided.
const questionCards = [
  { page: "Page 1", prompt: "Which compound above is a monoamine? (A compound A, B compound B, C compound C, D B and C, E no answer is correct)" },
  { page: "Page 1", prompt: "Which compound above is an amine salt?" },
  { page: "Page 1", prompt: "Which compound above is an ester?" },
  { page: "Page 1", prompt: "Which compound above is trisubstituted amine?" },
  { page: "Page 1", prompt: "Which compound above is a neurotransmitter?" },
  { page: "Page 2", prompt: "Which is not an amphetamine? (Meth, Caffeine, Adderall, Ritalin, Ephedra)" },
  { page: "Page 2", prompt: "Which is not a narcotic pain killer?" },
  { page: "Page 2", prompt: "Which of the following compounds are amides?" },
  { page: "Page 2", prompt: "Patients with Parkinsons disease have too little ____ (A Acetylcholine, B Dopamine, C GABA, D Histamine, E Serotonin)." },
  { page: "Page 2", prompt: "Anti-acids like Zantac and Tagamet affect this neurotransmitter." },
  { page: "Page 2", prompt: "Prozac, Zoloft and Paxil affect this neurotransmitter." },
  { page: "Page 3", prompt: "How many chiral carbons in the following compounds? (A 0, B 1, C 2, D 3, E 4 or more)." },
  { page: "Page 3", prompt: "What is the relationship between the following pairs: same molecule, structural isomers, enantiomers, diastereomers, or no relationship?" },
  { page: "Page 4", prompt: "Which of the following is a racemic mixture?" },
  { page: "Page 4", prompt: "Classifying compounds by optical activity: optically active, inactive no chiral carbons, or inactive meso." },
  { page: "Page 4", prompt: "Classifying compounds: monosaccharide, disaccharide, or not a sugar." },
  { page: "Page 5", prompt: "Which are soluble in water? Write A for soluble and B for not soluble." },
  { page: "Page 5", prompt: "What type of linkage is there in the following disaccharides? (α 1-4, α 1-6, β 1-4, β 1-6, answer not given)." },
  { page: "Page 6", prompt: "Which is true for compound II and III if compound I melts at 103 C and rotates light +92°?" },
  { page: "Page 6", prompt: "Which of the following will react with Benedicts or Tollens reagent?" },
  { page: "Page 6", prompt: "Which of the following is a reducing sugar?" },
  { page: "Page 6", prompt: "Which can pass through cell membranes? (monosaccharide/disaccharides/polysaccharides)." },
  { page: "Page 6", prompt: "Which smells the best? (amines, esters, alcohols, amides)." },
  { page: "Page 6", prompt: "Which smells the worst? (amines, esters, alcohols, amides)." },
  { page: "Page 7", prompt: "For Q78-86 use answers: glucose, ribose, glyceraldehyde, fructose, galactose." },
  { page: "Page 7", prompt: "What is blood sugar? What is dextrose? Which sugar is in RNA? Which is sweetest?" },
  { page: "Page 7", prompt: "True/False section 87-105 (drug effects, stereochemistry, sugars, photosynthesis)." },
  { page: "Page 8", prompt: "What are the starting materials for photosynthesis by a green plant?" },
  { page: "Page 8", prompt: "How many different aldohexoses are there?" },
  { page: "Page 8", prompt: "How many different D-aldotetroses are there?" },
  { page: "Page 8", prompt: "Draw the α form of the provided Fischer projection using the template." },
  { page: "Page 9", prompt: "What are the common names of the following monosaccharides?" },
  { page: "Page 9", prompt: "Draw structures: acetamide, isopropyl butanoate, ammonium benzoate." },
  { page: "Page 10", prompt: "Name the following compounds (common or IUPAC)." },
  { page: "Page 11", prompt: "Draw products for reactions: esterification, NADH/enzyme, HCl salt formation, Tollens oxidation, basic hydrolysis." },
  { page: "Extra Credit", prompt: "Draw final product of maltose + maltase, then NADH/enzyme." },
  { page: "Extra Credit", prompt: "D-deoxyribose reacts with Tollens reagent — draw product." },
  { page: "Extra Credit", prompt: "How many stereoisomers are possible for the shown structure?" }
];

const practiceTest = [
  {
    page: "Page 1",
    question: "Which compound above is a neurotransmitter?",
    options: ["A) compound A", "B) compound B", "C) compound C", "D) B and C", "E) no answer is correct"]
  },
  {
    page: "Page 2",
    question: "Which is not an amphetamine?",
    options: ["A) Meth or methedrine", "B) Caffeine", "C) Adderall", "D) Ritalin", "E) Ephedra (Ephedrine)"]
  },
  {
    page: "Page 2",
    question: "Which is not a narcotic pain killer?",
    options: ["A) morphine", "B) Demerol", "C) Percocet or Percodan", "D) Advil", "E) oxycontin"]
  },
  {
    page: "Page 6",
    question: "Which smells the best?",
    options: ["A) amines", "B) esters", "C) alcohols", "D) amides"]
  },
  {
    page: "Page 6",
    question: "Which smells the worst?",
    options: ["A) amines", "B) esters", "C) alcohols", "D) amides"]
  }
];

const roadmap = [
  { title: "Pages 1-2", bullets: ["Functional groups and drug chemistry", "Neurotransmitter matching", "Classification questions"] },
  { title: "Pages 3-4", bullets: ["Chirality and stereoisomers", "Racemic and optical activity", "Sugar classification"] },
  { title: "Pages 5-7", bullets: ["Water solubility", "Sugar linkages/reducing sugars", "Large T/F section"] },
  { title: "Pages 8-11 + Extra", bullets: ["Open-response calculations", "Drawing structures", "Reaction products"] }
];

const state = loadState();
let rapidIndex = 0;
let rapidStart = Date.now();
let rapidTimer = null;

function loadState() {
  const base = {
    cardStatus: {},
    testAnswers: {},
    streak: 1,
    darkMode: false,
    lastDay: ""
  };
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return parsed ? { ...base, ...parsed } : base;
  } catch {
    return base;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

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

function updateProgress() {
  const values = Object.values(state.cardStatus);
  const reviewed = values.length;
  const confident = values.filter((v) => v === "confident").length;
  const answered = Object.values(state.testAnswers).filter(Boolean).length;

  document.getElementById("reviewedCount").textContent = reviewed;
  document.getElementById("confidentCount").textContent = confident;
  document.getElementById("answeredCount").textContent = answered;
  document.getElementById("streakCount").textContent = `${state.streak} 🔥`;
}

function renderRoadmap() {
  const root = document.getElementById("roadmap");
  root.innerHTML = "";
  roadmap.forEach((g) => {
    const div = document.createElement("div");
    div.className = "roadmap-group";
    div.innerHTML = `<h3>${g.title}</h3><ul>${g.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`;
    root.appendChild(div);
  });
}

function renderCards(query = "") {
  const root = document.getElementById("cardsList");
  const template = document.getElementById("cardTemplate");
  root.innerHTML = "";

  questionCards.forEach((card, i) => {
    const text = `${card.page} ${card.prompt}`.toLowerCase();
    if (query && !text.includes(query.toLowerCase())) return;

    const node = template.content.cloneNode(true);
    node.querySelector(".page").textContent = card.page;
    node.querySelector(".prompt").textContent = card.prompt;
    const status = node.querySelector(".status");

    node.querySelector(".btn.good").addEventListener("click", () => {
      state.cardStatus[i] = "confident";
      saveState();
      renderCards(document.getElementById("searchInput").value);
      updateProgress();
    });

    node.querySelector(".btn.warn").addEventListener("click", () => {
      state.cardStatus[i] = "review";
      saveState();
      renderCards(document.getElementById("searchInput").value);
      updateProgress();
    });

    if (state.cardStatus[i] === "confident") {
      status.className = "status learned";
      status.textContent = "Confident ✅";
    } else if (state.cardStatus[i] === "review") {
      status.className = "status review";
      status.textContent = "Review again 🔁";
    } else {
      status.textContent = "Unmarked";
    }

    root.appendChild(node);
  });
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
        btn.style.borderColor = "var(--accent)";
      }

      btn.addEventListener("click", () => {
        state.testAnswers[i] = opt;
        saveState();
        renderPracticeTest();
        updateProgress();
      });

      box.appendChild(btn);
    });

    root.appendChild(box);
  });
}

function updateRapidPrompt() {
  const card = questionCards[rapidIndex % questionCards.length];
  document.getElementById("rapidPage").textContent = card.page;
  document.getElementById("rapidPrompt").textContent = card.prompt;
}

function startRapidTimer() {
  clearInterval(rapidTimer);
  rapidStart = Date.now();
  rapidTimer = setInterval(() => {
    const sec = ((Date.now() - rapidStart) / 1000).toFixed(1);
    document.getElementById("rapidTimer").textContent = `${sec}s`;
  }, 100);
}

function switchMode(mode) {
  document.querySelectorAll(".mode").forEach((m) => m.classList.add("hidden"));
  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  document.getElementById(`${mode}Mode`).classList.remove("hidden");
  document.querySelector(`.tab[data-mode='${mode}']`)?.classList.add("active");
}

function setupUI() {
  document.body.classList.toggle("dark", !!state.darkMode);

  document.getElementById("themeToggle").addEventListener("click", () => {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle("dark", state.darkMode);
    saveState();
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => switchMode(tab.dataset.mode));
  });

  document.getElementById("searchInput").addEventListener("input", (e) => {
    renderCards(e.target.value);
  });

  document.getElementById("nextRapid").addEventListener("click", () => {
    rapidIndex += 1;
    updateRapidPrompt();
  });
}

setDailyStreak();
setupUI();
renderRoadmap();
renderCards();
renderPracticeTest();
updateRapidPrompt();
startRapidTimer();
updateProgress();
