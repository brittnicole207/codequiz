let questionIndex = 0;
let timerSeconds = 75;
let highscores = [];
let highscores = [
    {user: 'tester', score: 75},
    {user: 'yours', score: 100}
];
let correctAnswers = 0;
let incorrectAnswers = 0;
let quizEnded = false;
const showNode = (id, show = false) => {
    };

const renderNextQuestion = () => {
    questionIndex++;
    if (questionIndex < quizQuestions.length) {
        renderQuestion();
const endQuiz = () => {
    quizEnded = true;
    showHighscores();
}

const updateTimer = () => {
    if (quizEnded) return;

    const timer = document.getElementById('seconds-remaining');
    if (timer) {
        timer.innerText = timerSeconds;
    }
    else {
        quizEnded = true;
        showHighscores();

    timerSeconds -= 1;
    setTimeout(updateTimer, 1000);

    if (timerSeconds <= 1) {
        timerSeconds = 0;
        endQuiz();
    }
}

const setFeedback = (text ='') => {
    const feedback = document.getElementById('feedback')
    if (feedback) {
        feedback.innerText = text;
    }
}

const correctAnswer = () => {
    console.log('correct');
    correctAnswers++;
    setFeedback('');
    renderNextQuestion();
};

const wrongAnswer = () => {
    console.log('fail');
    incorrectAnswers++;
    setFeedback('you suck at this');
    setFeedback('You suck at this, just sayin\'');
    renderNextQuestion();
};

const setFeedback = (text = '') => {
    const feedback = document.getElementById('feedback')
    if (feedback) {
        feedback.innerText = text;
    }
}

const createButtonNode = (text, correct = false) => {
    let btn = document.createElement('button');
    btn.classList.add('quiz-btn');
const createButtonNode = (text, correct = false) => {
    return btn;
}

const createLiNode = (text, correct = false) => {
    let li = document.createElement('li');
    li.appendChild(createButtonNode(text, correct));
    return li;
};

const renderAnswersList = (answers, correct) => {
    const answersList = document.getElementById('answers-list');
    if (!answersList) return;

    answersList.replaceChildren([]);

    for (let [key, value] of Object.entries(answers)) {
        answersList.appendChild(createLiNode(value, key === correct));
        let li = document.createElement('li');
        li.appendChild(
            createButtonNode(value, key === correct)
        );
        answersList.appendChild( li );
    }
}

const renderQuestion = () => {
    if (questionIndex === quizQuestions.length) return;
    const quizQuestion = quizQuestions[questionIndex];

const renderQuestion = (quizQuestion) => {
    const questionNum = document.getElementById('question-number');
    if (questionNum) {
        questionNum.innerText = questionIndex + 1;
    }

    const question = document.getElementById('question')
    if (question) {
    question.innerText = quizQuestion.description;
        question.innerText = quizQuestion.description;
    }

    renderAnswersList(quizQuestion.answers, quizQuestion.correctAnswer);
};

const renderNextQuestion = () => {
    questionIndex++;

    if (questionIndex < quizQuestions.length) {
        renderQuestion(quizQuestions[questionIndex]);
    }
    else {
        endQuiz();
    }
}

function startQuiz() {
    resetQuiz();

    showNode('welcome', false);

    updateTimer();
    renderQuestion(quizQuestions[questionIndex]);

    showNode('quiz', true);
}

function renderHighscores() {
    const highscoresList = document.getElementById('highscores-list');
    if (highscoresList) {
        highscoresList.replaceChildren([]);

        // Sort by highest score
        highscores.sort((a, b) => a.score < b.score);

        highscores.forEach((hs, index) => {
            // Only show top 10 highscores
            if (index < 10) {
                let li = document.createElement('li');
                li.innerText = `${hs.user}: ${hs.score}`;

                highscoresList.appendChild( li );
            }
        });
    }
}

function submitHighscores() {
    const input = document.getElementById('highscores-input');
    if (input) {
        const score = correctAnswers * timerSeconds;
        const user = input.value;
        highscores.push({user, score});
        input.value = '';
    }
    renderHighscores();
}

function showHighscores() {
    showNode('quiz', false);
    showNode('highscores', true);

    renderHighscores();

    const correct = document.getElementById('correct-answers');
    if (correct) {
        correct.innerText = `Correct Answers: ${correctAnswers}`;
        
function resetQuiz() {
    questionIndex = 0;
    timerSeconds = 75;
    highscores = [];
    correctAnswers = 0;
    incorrectAnswers = 0;
}