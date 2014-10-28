(function() {

	/**
	 * Board Object. This will include each small tile, and the larger outer board. This will handle the creation of these
	 * objects, and any events needed triggererd on these objects.
	 */
	var Board = function() {
		var _board = this;
		var _completeBoard = game.add.group(); //Entire Board Group
		var _outerBoard; //OuterBoard, parent of child tiles
		var _positions; //Coordinates for each Tile
		var _tileArray = []; //Array of all created Tile Objects
		var _positionArray = [2, 9, 3, 8, 1, 7, 4, 6, 5];
		var tiles = game.add.group(_completeBoard, 'tiles', true); //Group for all tiles
		var _scale = 0.333333; //Scale of the smaller tiles compared to the larger tiles.

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
			for(var i = 0; i < _positionArray.length; i++){
				var tile = new game.tile(i + 1 + '');
				_tileArray.push(tile);
			}
			
		};

		/**
		 * Create each tile object, setting the correct scale, white tile, positioons, and text.
		 */
		var _createTilesOnBoard = function() {
			for (var i = 0; i < _tileArray.length; i++) {
				var index = _positionArray[i] - 1; //Use the position array to organize. Since we start with 0, negate 1
				
				//Create Tile Sprite
				var createdSprite = _tileArray[index].addSprite(_positions[i].x, 
					_positions[i].y, _scale, tiles); 

				//Add the sprite as a Child of the outerboard object
				_outerBoard.addChild(createdSprite);

			}
		};

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