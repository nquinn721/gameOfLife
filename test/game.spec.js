
describe('Game of life', () => {
	let cell,
		neighbor = {alive: true};

	beforeEach(() => {
		cell = new Cell(1, 2, true);
	});

	it('Should be an object', () => {
		expect(cell).to.be.a('object');
	});

	it('should add a neighbor', () => {
		cell.addNeighbor();
		expect(cell.neighbors.length).to.equal(1);
	});

	it('should add one neighbor and then die', () => {
		cell.addNeighbor(neighbor);
		cell.checkIfAlive();
		expect(cell.alive).to.be.false;
	});

	it('should add 2 live neighbors and stay alive', () => {
		cell.addNeighbor(neighbor);
		cell.addNeighbor(neighbor);
		cell.checkIfAlive();
		expect(cell.alive).to.be.true;
	});

	it('should stay alive if it has 3 live neighbors', () => {
		cell.addNeighbor(neighbor);
		cell.addNeighbor(neighbor);
		cell.addNeighbor(neighbor);
		cell.checkIfAlive();
		expect(cell.alive).to.be.true;
	});

	it('should die if it has more than 3 live neighbors', () => {
		cell.addNeighbor(neighbor);
		cell.addNeighbor(neighbor);
		cell.addNeighbor(neighbor);
		cell.addNeighbor(neighbor);
		cell.checkIfAlive();
		expect(cell.alive).to.be.false;
	});

	it('should come alive from a dead state if it has exactly 3 live neighbors', () => {
		let deadCell = new Cell(1, 2, false);
		deadCell.addNeighbor(neighbor);
		deadCell.addNeighbor(neighbor);
		deadCell.addNeighbor(neighbor);
		deadCell.checkIfAlive();
		
		expect(deadCell.alive).to.be.true;
	});

	it('should stay dead if it doesnt have exactly 3 live neighbors', () => {
		let deadCell = new Cell(1, 2, false),
			deadCell1 = new Cell(1, 2, false);

		deadCell.addNeighbor(neighbor);
		deadCell.addNeighbor(neighbor);
		deadCell.checkIfAlive();
		
		deadCell1.addNeighbor(neighbor);
		deadCell1.addNeighbor(neighbor);
		deadCell1.addNeighbor(neighbor);
		deadCell1.addNeighbor(neighbor);
		deadCell1.checkIfAlive();

		expect(deadCell.alive).to.be.false;
		expect(deadCell1.alive).to.be.false;
	});

});