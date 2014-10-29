describe("Check Tile Object", function() {
	var tile;
	
	beforeEach(function() {
		tile = new game.tile("1");
	});

	it('Does tile initalize?', function() {
		expect(tile.text()).toBe("1");
	});
})