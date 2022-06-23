
function myClick(evt) {
	var rect = canvas.getBoundingClientRect();
	let x = Math.floor((evt.clientX - rect.left) / BOX_SIZE);
	let y = Math.floor((evt.clientY - rect.top) / BOX_SIZE);
	composite.cells[x][y].isAlive = !composite.cells[x][y].isAlive;
	draw();
}

function updateTurn(thisTurn) {
	const text = "Turn: ";
	var currentTurn = document.getElementById("current-turn");
	currentTurn.innerHTML = text + thisTurn;
	return thisTurn;
}

function clearCanvas() {
	if (isLooping) toggleLoop();

	for (let i = 0; i < WIDTH; i++) {
		for (let j = 0; j < HEIGHT; j++) {
			composite.cells[i][j].isAlive = false;
		}
	}

	turn = updateTurn(0);
	draw();
}

function toggleLoop() {
	const text = document.getElementById("playPause");
	isLooping = !isLooping;
	toggleListener();

	if (isLooping) {
		gameLoop();
		text.innerHTML = '<i class="fa fa-pause-circle"></i> Pause';
	} else if (turn == 0) {
		text.innerHTML = '<i class="fa fa-play-circle"></i> Play';
	} else {
		text.innerHTML = '<i class="fa fa-play-circle"></i> Resume';
	}
}

function gameLoop() {
	if (isLooping) {
		update();
		console.log(turn);
		window.setTimeout(gameLoop, 250);
	} else {
		return;
	}
}

function togglePopup() {
	if (isLooping) toggleLoop();
	toggleListener();

	var popup = document.getElementById("myPopup");
	popup.classList.toggle("show");
}
