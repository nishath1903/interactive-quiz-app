
// 1. Question Data
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "Which language is used to style web pages?",
        options: [
            "JavaScript",
            "Python",
            "CSS",
            "Java"
        ],
        correctAnswer: 2
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "static"
        ],
        correctAnswer: 2
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        correctAnswer: 1
    },
    {
        question: "Which method selects an HTML element by its ID?",
        options: [
            "getElementById()",
            "getElementsByClass()",
            "queryAll()",
            "selectId()"
        ],
        correctAnswer: 0
    }
];


// 2. Quiz State
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;


// 3. DOM Elements
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const questionCounter = document.getElementById("question-counter");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");


// 4. Screen Management
function showScreen(screen) {
    welcomeScreen.classList.remove("active");
    quizScreen.classList.remove("active");
    resultScreen.classList.remove("active");

    screen.classList.add("active");
}


// 5. Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;

    showScreen(quizScreen);
    displayQuestion();
}


// 6. Display Question
function displayQuestion() {
    selectedAnswer = null;
    nextBtn.disabled = true;

    const currentQuestion = questions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;

    questionCounter.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", function () {
            selectAnswer(index, button);
        });

        optionsContainer.appendChild(button);
    });
}


// 7. Select and Validate Answer
function selectAnswer(index, selectedButton) {

    if (selectedAnswer !== null) {
        return;
    }

    selectedAnswer = index;

    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll(".option-btn");

    optionButtons.forEach(button => {
        button.disabled = true;
    });

    if (selectedAnswer === currentQuestion.correctAnswer) {

        score++;
        selectedButton.classList.add("correct");

    } else {

        selectedButton.classList.add("wrong");

        optionButtons[currentQuestion.correctAnswer]
            .classList.add("correct");
    }

    scoreDisplay.textContent = `Score: ${score}`;

    nextBtn.disabled = false;
}


// 8. Next Question
function nextQuestion() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        displayQuestion();

    } else {

        showResult();
    }
}


// 9. Display Result
function showResult() {

    showScreen(resultScreen);

    finalScore.textContent =
        `Your Score: ${score} / ${questions.length}`;

    const percentage = (score / questions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Excellent! Perfect score!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Great job! Keep learning!";
    } else {
        resultMessage.textContent = "Good effort! Practice makes perfect!";
    }
}


// 10. Restart Quiz
function restartQuiz() {
    startQuiz();
}


// 11. Event Listeners
startBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", nextQuestion);

restartBtn.addEventListener("click", restartQuiz);
