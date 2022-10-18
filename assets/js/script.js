//Global Variables
//Array with quiz questions that the quiz can access
const quizQuestions = [
    {   
      description: 'Which of the following keywords is used to define a variable in JavaScript?',
      answers: {
        'a': 'let',
        'b': 'class',
        'c': 'div',
        'd': 'id',
      },
      correctAnswer: 'a'
    },
    {
      description: 'Which of the following is correct about JS?',
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
//The highscore list will populated upon the showHighscores
let highscores = [
    {user: 'Amber', score: 100},
    {user: 'Jethro', score: 75}
];
//The number of correct answers & incorrect answers 
let correctAnswers = 0;
let incorrectAnswers = 0;
let quizEnded = false;

//showNode accesses element id & class to determine when it will be displayed 
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

//When the quiz ends, the showHighscores function will run
const endQuiz = () => {
    quizEnded = true; 
    showHighscores();
}

//This callback function allows the timer to be updated 
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

//Allows the feedback to be displayed in the feedback element based on the answer the user selects
const setFeedback = (text = '')=> { 
    const feedback = document.getElementById('feedback')
    if (feedback) {
        feedback.innerText = text;
    }
}

//Correct Answer renders next question
const correctAnswer = () => {
        correctAnswers++;
        setFeedback('You have selected the correct answer. Great work!');
        renderNextQuestion();
};

//Wrong answer takes 10 seconds off users score 
const wrongAnswer = () => {
        incorrectAnswers++;
        timerSeconds -= 10;
        setFeedback('You have selected the wrong answer. The timer has subtracted 10 seconds.');
        renderNextQuestion();
};

//Returns the correct or wrong answre function when the user selects an answer
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

//Shows the answer list in a list item
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

//Shows the questions and quetion number by accessing te quizQuestion array
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

//Displays the next question and goes through the array until the end. Then it runs the endQuiz function. 
const renderNextQuestion = () => {
    questionIndex++;

    if (questionIndex < quizQuestions.length) {
        renderQuestion(quizQuestions[questionIndex]);
    }
    else {
        endQuiz();
    }
}

//Highscores will display. A new entry will append the list with the users input and score
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

//The user will enter their highscore and it will push it to the list
function submitHighscores() {
    const input = document.getElementById('highscores-input');
    if (input) {
        const score = correctAnswers * timerSeconds;
        const user = input.value; 
        highscores.push({user, score});
    }
    renderHighscores();
}

//Runs showNode and then provides number of correct and incorrect answers shown
function showHighscores() {
    showNode('quiz', false);
    showNode('highscores', true);
    showNode('highscores-input', true);

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

    //const highscore = document.getElementById('highscore');
    //if (highscore) {
    //    highscore.innerText = correctAnswers * timerSeconds;
    //}
}

//Resets quiz in the beginning
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

//Access reset quiz to refresh, tells welcome page to hide, begins timer. 
function startQuiz() {
    resetQuiz();

    showNode('welcome', false);

    updateTimer();
    renderQuestion(quizQuestions[questionIndex]);

    showNode('quiz', true);
}



