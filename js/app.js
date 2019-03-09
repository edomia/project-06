const qwerty = document.getElementById('qwerty');
const overlay = document.getElementById('overlay');
const phrase = document.getElementById('phrase');
const resetButton = document.querySelector('.btn__reset');
const letters = document.getElementsByClassName('letter');
const ul = document.querySelector('#phrase ul');
const heart = document.getElementsByTagName('img');
const title = document.querySelector('.title');
let missed = 0;
let reset = false;


let phrases = [
	"never say never",
	"better late than never",
	"like a fish out of water",
	"needle in a haystack",
	"take it with a grain of salt",
	"think like a boss"
]

function getRandomPhraseAsArray(arr) {
	let randomString = arr[Math.floor(Math.random() * arr.length)];
	let splitString = randomString.split("");
	return splitString;
}
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function addPhraseToDisplay(arr) {
	for (var i = 0; i < arr.length; i++) {
		let li = document.createElement('li');
		li.textContent = arr[i];
		ul.appendChild(li);
		if (arr[i] != " ") {
			li.className = "letter";
		} else {
			li.className = "space";
		}
	}
}

function checkLetter(btn) {
	let guessed = false;
	for (var i = 0; i < letters.length; i++) {

		if (btn.target.textContent === letters[i].textContent) {
			letters[i].classList.add("show");
			guessed = true;
		}
	}
	return guessed;
}

function checkWin() {
	const show = document.querySelectorAll('.show');
	if (show.length === letters.length) {
		overlay.style.display = "";
		overlay.className = "win";
		title.innerHTML = "<h2>You Win!</h2>";
		resetButton.textContent = "Start Again!";
		reset = true;

	} else if (missed === 5) {
		overlay.style.display = "";
		overlay.className = "lose";
		title.innerHTML = "<h2>Game Over!</h2>";
		resetButton.textContent = "Start Again!";
		reset = true;

	}
}

function changeChosenButtons() {

	let buttonCheck = document.getElementsByTagName('button');
	for (var i = 0; i < buttonCheck.length; i++) {
		buttonCheck[i].className = "";
		buttonCheck[i].disabled = false;
	}
}

function returnLettersToNormal() {
	const li = document.querySelectorAll(".letter, .space");
	for (let i = 0; i < li.length; i += 1) {
		ul.removeChild(li[i]);
	}
}

function resetGame() {
	if (reset === true) {
		missed = 0;
		resetHearts();
		changeChosenButtons();
		returnLettersToNormal();
		const phraseArray = getRandomPhraseAsArray(phrases);
		addPhraseToDisplay(phraseArray);
	}
}

function resetHearts() {
	for (var i = 0; i < heart.length; i++) {
		let newHeart = heart[i];
		newHeart.setAttribute('src', 'images/liveHeart.png');
	}
}

qwerty.addEventListener('click', (event) => {
	let letterFound = checkLetter(event);

	if (event.target.tagName === "BUTTON") {
		event.target.classList = "chosen";
		event.target.disabled = "true";
		if (letterFound === false && missed < 5) {
			heart[missed].setAttribute('src', 'images/lostHeart.png');
			missed++;
		}
		if(letterFound === false && missed){
           event.target.classList = "wrong";    
		}else{
event.target.classList = ('shake , show');
		}
	}
	checkWin();

});

resetButton.addEventListener('click', () => {
	overlay.style.display = "none";
	if (reset === true && missed === 5) {
		resetGame();
	} else if (reset === true && missed != 5) {
		resetGame();
	}
});
