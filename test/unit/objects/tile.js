describe("Check Tile Object", function() {
	var tile;
	var whiteTile;
	var loadAssets = false;

	beforeEach(function(done) {
		if (!loadAssets) {
			setTimeout(function() {
				tile = new game.tile("1");
				console.log('before load');
				game.load.image('whiteTile', 'WhiteSquare.png');
				console.log('after load');
				console.log('outside on complete');
				loadAssets = true;
				done()
			}, 2000)
		}else{
			done();
		}


	});

	it('Does tile initalize?', function() {
		expect(tile).not.toBe('undefined');
	});

	it('Does tile return the text passed in the constructor', function() {
		expect(tile.text()).toBe("1");
	});

	it('Can I add a Sprite, and get a sprite in return', function() {
		tile._renderSprite = function(x, y, group) {
			tile._sprite = 'testing sprite';
			console.log('made it');
		};

		tile.renderText = function() {
			console.log('in rendertext');
			//Do nothing
		};

		expect(tile.addSprite(0, 0, 1)).toBe('testing sprite');
	});
});