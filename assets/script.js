const questions = [
	{
		question: "test question",
		answers:[
			{text:"test q1", correct:false},
			{text:"test q2", correct:false},
			{text:"test q3", correct:false},
			{text:"test q4", correct:true},
		]

	},
	{
		question: "test question2",
		answers:[
			{text:"test q1", correct:false},
			{text:"test q2", correct:false},
			{text:"test q3", correct:false},
			{text:"test q4", correct:true},
		]
	},
	{
		question: "test question3",
		answers:[
			{text:"test q1", correct:false},
			{text:"test q2", correct:false},
			{text:"test q3", correct:false},
			{text:"test q4", correct:true},
		]
	},
	{
		question: "test question4",
		answers:[
			{text:"test q1", correct:false},
			{text:"test q2", correct:false},
			{text:"test q3", correct:false},
			{text:"test q4", correct:true},
		]
	}

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");

let currentQuestionIndex = 0;
let score = 0;

startButton.addEventListener("click",() => {
	var questionSection = document.querySelector(".app")
    questionSection.style.display = "block";
	var hide = document.querySelector(".hide");
	hide.style.display = "none";
})


function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

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


function resetState(){
	nextButton.style.display = "none";
	while(answerButtons.firstChild){
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

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

function showScore(){
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";
}

function handleNextButton(){
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length){
		showQuestion();
	}else{
		showScore();
	}
}

nextButton.addEventListener("click", ()=>{
	if(currentQuestionIndex < questions.length){
		handleNextButton();
	}else{
		startQuiz();
	}
})

startQuiz();