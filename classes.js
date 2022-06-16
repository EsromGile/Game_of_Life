class Position {
	constructor(x, y) {
		if (x < 0) {
			this.x = WIDTH + x;
		} else {
			this.x = x % WIDTH;
		}

		if (y < 0) {
			this.y = HEIGHT + y;
		} else {
			this.y = y % HEIGHT;
		}
	}
}

class Cell {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.isAlive = false;
		this.neighbors = 0;
	}

	drawCell() {
		if (this.isAlive) {
			ctx.fillStyle = "gold";
			ctx.fillRect(this.x, this.y, BOX_SIZE, BOX_SIZE);
		}
	}

	updateNeighbors(neighborCount) {
		this.neighbors = neighborCount;
	}

	updateCell() {
		if (this.isAlive) {
			if (this.neighbors < 2 || this.neighbors > 3) this.isAlive = false;
		} else {
			if (this.neighbors === 3) this.isAlive = true;
		}
	}
}

class CellComposite {
	constructor({ height, width }) {
		this.width = width;
		this.height = height;

		this.cells = new Array(this.width);
		for (let i = 0; i < this.width; i++) {
			this.cells[i] = new Array(this.height);
			for (let j = 0; j < this.height; j++) {
				let x = BOX_SIZE * i;
				let y = BOX_SIZE * j;
				this.cells[i][j] = new Cell(x, y);
			}
		}
	}

	drawComposite() {
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				this.cells[i][j].drawCell();
			}
		}
	}

	updateCells() {
		// check neighbors of each cell
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				let neighborCount = 0;

				// board wraps around the connects to the opposite side
				/*
					a  b  c
					d [x] e
					f  g  h
				*/

				let neighbors = new Array(
					new Position(i - 1, j - 1),
					new Position(i, j - 1),
					new Position(i + 1, j - 1),
					new Position(i - 1, j),
					new Position(i + 1, j),
					new Position(i - 1, j + 1),
					new Position(i, j + 1),
					new Position(i + 1, j + 1)
				);

				for (let n of neighbors) {
					if (this.cells[n.x][n.y].isAlive) neighborCount++;
				}

				// update each cell's neighbors
				this.cells[i][j].updateNeighbors(neighborCount);
			}
		}

		// update cell's state
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				this.cells[i][j].updateCell();
			}
		}
	}
}
