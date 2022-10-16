//store time 
//display time 
//take 10 seconds off when it's wrong 

//quizQuestions is a const that is an array of objects including each question of the quiz

const quizQuestions = [
    {   
      description: 'Which of the following keywords is used to define a variable in JavaScript?',
      answers: {
        'a': 'var',
        'b': 'class',
        'c': 'div',
        'd': 'id',
      },
      correctAnswer: 'a'
    },
    {
      description: 'Which of the following is corect about JS?',
      answers: {
        a: 'JavaScript is a scripting language used to make the website interactive',
        b: 'JavaScript is an assembly language used to make the website interactive',
        c: 'JavaScript is a compiled language used to make the website interactive',
        d: 'None of the mentioned',
      },
      correctAnswer: 'a'
    },
    {
      description: 'Arrays in JavaScript are defined by which of the following statements?',
      answers: {
        a: 'It is an ordered list of strings',
        b: 'It is an ordered list of values',
        c: 'It is an ordered list of objects',
        d: 'It is an ordered list of functions',
      },
      correctAnswer: 'b'
    },
    {
        description: 'Which of the following is not a JavaScript data type?',
        answers: {
            a: 'Null type',
            b: 'Undefined type',
            c: 'Number type', 
            d: 'All of the above',
        },
            correctAnswer: 'd' 
        },
    {description: 'Which of the following can be used to call a JavaScript Code Snippet?',
        answers: {
            a: 'RMI',
            b: 'Preprocessor',
            c: 'Triggering Event',
            d: 'Function/Method',
        },
        correctAnswer: 'c'
    },
];

//When a function accesses the questionIndex, it will start at the first question in the array. 
let questionIndex = 0; 
//The timer seconds will be equal to 75 upon start
let timerSeconds = 75; 


let highscores = [
    {user: 'someone', score: 75},
    {user: 'else', score: 100}
];

let correctAnswers = 0;
let incorrectAnswers = 0;
let quizEnded = false;


const showNode = (id, show = false) => {
    const element = document.getElementById(id);

    if (!element) return;

    if (element.classList.contains('hide')) {
        element.classList.remove('hide');
    }

    if (element.classList.contains('show')) {
        element.classList.remove('show');
    }
    if (show) {
        element.classList.add('show');
    }
    else {
        element.classList.add('hide');
    }
};

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

        timerSeconds -= 1;
        setTimeout(updateTimer, 1000);
//This will allow the timer to end the quiz at 0 seconds. 
        if (timerSeconds <= 1) {
            timerSeconds = 0;
            endQuiz();
            }
        }

const setFeedback = (text = '')=> { // feedback text will orginially be a blank string
    const feedback = document.getElementById('feedback')
    if (feedback) {
        feedback.innerText = text;
    }
}

const correctAnswer = () => {
        correctAnswers++;
        timerSeconds += 10;
        setFeedback('You have selectd the correct answer');
        renderNextQuestion();
};

const wrongAnswer = () => {
        incorrectAnswers++;
        timerSeconds -= 10;
        setFeedback('You have selected the wrong answer');
        renderNextQuestion();
};

const createButtonNode = (text, correct = false) => {
    let btn = document.createElement('button');
    btn.classList.add('quiz-btn');

    btn.innerText = text;

    if (correct) {
        btn.addEventListener('click', correctAnswer);
    }
    else {
        btn.addEventListener('click', wrongAnswer);
    }

    return btn;
}

const renderAnswersList = (answers, correct) => {
    const answersList = document.getElementById('answers-list');
    if (!answersList) return;

    answersList.replaceChildren([]);

    for (let [key , value] of Object.entries(answers)) {
        let li = document.createElement('li');
        li.appendChild(
            createButtonNode (value, key === correct)
        );
        answersList.appendChild ( li ); 
    }
}

const renderQuestion = (quizQuestion) => {
    const questionNum = document.getElementById('question-number');
    if (questionNum) {
        questionNum.innerText = questionIndex +1; 
    }

    const question = document.getElementById('question')
    if (question) {
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

function renderHighscores() {
    const highscoresList = document.getElementById('highscores-list');
    if (highscoresList) {
        highscoresList.replaceChildren([]);

        //Sort by highest score
        highscores.sort((a, b) => a.score < b.score);

        highscores.forEach((hs, index) => {
            //Only show top 10 highscores 
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
        input.value ='';
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
    }

    const incorrect = document.getElementById('incorrect-answers');
    if (incorrect) {
        incorrect.innerText = `Incorrect Answers: ${incorrectAnswers}`; 
    }

    const timeRemaining = document.getElementById('time-remaining');
    if (timeRemaining) {
        timeRemaining.innerText = `Time Remaining: ${timerSeconds}`;
    }

    const highscore = document.getElementbyId('highscore');
    if (highscore) {
        highscore.innerText = correctAnswers * timerSeconds;
    }
}

function resetQuiz() {
    showNode('welcome', true);
    showNode('quiz', false); 
    showNode('highscores', false);

    setFeedback('');

    questionIndex = 0;
    timerSeconds = 75;
    correctAnswers = 0;
    incorrectAnswers = 0; 
}

function startQuiz() {
    resetQuiz();

    showNode('welcome', false);

    updateTimer();
    renderQuestion(quizQuestions[questionIndex]);

    showNode('quiz', true);
}



