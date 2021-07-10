const promptDisplay = document.querySelector("#prompt");
const questionDisplay = document.querySelector("h2.question");
const answerDisplay = document.querySelectorAll("li");

const startButton = document.querySelector("button");

const userDataStuff = document.querySelector("#saveUserData");
const userInitialsInput = document.querySelector("#saveInitials");
const finalScoreDisplay = document.querySelector("#finalScoreDisplay");

const clockDisplay = document.getElementById("counter");
const scoreDisplay = document.getElementById("score");

let score = 0;

// begin prompts
let correctAnswer;

const question0 = "0";
const answers0 = ["0", "0", "0", "0"];
const correctAnswer0 = "0";

const question1 = "What language is primarily used to style html?";
const answers1 = ["Javascript", "jQuery", "CSS", "Python"];
const correctAnswer1 = "CSS";

const question2 = "Which CSS position setting causes the item to keep its place on the screen regardless of scroll?";
const answers2 = ["absolute", "fixed", "relative", "static"];
const correctAnswer2 = "absolute";

const question3 = "What syntax is used to declare a variable in JavaScript?";
const answers3 = ["var, const, let", "function, var", "attr", "for, if, else"];
const correctAnswer3 = "var, const, let";

const question4 = "q4";
const answers4 = ["a4.1", "a4.2", "a4.3", "a4.4"];
const correctAnswer4 = "a4.1";

const question5 = "q5";
const answers5 = ["a5.1", "a5.2", "a5.3", "a5.4"];
const correctAnswer5 = "a5.1";

const question6 = "q6";
const answers6 = ["a6.1", "a6.2", "a6.3", "a6.4"];
const correctAnswer6 = "a6.1";

const question7 = "q7";
const answers7 = ["a7.1", "a7.2", "a7.3", "a7.4"];
const correctAnswer7 = "a7.1";

const question8 = "q8";
const answers8 = ["a8.1", "a8.2", "a8.3", "a8.4"];
const correctAnswer8 = "a8.1";

const question9 = "q9";
const answers9 = ["a9.1", "a9.2", "a9.3", "a9.4"];
const correctAnswer9 = "a9.1";

const question10 = "q10";
const answers10 = ["a10.1", "a10.2", "a10.3", "a10.4"];
const correctAnswer10 = "a10.1";

// group prompts
const prompt0 = [question0, answers0, correctAnswer0];
const prompt1 = [question1, answers1, correctAnswer1];
const prompt2 = [question2, answers2, correctAnswer2];
const prompt3 = [question3, answers2, correctAnswer3];
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
startButton.addEventListener("click", takeQuiz);


    // something here is not working
    // first time it is called, it runs once in a question. second call, twice. third call, four times. fourth call, eight times.
    // pick a number in the prompt string and use that prompt in the question structure function
function newPrompt() {


    console.log("newPrompt");
    console.log("prompt index1", currentPromptIndex);

    // show the prompt display
    promptDisplay.style.display = "block";

    let currentPrompt = promptString[currentPromptIndex];

    // let the question and answers be those respective to the current prompt, as chosen by the prompt index
    let currentQuestion = currentPrompt[0];
    console.log(currentQuestion);

    let currentAnswers = currentPrompt[1];
    console.log(currentAnswers);

    correctAnswer = currentPrompt[2];
    console.log(correctAnswer);

    // use the above defined variables as the respective displays in the prompt display
    questionStructureAndCompare(currentQuestion, currentAnswers, correctAnswer);


    // increase the prompt index by one for the next prompt
    currentPromptIndex++;

    console.log({ currentPromptIndex });
};

// present questions in h2 element and answers in list item elements, then check chosen answer against correct answer
function questionStructureAndCompare(question, answers, correctAnswer) {

    // this wasn't working as a global variable
    let questionDisplay = document.querySelector("h2.question");

    questionDisplay.textContent = question;

    // display answers in corresponding list items

    answerDisplay[0].textContent = answers[0];
    answerDisplay[1].textContent = answers[1];
    answerDisplay[2].textContent = answers[2];
    answerDisplay[3].textContent = answers[3];

    // when an answer is selected, compare it to the correct answer

    promptDisplay.addEventListener("click", function (event) {

        event.stopPropagation();
    
        let thingSelected = event.target;
        let selectedAnswer = thingSelected.textContent;
    
        // if the user answered correctly, add a point to score and go to the next question
        if (thingSelected.matches("li")) {
            if (correctAnswer === selectedAnswer) {
                console.log("correct for: " + question)
                nextQuestion();
                score++;
                scoreDisplay.textContent = "Current Score: " + score;
            }
    
            // if the user answered incorrectly, subtract 20 seconds from the timer and go to the next question
            else {
                // console.log("incorrect for: " + question)
                // secondsLeft -= 20;
                nextQuestion();
    
            }
        };
    
    })

};

// determine if we have used all questions up
function nextQuestion() {

    if (currentPromptIndex > (promptString.length)) {
        let finalScore = score;
        endQuiz();
    }

    else {
        console.log("nextQuestion");
        newPrompt();
    }
}




// end the quiz, display the score and let user record name and score
function endQuiz() {
    promptDisplay.style.display = "none";

    console.log("End Quiz")
    secondsLeft = 0;

    let finalScore = score;
    console.log(finalScore);

    localStorage.setItem('user', 'elise');
    localStorage.setItem('score', finalScore);
    console.log(localStorage);
}

function takeQuiz() {


    // display score
    scoreDisplay.textContent = "Current Score: " + score;

    // remove start button
    startButton.style.display = "none";



    // start timer, display in minutes and seconds
    // let secondsLeft = 119;
    // let startTimer = setInterval(function() {
    //     let minutes = Math.floor(secondsLeft/60);
    //     let secs = secondsLeft%60;
    //     let seconds = secs.toLocaleString('en-US',  {
    //         minimumIntegerDigits:2,
    //         useGrouping:false 
    //     });


    //     if ((secondsLeft > 0))    {
    //         clockDisplay.textContent = minutes + ":" + seconds;
    //         secondsLeft--;
    //     }

    //     else {
    //         clockDisplay.textContent = "00:00";
    //         clearInterval(startTimer);
    //         endQuiz();
    //     }

    // }, 1000)

    






    newPrompt();

};
