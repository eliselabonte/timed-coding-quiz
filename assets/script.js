let firstQuestion = document.getElementById("question1");
let promptQ = firstQuestion.querySelector(":scope > label");
let answerOptions = firstQuestion.querySelectorAll(":scope > ul > li");

// let accessHiddenQuestion = promptQ.getAttribute("data-question");

// for (i=0; i<=answerOptions.length; i++) {
    
//     let accessHiddenAnswers =  answerOptions.getAttribute("data-answer")

//     console.log(accessHiddenAnswers)
// }

function displayPrompt()    {
    firstQuestion.style.display = "block";
};

displayPrompt();



