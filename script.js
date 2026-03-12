const STORAGE_KEY = "chem103-study-hub-state";

const questionCards = [
  { page: "Page 2", prompt: "Patients with Parkinson's disease have too little ____.", answer: "Dopamine" },
  { page: "Page 2", prompt: "Anti-acids like Zantac and Tagamet affect this neurotransmitter.", answer: "Histamine" },
  { page: "Page 2", prompt: "Prozac, Zoloft and Paxil affect this neurotransmitter.", answer: "Serotonin" },
  { page: "Page 6", prompt: "Which smells the best: amines, esters, alcohols, amides?", answer: "Esters" },
  { page: "Page 6", prompt: "Which smells the worst: amines, esters, alcohols, amides?", answer: "Amines" },
  { page: "Page 7", prompt: "Which sugar is in RNA?", answer: "Ribose" },
  { page: "Page 7", prompt: "What is blood sugar / dextrose?", answer: "Glucose" },
  { page: "Page 8", prompt: "What are the starting materials for photosynthesis?", answer: "Carbon dioxide + water + light energy" }
];

const practiceTest = [
  {
    page: "Page 2",
    question: "Which is NOT an amphetamine?",
    options: ["A) Meth", "B) Caffeine", "C) Adderall", "D) Ritalin", "E) Ephedra"],
    answer: "B) Caffeine",
    explain: "Caffeine is a stimulant but not an amphetamine."
  },
  {
    page: "Page 2",
    question: "Which is NOT a narcotic pain killer?",
    options: ["A) Morphine", "B) Demerol", "C) Percocet", "D) Advil", "E) Oxycontin"],
    answer: "D) Advil",
    explain: "Advil (ibuprofen) is an NSAID, not an opioid narcotic."
  },
  {
    page: "Page 2",
    question: "Patients with Parkinson's disease have too little ____.",
    options: ["A) Acetylcholine", "B) Dopamine", "C) GABA", "D) Histamine", "E) Serotonin"],
    answer: "B) Dopamine",
    explain: "Parkinson's is linked to dopamine deficiency in key brain pathways."
  },
  {
    page: "Page 6",
    question: "Which smells the best?",
    options: ["A) Amines", "B) Esters", "C) Alcohols", "D) Amides"],
    answer: "B) Esters",
    explain: "Esters are often associated with sweet/fruity smells."
  },
  {
    page: "Page 6",
    question: "Which smells the worst?",
    options: ["A) Amines", "B) Esters", "C) Alcohols", "D) Amides"],
    answer: "A) Amines",
    explain: "Amines are commonly associated with fishy/pungent odors."
  },
  {
    page: "Page 7",
    question: "Which sugar is in RNA?",
    options: ["A) Glucose", "B) Ribose", "C) Fructose", "D) Galactose"],
    answer: "B) Ribose",
    explain: "RNA contains ribose; DNA contains deoxyribose."
  },
  {
    page: "Page 7",
    question: "Blood sugar (dextrose) is:",
    options: ["A) Fructose", "B) Ribose", "C) Glucose", "D) Maltose"],
    answer: "C) Glucose",
    explain: "Dextrose is the D-form of glucose."
  },
  {
    page: "Page 8",
    question: "Starting materials for photosynthesis include:",
    options: ["A) O2 + glucose", "B) CO2 + H2O + light", "C) H2 + O2", "D) ATP only"],
    answer: "B) CO2 + H2O + light",
    explain: "Photosynthesis uses carbon dioxide and water driven by light energy."
  }
];

const roadmap = [
  { title: "Pages 1-2", bullets: ["Functional groups", "Neurotransmitters", "Drug chemistry"] },
  { title: "Pages 3-4", bullets: ["Chirality", "Racemic mixtures", "Optical activity"] },
  { title: "Pages 5-7", bullets: ["Sugar linkages", "Reducing sugars", "Water solubility"] },
  { title: "Pages 8-11 + Extra", bullets: ["Photosynthesis", "Naming/drawing", "Reaction products"] }
];

const state = loadState();
let rapidIndex = 0;
let rapidStart = Date.now();
let rapidTimer = null;
let examTimer = null;
let examSecondsLeft = 900;

