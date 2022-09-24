var startButton = document.querySelector("start-button");
var startScreenEl = document.querySelector("#start-quiz");
var timerTag = document.querySelector(".time");
var submitAnswer = document.querySelector("#next");
var questionDiv = document.querySelector("question");

let questionCard = 0
let secondsLeft = 101 
let timerInterval;

let questions = []

function startButton (){

}

// calling question function 
function getQuestion () {
//get current question object from array
}

var currentQuestion = questions[currentQuestionIndex]

//update title with current question
var questionDiv = document.getElementbyId('question-title');
titleEL.textcontent = currentQuestion.title; 

//clear out any old question choices 
choicesEl.innterHTML = ''; 




/* function score() {
    if () {
        let score = secondsLeft
        alert ("Your score is" + score + "!")
} */

$startButton.addEventListener("click", startQuiz); 
function startQuiz() {
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute("class", "hide");
}

//start timer
timerID = setInterval(tickClock, 1000);


timerEl.textContent=time

function getQuestion(){}
var currentQuestion = questions [currentQuestionIndex];



/* function tickClock() {
        function setTime() {
            timerInterval = setInterval(function () {
                secondsLeft--;
                $time.textContent = "Time: " + secondsLeft + " seconds";
                if (secondsLeft === 0) {
                    clearInterval(timerInterval);
                    return;
                }
            }, 1000)}
 */