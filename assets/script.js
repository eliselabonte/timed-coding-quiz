const $promptDisplay = $("#prompt");
    $promptDisplay.hide();

    // TODO: use jQuery to create these elements on command
const questionDisplay = document.querySelector("p.question");
const answerDisplay = document.querySelectorAll("li");

const $startButton = $(".startButton");

const $userDataStuff = $("#saveUserData");
    $userDataStuff.hide();
const userInitialsInput = document.querySelector("#saveInitials");
const $finalScoreDisplay = $("#finalScoreDisplay");
const $retakeNoSaveButton = $("#noSaveData");
const saveDataButton = document.getElementById("saveData");

const $clockDisplay = $("#counter");
let secondsLeft = 119;
let shouldBeCounting = false;
const $scoreDisplay = $("score");



let numberAnsweredCorrectly = 0;

// begin prompts
let correctAnswer;

const question1 = "What language is primarily used to style html?";
const answers1 = ["Javascript", "jQuery", "CSS", "Python"];
const correctAnswer1 = "CSS";

const question2 = "Which CSS position setting causes the item to keep its place on the screen regardless of scroll?";
const answers2 = ["fixed", "relative", "static", "absolute"];
const correctAnswer2 = "absolute";

const question3 = "What syntax is used to declare a variable in JavaScript?";
const answers3 = ["var, const, let", "function, var", "attr", "for, if, else"];
const correctAnswer3 = "var, const, let";

const question4 = "Which HTML attribute assignment has the highest specificity?";
const answers4 = ["class", "important", "id", "main"];
const correctAnswer4 = "important";

const question5 = "Which of the following is used in Javascript to execute a function at a given interval?";
const answers5 = ["setInterval", "timer", "interval", "clock"];
const correctAnswer5 = "setInterval";

const question6 = "What is the airspeed velocity of an unlaiden swallow?";
const answers6 = ["I don't know", "coconuts", "14m/s", "African or European?"];
const correctAnswer6 = "African or European?";

const question7 = "What CSS attribute can be set to increase or decrease the space around an element?";
const answers7 = ["margin", "border", "padding", "font-family"];
const correctAnswer7 = "margin";

const question8 = "Which keyboard command works as an \"undo\" button?";
const answers8 = ["cmd F", "alt X", "cmd X", "cmd/alt Z"];
const correctAnswer8 = "cmd/alt Z";

const question9 = "Which HTML button type reloads the page on click by default?";
const answers9 = ["button", "reload", "form", "submit"];
const correctAnswer9 = "submit";

const question10 = "What command must be added to a function to prevent event bubbling in JavaScript?";
const answers10 = [".stopBubbling()", ".preventBubbling()", ".stopPropogation()", ".preventPropogation()"];
const correctAnswer10 = ".stopPropogation()";

// group prompts

const prompt1 = [question1, answers1, correctAnswer1];
const prompt2 = [question2, answers2, correctAnswer2];
const prompt3 = [question3, answers3, correctAnswer3];
const prompt4 = [question4, answers4, correctAnswer4];
const prompt5 = [question5, answers5, correctAnswer5];
const prompt6 = [question6, answers6, correctAnswer6];
const prompt7 = [question7, answers7, correctAnswer7];
const prompt8 = [question8, answers8, correctAnswer8];
const prompt9 = [question9, answers9, correctAnswer9];
const prompt10 = [question10, answers10, correctAnswer10];

const promptString = [prompt1, prompt2, prompt3, prompt4, prompt5, prompt6, prompt7, prompt8, prompt9, prompt10];


// begin at the first question
let currentPromptIndex = 0;

// when user clicks start button, quiz starts
$startButton.on('click', takeQuiz);
$retakeNoSaveButton.on('click', takeQuiz);

// pick a number in the prompt string and use that prompt in the question structure function
function newPrompt() {


    // show the prompt display
    $promptDisplay.addClass('container-child').show();

    let currentPrompt = promptString[currentPromptIndex];

    // let the question and answers be those respective to the current prompt, as chosen by the prompt index
    let currentQuestion = currentPrompt[0];

    let currentAnswers = currentPrompt[1];

    correctAnswer = currentPrompt[2];

    // use the above defined variables as the respective displays in the prompt display
    questionStructureAndCompare(currentQuestion, currentAnswers, correctAnswer);


    // increase the prompt index by one for the next prompt
    currentPromptIndex++;

};