function loadState() {
  const base = {
    cardStatus: {},
    testAnswers: {},
    examAnswers: {},
    roadmapChecks: {},
    streak: 1,
    darkMode: false,
    examBest: 0,
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
  if (!state.lastDay) {
    state.streak = 1;
  } else if (state.lastDay !== today) {
    const diff = Math.round((new Date(today) - new Date(state.lastDay)) / 86400000);
    state.streak = diff === 1 ? state.streak + 1 : 1;
  }
  state.lastDay = today;
  saveState();
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

function getModeFromHash() {
  const value = (window.location.hash || "#cards").replace("#", "").toLowerCase();
  const valid = ["cards", "test", "exam", "rapid", "roadmap"];
  return valid.includes(value) ? value : "cards";
}

function switchMode(mode) {
  document.querySelectorAll(".mode").forEach((modeEl) => {
    modeEl.classList.add("hidden");
    modeEl.classList.remove("active-mode");
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
    tab.removeAttribute("aria-current");
  });

  const modeEl = document.getElementById(`${mode}Mode`);
  modeEl?.classList.remove("hidden");
  modeEl?.classList.add("active-mode");

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

  document.getElementById("reviewedCount").textContent = String(reviewed);
  document.getElementById("confidentCount").textContent = String(confident);
  document.getElementById("answeredCount").textContent = String(answered);
  document.getElementById("accuracyCount").textContent = `${accuracy}%`;
  document.getElementById("roadmapCheckedCount").textContent = String(roadmapChecked);
  document.getElementById("examBestCount").textContent = `${state.examBest}%`;
  document.getElementById("streakCount").textContent = `${state.streak} 🔥`;
}

function renderCards(query = "") {
  const root = document.getElementById("cardsList");
  const template = document.getElementById("cardTemplate");
  root.innerHTML = "";

  questionCards.forEach((card, index) => {
    const text = `${card.page} ${card.prompt} ${card.answer}`.toLowerCase();
    if (query && !text.includes(query.toLowerCase())) return;

    const node = template.content.cloneNode(true);
    node.querySelector(".page").textContent = card.page;
    node.querySelector(".prompt").textContent = card.prompt;

    const answerEl = node.querySelector(".answer");
    answerEl.textContent = `Answer: ${card.answer}`;

    node.querySelector(".reveal-answer").addEventListener("click", () => {
      answerEl.classList.toggle("hidden");
    });

    const status = node.querySelector(".status");
    if (state.cardStatus[index] === "confident") {
      status.className = "status learned";
      status.textContent = "Confident";
    } else if (state.cardStatus[index] === "review") {
      status.className = "status review";
      status.textContent = "Needs Review";
    } else {
      status.className = "status";
      status.textContent = "Not marked";
    }

    node.querySelector(".btn.good").addEventListener("click", () => {
      state.cardStatus[index] = "confident";
      saveState();
      renderCards(document.getElementById("searchInput").value);
      updateProgress();
    });

    node.querySelector(".btn.warn").addEventListener("click", () => {
      state.cardStatus[index] = "review";
      saveState();
      renderCards(document.getElementById("searchInput").value);
      updateProgress();
    });

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
        btn.classList.add(opt === q.answer ? "correct" : "wrong");
      }

      btn.addEventListener("click", () => {
        state.testAnswers[i] = opt;
        saveState();
        renderPracticeTest();
        updateProgress();
      });

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
    if (examSecondsLeft <= 0) {
      submitExam();
    }
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

  window.addEventListener("hashchange", () => {
    switchMode(getModeFromHash());
  });

  document.getElementById("searchInput").addEventListener("input", (event) => {
    renderCards(event.target.value);
  });

  document.getElementById("nextRapid").addEventListener("click", () => {
    rapidIndex += 1;
    updateRapidPrompt();
  });

  document.getElementById("revealRapid").addEventListener("click", () => {
    document.getElementById("rapidAnswer").classList.toggle("hidden");
  });

  document.getElementById("startExam").addEventListener("click", startExam);
  document.getElementById("submitExam").addEventListener("click", submitExam);
}

setDailyStreak();
setupUI();
renderCards();
renderPracticeTest();
renderExamMode(false);
renderRoadmap();
updateRapidPrompt();
startRapidTimer();
formatExamTime();
switchMode(getModeFromHash());
updateProgress();
