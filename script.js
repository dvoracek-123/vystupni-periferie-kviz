
const questions = [
  {
    title: "Co jsou výstupní periferie?",
    category: "Základy",
    answer: "Výstupní periferie jsou zařízení, která předávají informace z počítače uživateli. Patří mezi ně například monitor, tiskárna, reproduktory nebo projektor."
  },
  {
    title: "Jaké jsou hlavní druhy výstupních zařízení?",
    category: "Základy",
    answer: "Mezi běžné výstupní periferie patří monitory, tiskárny, projektory, reproduktory a sluchátka. Každé zařízení předává informace jiným způsobem."
  },
  {
    title: "Jaký je rozdíl mezi CRT a LCD monitorem?",
    category: "Monitory",
    answer: "CRT monitor vytváří obraz pomocí elektronového paprsku a obrazovky. LCD monitor používá tekuté krystaly, je výrazně plošší a obvykle spotřebovává méně energie."
  },
  {
    title: "Co znamená technologie LED u displejů?",
    category: "Monitory",
    answer: "LED označuje způsob podsvícení používaný u mnoha LCD displejů. LED diody nahrazují starší typ podsvícení a umožňují úspornější provoz."
  },
  {
    title: "Co vyjadřuje rozlišení obrazovky?",
    category: "Monitory",
    answer: "Rozlišení udává počet obrazových bodů neboli pixelů, ze kterých se skládá obraz. Například rozlišení 1920 × 1080 znamená 1920 pixelů na šířku a 1080 pixelů na výšku."
  },
  {
    title: "K čemu slouží projektor?",
    category: "Projektory",
    answer: "Projektor promítá obraz z počítače nebo jiného zařízení na větší plochu, například na plátno či zeď. Používá se ve školách, na prezentacích i v kinech."
  },
  {
    title: "Jak funguje jehličková tiskárna?",
    category: "Tiskárny",
    answer: "Jehličková tiskárna vytváří obraz pomocí drobných jehliček, které přes barvicí pásku narážejí na papír. Tisk je tvořen jednotlivými body a zařízení bývá hlučnější."
  },
  {
    title: "Jak funguje inkoustová tiskárna?",
    category: "Tiskárny",
    answer: "Inkoustová tiskárna nanáší na papír drobné kapky inkoustu. Hodí se pro běžný domácí tisk i barevné fotografie."
  },
  {
    title: "Jak funguje laserová tiskárna?",
    category: "Tiskárny",
    answer: "Laserová tiskárna používá toner v práškové podobě, který se přenese na papír a teplem se zafixuje. Je vhodná zejména pro rychlý tisk většího množství dokumentů."
  },
  {
    title: "Jaký je hlavní rozdíl mezi inkoustovým a laserovým tiskem?",
    category: "Tiskárny",
    answer: "Inkoustová tiskárna používá tekutý inkoust, zatímco laserová tiskárna využívá práškový toner. Inkoustový tisk se často hodí pro fotografie a barevné obrázky, laserový pro rychlý tisk dokumentů."
  },
  {
    title: "K čemu slouží reproduktory?",
    category: "Zvuk",
    answer: "Reproduktory převádějí elektrický zvukový signál na zvuk, který můžeme slyšet. Používají se pro hudbu, filmy, hry i zvuk počítačových upozornění."
  },
  {
    title: "Jaký je rozdíl mezi reproduktory a sluchátky?",
    category: "Zvuk",
    answer: "Reproduktory přehrávají zvuk do okolního prostoru, takže ho mohou slyšet lidé v místnosti. Sluchátka přenášejí zvuk přímo k uším jednoho posluchače."
  },
  {
    title: "Jak se vyvíjely počítačové monitory?",
    category: "Historie",
    answer: "Starší počítače používaly převážně objemné CRT monitory. Později se rozšířily tenčí LCD displeje a následně úsporné displeje s LED podsvícením. Dnes se používají také OLED a další moderní technologie."
  },
  {
    title: "Které tiskárny se používaly dříve a proč?",
    category: "Historie",
    answer: "Jehličkové tiskárny se používaly například pro formuláře a vícedílné kopie. Později se rozšířily inkoustové a laserové tiskárny, které nabídly kvalitnější nebo rychlejší tisk podle konkrétního použití."
  },
  {
    title: "Jaké výstupní periferie se používají dnes?",
    category: "Současnost",
    answer: "Dnes se běžně používají LCD a OLED monitory, inkoustové a laserové tiskárny, projektory, reproduktory a sluchátka. Některá zařízení, například chytré displeje, kombinují více funkcí."
  }
];

const scoreElement = document.getElementById("score");
const scoreFill = document.getElementById("score-fill");
const scoreCaption = document.getElementById("score-caption");
const questionList = document.getElementById("question-list");

const questionCategory = document.getElementById("question-category");
const questionNumber = document.getElementById("question-number");
const questionSymbol = document.getElementById("question-symbol");
const questionTitle = document.getElementById("question-title");
const questionDescription = document.getElementById("question-description");
const answerPanel = document.getElementById("answer-panel");
const answerText = document.getElementById("answer-text");

const revealButton = document.getElementById("reveal-button");
const correctButton = document.getElementById("correct-button");
const incorrectButton = document.getElementById("incorrect-button");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

const navCount = document.getElementById("nav-count");
const positionLabel = document.getElementById("position-label");
const questionStatus = document.getElementById("question-status");

