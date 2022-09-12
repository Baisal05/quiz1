const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "Без понятие"],
		correct: 2,
	},
];

//находим элементыъ

const headerContainer = document.querySelector('#header')
const listConatainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

// переменные игры

let score = 0;
let questionIndex = 0;

clearPage()
showQuestion()

submitBtn.onclick = checkAnswer

function clearPage(){
	headerContainer.innerHTML = '';
	listConatainer.innerHTML = '';
}

function checkAnswer() {
	const checkedRadio = listConatainer.querySelector('input[type="radio"]:checked');
// если ответ не выбран - ничего не делаем
	if(!checkedRadio){
		submitBtn.blur();
		return
	}

	// Узнаем номер ответа пользователя 
	const userAnswer = parseInt(checkedRadio.value)

	//Если ответил правильно - увеличиваем счет
	console.log(userAnswer, questions[questionIndex]['correct']);

	if(userAnswer === questions[questionIndex]['correct']){
		score++;
	}
	console.log('score = ', score);

	if(questionIndex !== questions.length - 1){

		console.log('НЕ последний вопрос');
		questionIndex++;
		clearPage();
		showQuestion()
		return;

	}	else{
		console.log('последний вопрос');
		clearPage();
		showResults();
	}
}

function showResults() {
	const resultsTemplate = 
		`<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>`;

		let title, message;

		if(score === questions.length){
			title = 'Поздравляем 🧠',
			message = 'Вы ответили верно на все ответы правильно 😎😍'
		} else if((score * 100) / questions.length >= 50) {
			title = 'Неплохой результат',
			message = 'Попробуй еще раз'
		} else{
			title = 'Попробуй еще раз ',
			message = 'У вас меньше половины правильных ответов'
		}
		
		let result = `${score} из ${questions.length}`;

		const finalMessage = resultsTemplate
						.replace('%title%', title)
						.replace('%message%', message)
						.replace('%result%', result)
						
						headerContainer.innerHTML = finalMessage

						submitBtn.blur();
						submitBtn.innerHTML = 'Начать заново';
						submitBtn.onclick = () =>history.go();
							
						
}

	

function showQuestion() {

	//вопросы

	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

	headerContainer.innerHTML = title

	let answersNumber = 1
	for(answersText of questions[questionIndex]['answers']){

		const questionTempalte = 

		`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answers%</span>
			</label>
		</li>`

		
		const answer = questionTempalte .replace('%answers%', answersText).replace('%number%', answersNumber)
		listConatainer.innerHTML += answer;
		answersNumber++;

			
	}
	

}
