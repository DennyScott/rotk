(function() {

	/**
	 * Board Object. This will include each small tile, and the larger outer board. This will handle the creation of these
	 * objects, and any events needed triggererd on these objects.
	 */
	var Board = function() {
		var _board = this;
		var _completeBoard = game.add.group(); //Entire Board Group
		var _outerBoard; //OuterBoard, parent of child tiles
		var _one = {
				text: '1'
			},
			_two = {
				text: '2'
			},
			_three = {
				text: '3'
			},
			_four = {
				text: '4'
			},
			_five = {
				text: '5'
			},
			_six = {
				text: '6'
			},
			_seven = {
				text: '7'
			},
			_eight = {
				text: '8'
			},
			_nine = {
				text: '9'
			};
		var _scale = 0.333333; //Scale of the smaller tiles compared to the larger tiles.
		var _positions; //Coordinates for each Tile
		var _tileArray; //Array of all created Tile Objects
		var tiles = game.add.group(_completeBoard, 'tiles', true); //Group for all tiles

		/**
		 * Constructor
		 */
		var _initalize = function() {
			//Create the Outer Board
			_outerBoard = game.add.sprite(game.world.centerX, game.world.centerY, 'blackTile');
			_outerBoard.anchor.setTo(0.5, 0.5); //Anchor will be middle of object

			_getPositions(); //Calculate all positions for tiles based on _outerBoard
			_createTileArray(); //Place the tiles in an array, following an order for gameplay
			_createTilesOnBoard(); //Place the tiles in the positions found
			_rotateBoard(); //Rotate the board 45 degrees.
		};

		/**
		 * Create the Tile Array. The positioning of each object in the array is to
		 * replicate the positioning of each value, left to right, top to bottom.
		 * @return {[type]} [description]
		 */
		var _createTileArray = function() {
			_tileArray = [_two, _nine, _three, _eight, _one, _seven, _four, _six, _five];
		};

		/**
		 * Create each tile object, setting the correct scale, white tile, positioons, and text.
		 */
		var _createTilesOnBoard = function() {
			for (var i = 0; i < _tileArray.length; i++) {
				_tileArray[i].sprite = game.add.sprite(_positions[i].x, _positions[i].y, 'whiteTile', null, tiles); //Create Tile Sprite

				//Scale the Tiles
				_tileArray[i].sprite.scale.x = _scale;
				_tileArray[i].sprite.scale.y = _scale;

				//Add the sprite as a Child of the outerboard object
				_outerBoard.addChild(_tileArray[i].sprite);

				//Create the Text for the Tile
				_createTextOnTile(_tileArray[i]);

			};
		};

		/**
		 * Create The Text on the Tile.
		 * @param  {[Object]} _tile The Tile Object, containing the sprite and the text
		 */
		var _createTextOnTile = function(_tile) {
			var mid = _tile.sprite.width * 1.5; //Find the Mid point for the Text

			//Create the Text
			var spriteText = game.add.text(mid, mid, _tile.text, {
				font: mid / 1.5 + 'px Geo',
				fill: '#000000'
			});

			spriteText.anchor.setTo(0.5, 0.5); //Set Anchor for Text
			spriteText.angle = -45; //Rotate back 45 degrees, to make it straigtened.

			//Add The text as a Child to the Sprite
			_tile.sprite.addChild(spriteText);
		}

		/**
		 * Rotate the angle of the Board by 45 degrees.
		 * @return {[type]} [description]
		 */
		var _rotateBoard = function() {
			_outerBoard.angle += 45;
		};

		/**
		 * Collect the positions from the outerboard size. This will first collect the X positions left
		 * center and right, and the y positions top middle and bottom. We then put together an array with
		 * those position to dictate all nine positions.
		 * 
		 */
		var _getPositions = function() {
			var xLeft = 0 - (_outerBoard.width / 2);
			var xCenter = xLeft + (_outerBoard.width * _scale);
			var xRight = 0 + (_outerBoard.width / 2) - (_outerBoard.width * _scale);

			var yTop = 0 - (_outerBoard.height / 2);
			var yCenter = yTop + (_outerBoard.height * _scale);
			var yBottom = 0 + (_outerBoard.height / 2) - (_outerBoard.height * _scale);

			_positions = [{
				x: xLeft,
				y: yTop
			}, {
				x: xCenter,
				y: yTop
			}, {
				x: xRight,
				y: yTop
			}, {
				x: xLeft,
				y: yCenter
			}, {
				x: xCenter,
				y: yCenter
			}, {
				x: xRight,
				y: yCenter
			}, {
				x: xLeft,
				y: yBottom
			}, {
				x: xCenter,
				y: yBottom
			}, {
				x: xRight,
				y: yBottom
			}];
		};

		_initalize(); //Start the Constructor

	}

	game.board = Board; //Add the Board to the game object
})();