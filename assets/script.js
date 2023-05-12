//quiz questions
const questions = [
	{
		question: "What does CSS stand for?",
		answers:[
			{text:"Cascading Style Sheets", correct:true},
			{text:"Computer Style Sheets", correct:false},
			{text:"Creative Style Sheets", correct:false},
			{text:"Colorful Style Sheets", correct:false},
		]

	},
	{
		question: "In CSS, h1 can be called as?",
		answers:[
			{text:"Value", correct:false},
			{text:"Attribute", correct:false},
			{text:"Tag", correct:false},
			{text:"Selector", correct:true},
		]
	},
	{
		question: "Which HTML tag is used to define an internal style sheet?",
		answers:[
			{text:"CSS", correct:false},
			{text:"Text", correct:false},
			{text:"Style", correct:true},
			{text:"Script", correct:false},
		]
	},
	{
		question: "CSS Padding property is used for?",
		answers:[
			{text:"Border", correct:false},
			{text:"Space", correct:true},
			{text:"Margin", correct:false},
			{text:"Background Color", correct:false},
		]
	}

];


//elements being pulled from DOM
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");


let currentQuestionIndex = 0;
let score = 0;


//start quiz button
startButton.addEventListener("click",() => {
	var questionSection = document.querySelector(".app")
    questionSection.style.display = "block";
	var hide = document.querySelector(".hide");
	hide.style.display = "none";
	
})

//function to start the quiz
function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

//function to show questions
function showQuestion(){
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

	currentQuestion.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		if(answer.correct){
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}

//function to reset on next question
function resetState(){
	nextButton.style.display = "none";
	while(answerButtons.firstChild){
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

//function adds correct or incorrect class to answer buttons
function selectAnswer(e){
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score++;
	}else{
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button=> {
		if(button.dataset.correct === "true"){
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

//function shows final score at end
function showScore(){
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "Play Again";

	nextButton.style.display = "block";
}

//function of what the next button should do 
function handleNextButton(){
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length){
		showQuestion();
	}else{
		showScore();
	}
}

//timer countdown start


var count = 15;
var interval = setInterval(function(){
  document.getElementById('count').innerHTML=count;
  count--;
  if (count === 0 - 1){
    clearInterval(interval);
    document.getElementById('count').innerHTML='Out of Time!';
  }

}, 1000);

function endGame() {
    clearInterval(timer);
  }


//next button event listener 
nextButton.addEventListener("click", ()=>{
	if(currentQuestionIndex < questions.length){
		handleNextButton();
	}else{
		startQuiz();
	}
})

startQuiz();