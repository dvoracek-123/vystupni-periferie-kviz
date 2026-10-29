
const questions = [
    {
        question: "Co jsou výstupní periferie a k čemu slouží?",
        answer: "Jsou to zařízení, která předávají informace z počítače uživateli. Patří mezi ně například monitor, tiskárna a reproduktory."
    },
    {
        question: "Jak se v průběhu času změnily počítačové monitory?",
        answer: "Starší monitory používaly technologii CRT, byly velké a těžké. Později se rozšířily plošší LCD monitory a další moderní technologie."
    },
    {
        question: "Jaký je rozdíl mezi CRT a LCD monitorem?",
        answer: "CRT monitor využívá elektronový paprsek a má velkou obrazovku. LCD monitor využívá tekuté krystaly a má mnohem plošnější konstrukci."
    },
    {
        question: "Jak funguje jehličková tiskárna?",
        answer: "Jehličky narážejí přes barvicí pásku na papír a vytvářejí obraz z jednotlivých bodů."
    },
    {
        question: "Kdy a čím přispěla společnost Epson k vývoji tiskáren?",
        answer: "Společnost Epson představila v roce 1968 tiskárnu EP-101. Patřila mezi důležité milníky vývoje menších tiskáren."
    },
    {
        question: "Jak funguje inkoustová tiskárna?",
        answer: "Vystřikuje na papír drobné kapky inkoustu, ze kterých vzniká text nebo obrázek."
    },
    {
        question: "Jak funguje laserová tiskárna?",
        answer: "Laser vytvoří obraz na světlocitlivém válci. Toner se přenese na papír a následně se upevní pomocí tepla."
    },
    {
        question: "Jaký je hlavní rozdíl mezi inkoustovou a laserovou tiskárnou?",
        answer: "Inkoustová tiskárna používá tekutý inkoust, zatímco laserová tiskárna používá práškový toner."
    },
    {
        question: "K čemu slouží reproduktory a jak fungují?",
        answer: "Reproduktory převádějí elektrický zvukový signál na zvuk, který můžeme slyšet."
    },
    {
        question: "Jaká výstupní zařízení používáme k přehrávání zvuku a obrazu dnes?",
        answer: "K zobrazení obrazu používáme například monitory a projektory. Ke zvukovému výstupu slouží reproduktory a sluchátka."
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

    questionNumber.textContent =
        `OTÁZKA ${id + 1} / ${questions.length}`;

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

correctButton.addEventListener("click", () => {
    markAnswer(true);
});

wrongButton.addEventListener("click", () => {
    markAnswer(false);
});

backButton.addEventListener("click", goBack);
restartButton.addEventListener("click", restartQuiz);

updateInfo();
