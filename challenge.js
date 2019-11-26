let counter;
let counting;
let counterInterval;

document.addEventListener('DOMContentLoaded', () => {
	counter = document.getElementById('counter')
	let counterValue = 0
	startCounter()
	let pauseButton = document.getElementById('pause')
	let plusButton = document.getElementById('plus')
	let minusButton = document.getElementById('minus')
	let likeButton = document.getElementById('heart')
	let likesUL = document.getElementsByClassName('likes')[0]
	let form = document.getElementById('comment-form')
	pauseButton.addEventListener('click', pause)
	plusButton.addEventListener('click', addCount)
	minusButton.addEventListener('click', minusCount)
	likeButton.addEventListener('click', () => likeANumber(likesUL, counter.innerText))
	form.addEventListener('submit', comment)
})
const startCounter = () => {
	counterInterval = setInterval(incCounter, 1000)
	counting = true
}

const incCounter = () => {
	counter.innerText++
}

const pauseCounter = () => {
	clearInterval(counterInterval)
	counting = false
}

const pause = () => {
	let buttonText = {'pause': 'resume', 'resume': 'pause'}
	buttons = Array.from(document.getElementsByTagName('button'))
	buttons.forEach((button) => {
		if(button.id != 'pause'){
			button.disabled = !button.disabled
		} else {
			button.innerText = buttonText[button.innerText]
		}
	})
	counting ? pauseCounter() : startCounter()
}

const addCount = () => {
	counter.innerText++
}

const minusCount = () => {
	counter.innerText--
}

const likeANumber = (ul, number) => {
	let lis = Array.from(ul.getElementsByTagName('li'))
	let existing = lis.find(li => li.getAttribute('data-number-liked') == number)
	if(existing){
		let numTimesLiked = parseInt(existing.getAttribute('data-times-liked')) + 1;
		existing.setAttribute('data-times-liked', numTimesLiked)
		existing.innerText = `${number} was liked ${numTimesLiked} times`
	} else {
		let newLI = document.createElement('li')
		newLI.setAttribute('data-number-liked', number)
		newLI.setAttribute('data-times-liked', 1)
		newLI.innerText = `${number} was liked 1 time`
		ul.appendChild(newLI)
	}
}

const comment = (e) => {
	e.preventDefault()
	if(e.target[0].value == "") return false
	let commentList = document.getElementById('list')
	let newComment = document.createElement('p')
	newComment.innerText = e.target[0].value
	e.target[0].value = ""
	commentList.appendChild(newComment)
}