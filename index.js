const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// calculate the size of the canvas
canvas.height = window.innerHeight - (window.innerHeight % 20) - 180;
canvas.width = window.innerWidth - (window.innerWidth % 20) - 160;

// set variable sizes
const BOX_SIZE = 20;
let WIDTH = canvas.width / BOX_SIZE;
let HEIGHT = canvas.height / BOX_SIZE;
let RAND_RANGE = 25;

// inialize guiding variables
let isLooping = false;
let turn = 0;
let isListening = false;
var composite = new CellComposite({
	width: canvas.width,
	height: canvas.height,
});

// main functions
function nextTurn() {
	turn = updateTurn(turn + 1);
}

function updateSize() {
	// calculate the size of the canvas
	canvas.height = window.innerHeight - (window.innerHeight % 20) - 180;
	canvas.width = window.innerWidth - (window.innerWidth % 20) - 160;

	// update variable sizes
	WIDTH = canvas.width / BOX_SIZE;
	HEIGHT = canvas.height / BOX_SIZE;

	draw();
}

function toggleListener() {
	if (isListening) {
		canvas.removeEventListener("click", myClick);
	} else {
		canvas.addEventListener("click", myClick);
	}
	isListening = !isListening;
}

function draw() {
	//background
	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//composite
	composite.drawComposite();

	//grid
	ctx.strokeStyle = "black";
	ctx.lineWidth = 1;
	for (let i = 0; i < WIDTH; i++) {
		ctx.beginPath();
		ctx.moveTo(BOX_SIZE * i, 0);
		ctx.lineTo(BOX_SIZE * i, canvas.height);
		ctx.stroke();
	}
	for (let i = 0; i < HEIGHT; i++) {
		ctx.beginPath();
		ctx.moveTo(0, BOX_SIZE * i);
		ctx.lineTo(canvas.width, BOX_SIZE * i);
		ctx.stroke();
	}
}

function update() {
	composite.updateCells();
	nextTurn();
	draw();
}

let slider = document.getElementById("myRange");
let value = document.getElementById("myValue");
slider.oninput = function () {
	value.innerHTML = this.value + '%';
	RAND_RANGE = this.value;
	draw();
}

// set up program
window.onresize = function () { updateSize(); };
toggleListener();
draw();
