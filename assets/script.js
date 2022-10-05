//store time 
//display time 
//take 10 seconds off when it's wrong 

let questionIndex = 0; // the index questions start at 0 
let timerSeconds = 75; // the timer seconds start at 75 

const myQuestions = [ // myQuestions is a const that is an array of objects including each question of the quiz
    {
      question: "Which of the following keywords is used to define a variable in JavaScript?",
      answers: {
        'a': "var",
        'b': "class",
        'c': "div",
        'd': "id"
      },
      correctAnswer: "a"
    },
    {
      question: "Which of the following is corect about JS?",
      answers: {
        a: "JavaScript is a scripting language used to make the website interactive",
        b: "JavaScript is an assembly language used to make the website interactive",
        c: "JavaScript is a compiled language used to make the website interactive",
        d: "None of the mentioned"
      },
      correctAnswer: "a"
    },
    {
      question: "Arrays in JavaScript are defined by which of the following statements?",
      answers: {
        a: "It is an ordered list of strings",
        b: "It is an ordered list of values",
        c: "It is an ordered list of objects",
        d: "It is an ordered list of functions"
      },
      correctAnswer: "b"
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        answers: {
            a: "Null type",
            b: "Undefined type", 
            c: "Number type", 
            d: "All of the above"
        },
            correctAnswer: "d" 
        },
        {question: "Which of the following can be used to call a JavaScript Code Snippet?",
        answers: {
            a: "RMI",
            b: "Preprocessor",
            c: "Triggering Event",
            d: "Function/Method"
        },
        correctAnswer: "c"
    },

function updateTimer() { //when updateTimer is called, the timer variable will access the "timer" div in the HTML
    let timer = document.getElementById('timer');
    timer.innerText = timerSeconds; //the text within the timer div will be equal to the timer seconds 

    setTimeout(() => { //setTimeout sets a timer (a countdown set in milliseconds) for the execution of a callback function, calling the function upon completion of the timer
        timerSeconds -= 1;
        updateTimer();
    }, 1000);
},

function startGame(){ //when this function is called it will access the element with the id start (the startbutton)
    console.log('Started')
    
    const startButton = document.getElementById('start')
    startButton.classList.add('hide'); //when the start button is clicked, it will will hide the button 

    updateQuestion(
        myQuestions[questionIndex] //the question will be accessed from the question index 
    );

    timerSeconds = 75;

    updateTimer(timerSeconds);
},

function setFeedback(text = '') {
    let feedback = document.getElementById('feedback');
    feedback.innerText = text;
},

function correctAnswer() {
    console.log("correct was selected")
    setFeedback();
    // let questions = document.getElementById('questions');
    
    // questions.appendChild(generateQuestion(myQuestions[questionIndex]));    
    questionIndex++;

    updateQuestion(
        myQuestions[questionIndex]
    );
},

function wrongAnswer() {
    console.log("wrong was selected")
    setFeedback('You have answered this question incorrectly.');
    
    timerSeconds -= 10; //this will take 10 seconds off of the clock 
    questionIndex++; // this will reveal the next question in the question index 

    updateQuestion(
        myQuestions[questionIndex] 
    );
},

function generateDescription(question) {
    let description = document.createElement('div');
    description.innerText = question; //this will create a div that will add the question

    return description;
},

function generateButtonNode(text, buttonAnswer, answer) {
    let answerButton = document.createElement('button');
    answerButton.innerText = text;

    // Determine which answer is correct and associate the correct behavior as an event on click
    if(buttonAnswer === answer) {
        answerButton.addEventListener('click', correctAnswer)
    } else {
        answerButton.addEventListener('click', wrongAnswer)
    }

    return answerButton;
},

function generateAnswerListNode(quizQuestion) {
    let answerList = document.createElement('ol');

    // Generate an ordered list of answer buttons for the user to click
    for (const [key, value] of Object.entries(quizQuestion.answers)) {
        let liChild = document.createElement('li');

        // We want to make the current list item into a button for the user to select
        liChild.appendChild(
            generateButtonNode(
                value,
                key,
                quizQuestion.correctAnswer
            )
        );

        answerList.appendChild(liChild);
    };

    return answerList;
},

function generateQuestion(quizQuestion) {
    let newChild = document.createElement("div");
    newChild.classList.add('question');

    newChild.appendChild(
        generateDescription(quizQuestion.question)
    );

    newChild.appendChild(
        generateAnswerListNode(quizQuestion)
    );

    return newChild;
},

function updateQuestion(question) {
    let questions = document.getElementById('questions');

    // Reset the question child to the next question
    questions.replaceChildren(
        generateQuestion(question)
    ),
    ]