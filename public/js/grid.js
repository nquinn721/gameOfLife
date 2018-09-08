class Grid{

	constructor(id){
		this.htmlEl = document.querySelector(`#${id}`);
	}

	createGrid(w, h){
		this.cells = [];
		this.w = w;
		this.h = h;

		for(let y = 0; y < h; y++){

			if(!this.cells[y])this.cells[y] = [];

			for(let x = 0; x < w; x++){

				this.cells[y].push(new Cell(x, y, Math.random() * 10 > 5));
			}
		}
		this.draw();
	}

	roll(){
		this.addCellNeighbors();

		for(let x = 0; x < this.cells.length; x++){
			for(let y = 0; y < this.cells[x].length; y++){
				this.cells[x][y].checkIfAlive();
			}
		}
		
		this.draw();
	}

	addCellNeighbors(){
		for(let x = 0; x < this.cells.length; x++){
			for(let y = 0; y < this.cells[x].length; y++){
				const cell = this.cells[x][y],
					  neighbors = [
					  	this.cells[x - 1] && this.cells[x -1][y - 1], 	// top left
					  	this.cells[x][y - 1], 		// top
					  	this.cells[x + 1] && this.cells[x + 1][y -1], 	// top right
					  	this.cells[x + 1] && this.cells[x + 1][y], 		// right
					  	this.cells[x + 1] && this.cells[x + 1][y + 1], 	// bottom right
					  	this.cells[x][y + 1], 		// bottom
					  	this.cells[x - 1] && this.cells[x - 1][y + 1], 	// bottom left
					  	this.cells[x - 1] && this.cells[x - 1][y] 		// left
					  ]; 
				
				cell.clearNeighbors();

				for(let i = 0; i < neighbors.length; i++){
					if(neighbors[i]){
						cell.addNeighbor({alive: neighbors[i].alive});
					}
				}
			}
		}
		
	}

	draw(){
		this.setGridSize();
		this.htmlEl.innerHTML = '';
		for(let x = 0; x < this.cells.length; x++){
			for(let y = 0; y < this.cells[x].length; y++){
				this.htmlEl.appendChild(this.createCell(this.cells[x][y], x, y));
			}
		}
	}

	setGridSize(){
		this.htmlEl.style.width = this.w * 100 + 'px';
		this.htmlEl.style.height = this.h * 100 + 'px';
	}

	createCell(cell, x, y){
		let div = document.createElement('div');

		if(cell.alive){
			div.innerText = 'Alive';
			div.className = 'cell alive x:'+ x + ' y:' + y;
		}else{
			div.innerText = 'Dead';
			div.className = 'cell dead x:'+ x + ' y:' + y;
		}

		return div;
	}
}