const finishPanel = document.getElementById("finish-panel");
const finishTitle = document.getElementById("finish-title");
const finishText = document.getElementById("finish-text");
const finalScore = document.getElementById("final-score");
const finalPercent = document.getElementById("final-percent");
const restartButton = document.getElementById("restart-button");

let currentQuestion = 0;
let score = 0;
let answers = Array(questions.length).fill(null);
let revealed = Array(questions.length).fill(false);

function createQuestionNavigation() {
  questionList.innerHTML = "";

  questions.forEach((question, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "question-link";
    button.innerHTML = `
      <span class="question-link-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="question-link-title">${question.title}</span>
    `;

    button.addEventListener("click", () => {
      currentQuestion = index;
      renderQuestion();
    });

    questionList.appendChild(button);
  });
}

function renderQuestion() {
  const question = questions[currentQuestion];

  questionCategory.textContent = question.category;
  questionNumber.textContent =
    `OTÁZKA ${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;
  questionSymbol.textContent = String(currentQuestion + 1).padStart(2, "0");
  questionTitle.textContent = question.title;
  answerText.textContent = question.answer;

  answerPanel.hidden = !revealed[currentQuestion];
  revealButton.hidden = revealed[currentQuestion];

  previousButton.disabled = currentQuestion === 0;
  nextButton.textContent =
    currentQuestion === questions.length - 1 ? "Dokončit kvíz →" : "Další otázka →";

  positionLabel.textContent =
    `${String(currentQuestion + 1).padStart(2, "0")} z ${questions.length}`;

  const currentAnswer = answers[currentQuestion];

  if (currentAnswer === true) {
    questionStatus.textContent = "✓ Odpověď správná";
  } else if (currentAnswer === false) {
    questionStatus.textContent = "Otázka zodpovězena";
  } else if (revealed[currentQuestion]) {
    questionStatus.textContent = "Vyhodnoťte odpověď skupiny";
  } else {
    questionStatus.textContent = "Připraveno k diskuzi";
  }

  correctButton.disabled = currentAnswer !== null;
  incorrectButton.disabled = currentAnswer !== null;

  document.querySelectorAll(".question-link").forEach((button, index) => {
    button.classList.toggle("active", index === currentQuestion);
    button.classList.toggle("answered", answers[index] !== null);
    button.setAttribute("aria-current", index === currentQuestion ? "step" : "false");

    const number = button.querySelector(".question-link-number");
    number.textContent = answers[index] === true
      ? "✓"
      : String(index + 1).padStart(2, "0");
  });

  updateScore();
  finishPanel.hidden = true;
  document.getElementById("question-card").hidden = false;
  document.querySelector(".bottom-navigation").hidden = false;
}

function updateScore() {
  score = answers.filter(answer => answer === true).length;

  scoreElement.textContent = score;
  scoreFill.style.width = `${(score / questions.length) * 100}%`;

  const answeredCount = answers.filter(answer => answer !== null).length;
  navCount.textContent = `${answeredCount} / ${questions.length}`;

  scoreCaption.textContent = answeredCount === 0
    ? "Zatím žádná zodpovězená otázka."
    : `Zodpovězeno ${answeredCount} z ${questions.length} otázek.`;
}

function revealAnswer() {
  revealed[currentQuestion] = true;
  renderQuestion();
}

function gradeAnswer(isCorrect) {
  if (answers[currentQuestion] !== null) return;

  answers[currentQuestion] = isCorrect;
  renderQuestion();
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showFinish();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function showFinish() {
  const answeredCount = answers.filter(answer => answer !== null).length;
  const percentage = Math.round((score / questions.length) * 100);

  document.getElementById("question-card").hidden = true;
  document.querySelector(".bottom-navigation").hidden = true;
  finishPanel.hidden = false;

  finalScore.textContent = `${score} / ${questions.length}`;
  finalPercent.textContent = `${percentage} %`;

  if (answeredCount < questions.length) {
    finishTitle.textContent = "Kvíz zatím není dokončen.";
    finishText.textContent =
      `Zodpověděli jste ${answeredCount} z ${questions.length} otázek. Vraťte se a dokončete zbývající otázky.`;
    restartButton.textContent = "Pokračovat v kvízu →";
    restartButton.onclick = () => {
      const unanswered = answers.findIndex(answer => answer === null);
      currentQuestion = unanswered === -1 ? 0 : unanswered;
      renderQuestion();
    };
    return;
  }

  finishTitle.textContent = "Kvíz dokončen.";
  finishText.textContent = percentage >= 80
    ? "Skvělá práce! Máte výborný přehled o výstupních periferiích."
    : percentage >= 50
      ? "Dobrá práce. Projděte si ještě odpovědi, ve kterých jste si nebyli jistí."
      : "Teď už víte, co procvičit. Zkuste si kvíz zopakovat a zlepšit výsledek.";

  restartButton.textContent = "Zopakovat kvíz ↻";
  restartButton.onclick = restartQuiz;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answers = Array(questions.length).fill(null);
  revealed = Array(questions.length).fill(false);

  restartButton.onclick = restartQuiz;
  restartButton.textContent = "Zopakovat kvíz ↻";

  renderQuestion();
}

revealButton.addEventListener("click", revealAnswer);
correctButton.addEventListener("click", () => gradeAnswer(true));
incorrectButton.addEventListener("click", () => gradeAnswer(false));
previousButton.addEventListener("click", previousQuestion);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

createQuestionNavigation();
renderQuestion();
