
const questions = [
    {
        question: "Co jsou výstupní periferie a k čemu slouží?",
        answer: "Jsou to zařízení, která předávají informace z počítače uživateli. Patří mezi ně například monitor, tiskárna a reproduktory."
    },
    {
        question: "Jak se v průběhu času změnily počítačové monitory?",
        answer: "Starší monitory používaly technologii CRT a byly velké a těžké. Později se rozšířily plošší LCD monitory a další moderní technologie."
    },
    {
        question: "Jaký je rozdíl mezi CRT a LCD monitorem?",
        answer: "CRT monitor využívá obrazovku s elektronovým paprskem a je objemný. LCD monitor vytváří obraz pomocí tekutých krystalů a je mnohem plošší."
    },
    {
        question: "Jak funguje jehličková tiskárna?",
        answer: "Tiskne pomocí malých jehliček, které přes barvicí pásku vytvářejí na papíře jednotlivé body."
    },
    {
        question: "Kdo a kdy přišel s principem jehličkového tisku?",
        answer: "Jedním z průkopníků jehličkového tisku byla společnost Epson, která v roce 1968 představila tiskárnu EP-101. Později se rozšířily jehličkové tiskárny pro počítače."
    },
    {
        question: "Jak funguje inkoustová tiskárna?",
        answer: "Vystřikuje drobné kapky inkoustu na papír a skládá z nich text nebo obrázek."
    },
    {
        question: "Jak funguje laserová tiskárna?",
        answer: "Pomocí laseru vytvoří obraz na světlocitlivém válci. Toner se přenese na papír a následně se teplem upevní."
    },
    {
        question: "Jaký je hlavní rozdíl mezi inkoustovou a laserovou tiskárnou?",
        answer: "Inkoustová tiskárna používá tekutý inkoust, zatímco laserová tiskárna používá práškový toner."
    },
    {
        question: "K čemu slouží reproduktory a jaký signál převádějí?",
        answer: "Reproduktory slouží k přehrávání zvuku. Elektrický zvukový signál převádějí na zvuk, který slyšíme."
    },
    {
        question: "Jak se vyvíjela výstupní zvuková zařízení a jaká používáme dnes?",
        answer: "Zvuk se nejprve přehrával pomocí jednodušších reproduktorů. Postupně se rozšířily kvalitnější reproduktory, sluchátka a další zvuková zařízení."
    }
];

const cards = document.querySelectorAll(".card");
const cardsBox = document.getElementById("cards");
const questionBox = document.getElementById("questionBox");
const finishBox = document.getElementById("finishBox");

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("question");
const answerText = document.getElementById("answer");

const answerBox = document.getElementById("answerBox");
const showAnswerButton = document.getElementById("showAnswer");
const correctButton = document.getElementById("correct");
const wrongButton = document.getElementById("wrong");
const backButton = document.getElementById("back");
const restartButton = document.getElementById("restart");

const scoreText = document.getElementById("score");
const remainingText = document.getElementById("remaining");
const finalScoreText = document.getElementById("finalScore");

let score = 0;
let currentId = null;
let answered = new Set();

function updateInfo() {
    scoreText.textContent = score;
    remainingText.textContent = questions.length - answered.size;
}

function openCard(id) {
    if (answered.has(id)) return;

    currentId = id;

    questionNumber.textContent = `OTÁZKA ${id + 1} / ${questions.length}`;
    questionText.textContent = questions[id].question;
    answerText.textContent = questions[id].answer;

    answerBox.classList.add("hidden");
    showAnswerButton.classList.remove("hidden");

    cardsBox.classList.add("hidden");
    finishBox.classList.add("hidden");
    questionBox.classList.remove("hidden");
}

function showAnswer() {
    answerBox.classList.remove("hidden");
    showAnswerButton.classList.add("hidden");
}

function markAnswer(isCorrect) {
    if (currentId === null || answered.has(currentId)) return;

    if (isCorrect) {
        score++;
    }

    answered.add(currentId);
    cards[currentId].classList.add("used");
    cards[currentId].disabled = true;

    updateInfo();

    questionBox.classList.add("hidden");

    if (answered.size === questions.length) {
        finalScoreText.textContent = score;
        finishBox.classList.remove("hidden");
    } else {
        cardsBox.classList.remove("hidden");
    }

    currentId = null;
}

function goBack() {
    questionBox.classList.add("hidden");
    cardsBox.classList.remove("hidden");
    currentId = null;
}

function restartQuiz() {
    score = 0;
    currentId = null;
    answered.clear();

    cards.forEach(card => {
        card.classList.remove("used");
        card.disabled = false;
    });

    finishBox.classList.add("hidden");
    questionBox.classList.add("hidden");
    cardsBox.classList.remove("hidden");

    updateInfo();
}

cards.forEach(card => {
    card.addEventListener("click", () => {
        openCard(Number(card.dataset.id));
    });
});

showAnswerButton.addEventListener("click", showAnswer);
correctButton.addEventListener("click", () => markAnswer(true));
wrongButton.addEventListener("click", () => markAnswer(false));
backButton.addEventListener("click", goBack);
restartButton.addEventListener("click", restartQuiz);

updateInfo();
