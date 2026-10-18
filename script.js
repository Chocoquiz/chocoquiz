
const questions = [
    {
        difficulty: "Easy",
        question: "WHO LOVES CHOCO?",
        options: ["ME", "YOU", "EVERYONE", "NO ONE"],
        answer: "EVERYONE",
        explanation: "Everyone loves Choco! 🍫"
    },
    {
        difficulty: "Easy",
        question: "WHAT IS THE BEST THING IN THE WORLD?",
        options: ["MONEY", "SLEEP", "CHOCO", "HOMEWORK"],
        answer: "CHOCO",
        explanation: "Choco is the best thing in the world!"
    },
    {
        difficulty: "Easy",
        question: "WHAT HAPPENS IF YOU DON'T EAT CHOCO?",
        options: ["NOTHING", "YOU BECOME SAD", "YOU BECOME A ROBOT", "THE WORLD ENDS"],
        answer: "THE WORLD ENDS",
        explanation: "The world ends! Always keep Choco nearby! 🍫"
    },
    {
        difficulty: "Medium",
        question: "WHAT IS CHOCO'S BIGGEST ENEMY?",
        options: ["VANILLA", "HEADBOY", "125", "ALL OF THEM"],
        answer: "ALL OF THEM",
        explanation: "Vanilla, Headboy, and 125 are all enemies of Choco!"
    },
    {
        difficulty: "Medium",
        question: "WHAT IS THE MEANING OF LIFE?",
        options: ["STUDYING", "WORKING", "EATING CHOCO", "PAYING BILLS"],
        answer: "EATING CHOCO",
        explanation: "The true meaning of life is eating Choco!"
    },
    {
        difficulty: "Medium",
        question: "WHAT SHOULD BE THE OFFICIAL CURRENCY OF THE WORLD?",
        options: ["DOLLARS", "RUPEES", "CHOCO COINS", "GOLD"],
        answer: "CHOCO COINS",
        explanation: "Choco Coins should rule the world's economy!"
    },
    {
        difficulty: "Medium",
        question: "WHAT IS THE WORST SENTENCE IN HUMAN HISTORY?",
        options: ["YOUR EXAM IS TOMORROW", "NO INTERNET", "CHOCO IS FINISHED", "ALL OF THE ABOVE"],
        answer: "CHOCO IS FINISHED",
        explanation: "Nothing is worse than hearing that Choco is finished!"
    },
    {
        difficulty: "Medium",
        question: "WHAT IS THE ULTIMATE GOAL OF EVERY CHOCO LOVER?",
        options: ["BECOME A MILLIONAIRE", "BECOME HEADBOY", "OWN A CHOCO FACTORY", "BECOME A TEACHER"],
        answer: "OWN A CHOCO FACTORY",
        explanation: "Every true Choco lover dreams of owning a Choco Factory!"
    },
    {
        difficulty: "Hard",
        question: "WHAT SHOULD YOU DO WHEN YOU SEE CHOCO?",
        options: ["RUN", "CRY", "EAT IT", "PRETEND YOU DIDN'T SEE IT"],
        answer: "EAT IT",
        explanation: "Never ignore Choco. Eat it and enjoy!"
    },
    {
        difficulty: "Hard",
        question: "WHAT IS THE MOST IMPORTANT SUBJECT IN SCHOOL?",
        options: ["MATHEMATICS", "PHYSICS", "CHEMISTRY", "CHOCOLOGY"],
        answer: "CHOCOLOGY",
        explanation: "Chocology is clearly the most important subject in school!"
    }
];

// Get elements from the HTML
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");
const questionProgress = document.getElementById("question-progress");
const scoreDisplay = document.getElementById("score-display");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");

// Game variables
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Start the quiz
startButton.addEventListener("click", function () {
    welcomeScreen.hidden = true;
    resultScreen.hidden = true;
    quizScreen.hidden = false;

    currentQuestionIndex = 0;
    score = 0;

    showQuestion();
});

// Display a question
function showQuestion() {
    answered = false;

    const currentQuestion = questions[currentQuestionIndex];

    questionProgress.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length} · ${currentQuestion.difficulty}`;

    scoreDisplay.textContent = `Score: ${score}`;
    questionText.textContent = currentQuestion.question;

    answerButtons.innerHTML = "";
    feedback.textContent = "";
    nextButton.hidden = true;

    currentQuestion.options.forEach(function (option) {
        const button = document.createElement("button");

        button.textContent = option;

        button.addEventListener("click", function () {
            checkAnswer(option, button);
        });

        answerButtons.appendChild(button);
    });
}

// Check the selected answer
function checkAnswer(selectedAnswer, selectedButton) {
    if (answered) return;

    answered = true;

    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.answer;

    const buttons = answerButtons.querySelectorAll("button");

    buttons.forEach(function (button) {
        button.disabled = true;

        if (button.textContent === currentQuestion.answer) {
            button.classList.add("correct");
        }
    });

    if (correct) {
        score += 10;
        feedback.textContent = "✅ Correct! +10 points. " + currentQuestion.explanation;
    } else {
        selectedButton.classList.add("incorrect");
        feedback.textContent = "❌ Not quite! The correct answer is " +
            currentQuestion.answer + ". " + currentQuestion.explanation;
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextButton.textContent =
        currentQuestionIndex === questions.length - 1
            ? "See Results 🏆"
            : "Next Question →";

    nextButton.hidden = false;
}

// Move to the next question
nextButton.addEventListener("click", function () {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

// Show the final score
function showResults() {
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    finalScore.textContent = `${score} / 100`;

    if (score === 100) {
        resultMessage.textContent = "Perfect score! You are the Choco Champion! 👑";
    } else if (score >= 70) {
        resultMessage.textContent = "Excellent work! You know your Choco facts! 🍫";
    } else if (score >= 40) {
        resultMessage.textContent = "Good effort! Keep learning and try again!";
    } else {
        resultMessage.textContent = "Keep practising! You can beat your score next time!";
    }
}

// Restart the quiz
restartButton.addEventListener("click", function () {
    resultScreen.hidden = true;
    welcomeScreen.hidden = false;
});