// when an answer is selected, compare it to the correct answer

$promptDisplay.on('click', function (event) {

    event.stopPropagation();

    let thingSelected = event.target;
    let selectedAnswer = thingSelected.textContent;

    // if the user answered correctly, add a point to score and go to the next question
    if (thingSelected.matches("li")) {
        if (correctAnswer === selectedAnswer) {
            numberAnsweredCorrectly++;
            $scoreDisplay.textContent = "Correct Answers: " + numberAnsweredCorrectly + "/10";
        }

        // if the user answered incorrectly, subtract 20 seconds from the timer and go to the next question
        else {
            secondsLeft -= 20;
        }

        nextQuestion();
    };

})

// present questions in h2 element and answers in list item elements, then check chosen answer against correct answer
function questionStructureAndCompare(question, answers, correctAnswer) {

    // this wasn't working as a global variable
    let questionDisplay = document.querySelector("p.question");

    questionDisplay.textContent = question;

    // display answers in corresponding list items

    answerDisplay[0].textContent = answers[0];
    answerDisplay[1].textContent = answers[1];
    answerDisplay[2].textContent = answers[2];
    answerDisplay[3].textContent = answers[3];

};

// determine if we have used all questions up. if so, end the quiz. if not, next prompt.
function nextQuestion() {

    if (currentPromptIndex > (promptString.length - 1)) {
        let finalScore = secondsLeft;
        endQuiz(finalScore);
    }

    else {
        newPrompt();
    };
};

let finalScore;

// end the quiz, display the score and let user record name and score
function endQuiz(score) {
    $promptDisplay.hide();
    $userDataStuff.addClass('saveData').show();

    // stop the clock counter
    shouldBeCounting = false;

    // finalScore should be positive
    if (score < 0) {
        finalScore = 0
    } 
    else {
        finalScore = score
    };

    // display final time in clock and score display
    $clockDisplay.textContent = finalScore;
    $finalScoreDisplay.text(finalScore);

   
};

 // if user chooses not to save score, reload the page from the top
 $retakeNoSaveButton.on('click', function() {
        
    console.log("retakeNoSave");
    window.location.reload();

})

function getLocalStorage()  {
    const scoreObject = localStorage.getItem('score');
    const scoresParsed = JSON.parse(scoreObject);
    // scoresParsed.forEach(score =>{
    //     console.log(score)
    // })   
    console.log(scoresParsed)

};

// when the userData form is submitted, save intials and score in local storage
$userDataStuff.on('submit', function(event) {
        
    event.preventDefault();

    const userInitials = userInitialsInput.value;
    // const storeItem = ["Initials: " + userInitials + " Score: " + finalScore]

    const newUser = {
        initials: userInitials,
        score: finalScore
    };

    console.log(newUser);
    
    let existingScores = localStorage.getItem('score');
    let stringifiedNewUser = JSON.stringify(existingScores);
   

    localStorage.setItem("score", stringifiedNewUser);
    console.log("should be string", typeof JSON.stringify(existingScores))

    // getLocalStorage();
    // window.location.reload();
    
});

// start the quiz prompts
function takeQuiz() {

    shouldBeCounting = true;
    // display score
    $scoreDisplay.textContent = "Correct Answers: " + numberAnsweredCorrectly + "/10";
    // currentPromptIndex = 0;
    

    // remove start button
    $startButton.hide();

    // start timer, display in minutes and seconds 
    let startTimer = setInterval(function() {
        let minutes = Math.floor(secondsLeft/60);
        let secs = secondsLeft%60;
        let seconds = secs.toLocaleString('en-US',  {
            minimumIntegerDigits:2,
            useGrouping:false
        });

        // if there is still time and the timer should be running, run the timer. otherwise, end the quiz with the time left
        const thereAreSecondsLeft = secondsLeft > 0;

        if(shouldBeCounting && thereAreSecondsLeft) {
            const minutesAndSeconds = minutes + ":" + seconds;
            $clockDisplay.text(minutesAndSeconds);
            secondsLeft--;
        } else {
            let finalScore = secondsLeft;
            endQuiz(finalScore);
        }

    }, 1000);

    newPrompt();
};