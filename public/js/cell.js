class Cell{

	constructor(x, y, alive) {
		this.x = x;
		this.y = y;
		this.alive = alive;
		this.neighbors = [];

	}


	addNeighbor(neighbor) {
		this.neighbors.push(neighbor);
	}
	checkIfAlive() {
		if(
			(this.under2LiveNeighbors() && this.alive) ||
			(this.moreThan3LiveNeighbors() && this.alive)
			){
			this.alive = false;
		}
		
		if(this.exactly3LiveNeighbors() && !this.alive){
			this.alive = true;
		}

	}

	under2LiveNeighbors() {
		return this.aliveNeighbors().length < 2;
	}

	moreThan3LiveNeighbors() {
		return this.aliveNeighbors().length > 3;
	}

	exactly3LiveNeighbors() {
		return this.aliveNeighbors().length == 3;
	}

	aliveNeighbors(){
		return this.neighbors.filter(n => n.alive);
	}

	clearNeighbors(){
		this.neighbors = [];
	}

}