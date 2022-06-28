// Time variables.
var timeLeft = 30;
var timer;
var startButton;
var timeDisplay;

// Game variables.
var gameStarted = false;
var input;
var word = "";
var wordList = ["function", "array", "prototype", "querySelect"];
var wordDisplay;
var lettersRemain = 1;
var lettersGuessed = [];

// Score variables.
var wins = 0;
var loses = 0;
var winsDisplay;
var losesDisplay;
var resetButton;

// Init.
window.onload = () => {
	startButton = document.querySelector("#start");
	resetButton = document.querySelector("#reset");
	timeDisplay = document.querySelector("#time");
	winsDisplay = document.querySelector("#wins");
	losesDisplay = document.querySelector("#loses");
	wordDisplay = document.querySelector("#word");

	startButton.addEventListener("click", beginGame);
	resetButton.addEventListener("click", resetScore);
	input = document.addEventListener("keyup", guessLetter);
	update();
}

// Game functions.
function beginGame() {
	if (gameStarted === false) {
		timer = setInterval(() => {
			if (timeLeft > 0) {
				timeLeft--;
			} else {
				clearInterval(timer);
				endGame();
			}
			update();
		}, 1000);
		word = wordList[Math.floor(Math.random() * wordList.length)].toLocaleLowerCase();
		lettersRemain = word.length;
		lettersGuessed = new Array(word.length).fill(false);
		gameStarted = true;
		update();
	}
}
function guessLetter(event) {
	if (gameStarted) {
		var letter = event.key;

		for (let i = 0; i < word.length; i++) {
			if (letter === word[i]) {
				lettersRemain--;
				lettersGuessed[i] = true;
			}
		}

		update();
		if (lettersRemain === 0)
			endGame();
	} else
		update();
}
function endGame() {
	if (gameStarted) {
		if (timeLeft === 0 && lettersRemain > 0) {
			loses++;
		} else {
			wins++;
		}
		clearInterval(timer);
		update();
		gameStarted = false;
	}
}

// Score keeping.
function update() {
	timeDisplay.textContent = timeLeft;
	winsDisplay.textContent = "Wins: " + wins;
	losesDisplay.textContent = "Loses: " + loses;

	var display = "";

	if (gameStarted === false) {
		lettersGuessed = new Array(word.length).fill(true);
	}
	for (let i = 0; i < word.length; i++) {
		if (lettersGuessed[i]) {
			display += word[i];
		} else {
			display += "_";
		}
		display += " ";
	}
	wordDisplay.textContent = display;
}
function resetScore() {
	timeLeft = 30;
	wins = 0;
	loses = 0;
	clearInterval(timer);
	update();
}