let promptDisplay = document.querySelector("#prompt");
let questionDisplay = document.querySelector("h2.question");
let answerDisplay = document.querySelectorAll("li");

let startButton = document.querySelector("button");

let userDataStuff = document.querySelector("#saveUserData");
let userInitialsInput = document.querySelector("#saveInitials");
let finalScoreDisplay = document.querySelector("#finalScoreDisplay");

let clockDisplay = document.getElementById("counter");
let scoreDisplay = document.getElementById("score");

let score = 0;

// begin prompts
let question0 = "0";
let answers0 = ["0", "0", "0", "0"];
let correctAnswer0 ="0";

let question1 = "What language is primarily used to style html?";
let answers1 = ["Javascript", "jQuery", "CSS", "Python"];
let correctAnswer1 = "CSS";

let question2 = "Which CSS position setting causes the item to keep its place on the screen regardless of scroll?";
let answers2 = ["absolute", "fixed", "relative", "static"];
let correctAnswer2 = "absolute";

let question3 = "What syntax is used to declare a variable in JavaScript?";
let answers3 = ["var, const, let", "function, var", "attr", "for, if, else"];
let correctAnswer3 = "var, const, let";

let question4 = "Who dunnit";
let answers4 = ["nuts", "butts", "coconuts", "nuts again"];
let correctAnswer4 ="nuts";

let question5 = "q5";
let answers5 = ["a5.1", "a5.2", "a5.3", "a5.4"];
let correctAnswer5 ="a5.1";

let question6 = "q6";
let answers6 = ["a6.1", "a6.2", "a6.3", "a6.4"];
let correctAnswer6 ="a6.1";

let question7 = "q7";
let answers7 = ["a7.1", "a7.2", "a7.3", "a7.4"];
let correctAnswer7 ="a7.1";

let question8 = "q8";
let answers8 = ["a8.1", "a8.2", "a8.3", "a8.4"];
let correctAnswer8 ="a8.1";

let question9 = "q9";
let answers9 = ["a9.1", "a9.2", "a9.3", "a9.4"];
let correctAnswer9 ="a9.1";

let question10 = "q10";
let answers10 = ["a10.1", "a10.2", "a10.3", "a10.4"];
let correctAnswer10 ="a10.1";

// group prompts
let prompt0 = [question0, answers0, correctAnswer0];
let prompt1 = [question1, answers1, correctAnswer1];
let prompt2 = [question2, answers2, correctAnswer2];
let prompt3 = [question3, answers2, correctAnswer3];
let prompt4 = [question4, answers4, correctAnswer4];
let prompt5 = [question5, answers5, correctAnswer5];
let prompt6 = [question6, answers6, correctAnswer6];
let prompt7 = [question7, answers7, correctAnswer7];
let prompt8 = [question8, answers8, correctAnswer8];
let prompt9 = [question9, answers9, correctAnswer9];
let prompt10 = [question10, answers10, correctAnswer10];

let promptString = [prompt3, prompt4, prompt5, prompt6, prompt7, prompt8, prompt9, prompt10];


// when user clicks start button, quiz starts
startButton.addEventListener("click", takeQuiz);


function takeQuiz() {

    // begin at the first question
    let currentPromptIndex=0;

    // display score
    scoreDisplay.textContent = "Current Score: " + score;

    // remove start button
    startButton.style.display = "none";


    // end the quiz, display the score and let user record name and score
    function endQuiz()  {
        promptDisplay.style.display = "none";

        console.log("End Quiz")
        secondsLeft = 0;

        let finalScore = score;
        console.log(finalScore);

        localStorage.setItem('user', 'elise');
        localStorage.setItem('score', finalScore);
        console.log(localStorage);
    }

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

    // present questions in h2 element and answers in list item elements, then check chosen answer against correct answer
    function questionStructureAndCompare(question, answers, correctAnswer)   {
        
        // this wasn't working as a global variable
        let questionDisplay = document.querySelector("h2.question");

        questionDisplay.textContent = question;

        // display answers in corresponding list items

        answerDisplay[0].textContent = answers[0];
        answerDisplay[1].textContent = answers[1];
        answerDisplay[2].textContent = answers[2];
        answerDisplay[3].textContent = answers[3];

        // when an answer is selected, compare it to the correct answer
        promptDisplay.addEventListener("click", function(event){
        
            let thingSelected = event.target;
            let selectedAnswer = thingSelected.textContent;
            
            // if the user answered correctly, add a point to score and go to the next question
            if (thingSelected.matches("li"))    {
                if (correctAnswer === selectedAnswer){
                    console.log("correct for: " + question)
                    nextQuestion();
                    score++;
                    scoreDisplay.textContent = "Current Score: " + score;
                }
        
                // if the user answered incorrectly, subtract 20 seconds from the timer and go to the next question
                else {
                    console.log("incorrect for: " + question)
                    secondsLeft -= 20;
                    nextQuestion();
    
            }};


            
            
        })
    
        // determine if we have used all questions up
        function nextQuestion() {

            if (currentPromptIndex <= (promptString.length))    {
                console.log("nextQuestion");
                newPrompt();
                
            }

            else  {
                let finalScore = score;
                endQuiz();
            }
        }
    
    
    };
    

    // something here is not working
    // jumping ahead each time it is used
    // pick a number in the prompt string and use that prompt in the question structure function
    function newPrompt()  {

        console.log("newPrompt");
        console.log("prompt index", currentPromptIndex);

        promptDisplay.style.display = "block";

        let currentQuestion = promptString[currentPromptIndex][0];
        let currentAnswers = promptString[currentPromptIndex][1];
        let currentCorrectAnswer = promptString[currentPromptIndex][2];

        questionStructureAndCompare(currentQuestion, currentAnswers, currentCorrectAnswer);
        
        ++currentPromptIndex;
    };
    

    newPrompt();

}
